## Context

The `Task` interface in `src/app/board/task.model.ts` currently has these fields:
```
id, title, description, status, priority, category, estimate, createdAt
```

Two fields mentioned in `project.md` as part of the task detail panel requirements — **tags** and **deadline** — were never added. This change adds them as optional fields: `dueDate?: string` (ISO 8601 date string) and `tags?: string[]`.

The UI layer spans two components: `TaskCardComponent` (read-only display of the card) and `TaskDetailPanelComponent` (form-based editing). Both must be updated.

## Goals / Non-Goals

**Goals:**
- Add `dueDate` and `tags` to the `Task` interface (optional fields)
- Show due date on task cards with overdue visual indicator (red) when past today
- Show tags as pills on task cards
- Add due date field (date input) and tags field (comma-separated text → array) to the detail panel form
- Persist new fields through existing `createTask`/`updateTask` calls — no service changes needed
- Seed a few tasks in `db.json` with example values

**Non-Goals:**
- Filtering by tag (could be a future change)
- Filtering by due date range
- Calendar picker (use native `<input type="date">`)
- Tag autocomplete or suggestions
- Hard deadline enforcement or alerts

## Decisions

**Decision 1: `dueDate` field type**
- **Choice**: `string` (ISO 8601 date: `"2026-03-20"`)
- **Rationale**: Consistent with the existing `createdAt` pattern; easy to compare with `new Date()` for overdue logic
- **Alternatives**: `Date` object — not JSON-serializable; number (epoch) — less readable
- **Implementation**: Compare `new Date(task.dueDate) < new Date()` for overdue state (date-only comparison, strip time)

**Decision 2: `tags` field type**
- **Choice**: `string[]` — array of lowercase strings
- **Rationale**: Arrays are idiomatic; easy to render as pills; json-server stores them natively
- **Alternatives**: Comma-separated string — requires split/join on every read/write; Set — not JSON-serializable
- **Implementation**: Form field is a plain text `<input>` where user types comma-separated values; on save, split by comma, trim, filter empty strings

**Decision 3: Overdue indicator placement**
- **Choice**: Show due date as a small badge below the task title on the card; badge turns red when `dueDate < today`
- **Rationale**: Inline with the existing metadata (priority, category, estimate) row; immediately scannable
- **Implementation**: Use `DatePipe` to format the date; overdue = `class` binding toggleing `text-red-600` vs `text-gray-400`

**Decision 4: Tags display on card**
- **Choice**: Show up to 3 tags as gray pills below the metadata row; overflow shown as `+N more`
- **Rationale**: Cards are narrow (48–64px wide); showing all tags could overflow; 3 is enough for scanning
- **Implementation**: Slice tags to first 3 in template; use `@if` to show overflow count

**Decision 5: Tags form input UX**
- **Choice**: Single `<input type="text">` with help text "comma-separated" for tags entry
- **Rationale**: Simple to implement with reactive forms; no dependency on a tag-chip library; aligns with project's minimal-dependency approach
- **Implementation**: On initializing the form, join `tags` array with `", "`; on save, split and trim

**Decision 6: No service changes**
- **Choice**: `TaskService.createTask` and `updateTask` pass the full task object — new fields flow through automatically
- **Rationale**: The service uses `http.post<Task>(url, task)` and `http.put<Task>(url, task)` so adding fields to the model is sufficient. json-server stores all fields.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Overdue comparison crosses midnight/timezone boundaries | Use date-only string comparison (`dueDate <= today's YYYY-MM-DD string`) to avoid time-of-day issues |
| Tags input (comma-separated) is less polished than a chip input | Acceptable for now; explicitly a non-goal to add chip library |
| Existing tasks in db.json have no `dueDate`/`tags` — components must handle `undefined` gracefully | Use `@if (task().dueDate)` and `@if (task().tags?.length)` guards in templates |

## Migration Plan

**Deployment**:
1. Extend `Task` interface (no breaking change — optional fields)
2. Update `TaskCardComponent` template to display new fields
3. Update `TaskDetailPanelComponent` reactive form and template
4. Add sample data to `db.json`

**Rollback**:
- Remove new template sections and form fields
- Remove optional fields from interface
- No database migration needed — json-server is a JSON file

## Open Questions

- Should tags be stored lowercase-normalized on save? (Recommend: yes, trim + lowercase)
- Should the due date field allow clearing once set? (Recommend: yes, leave input blank = `undefined` on save)
