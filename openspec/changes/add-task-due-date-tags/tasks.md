## 1. Extend the Task model

- [x] 1.1 Add optional `dueDate?: string` field to the `Task` interface in `task.model.ts`
- [x] 1.2 Add optional `tags?: string[]` field to the `Task` interface in `task.model.ts`

## 2. Update db.json seed data

- [x] 2.1 Add `dueDate` values to several existing tasks in `db.json` (mix of future and past-due dates)
- [x] 2.2 Add `tags` arrays to several existing tasks in `db.json` (e.g., `["ui", "bug"]`)

## 3. Update TaskCardComponent — due date display

- [x] 3.1 Import `DatePipe` into `TaskCardComponent` imports array
- [x] 3.2 Add a `isOverdue` computed signal that returns `true` when `task().dueDate` is a past date
- [x] 3.3 Add due date badge to card template using `@if (task().dueDate)`, formatted with `DatePipe` (`'mediumDate'`)
- [x] 3.4 Bind badge text color: red (`text-red-600`) when `isOverdue()`, gray (`text-gray-400`) otherwise
- [x] 3.5 Add `aria-label` to the due date badge indicating overdue state for screen readers

## 4. Update TaskCardComponent — tags display

- [x] 4.1 Add a `visibleTags` computed signal returning the first 3 tags from `task().tags`
- [x] 4.2 Add a `remainingTagCount` computed signal returning the count of tags beyond the first 3
- [x] 4.3 Add tags pill row to card template using `@if (task().tags?.length)` guard
- [x] 4.4 Render each visible tag as a small gray pill (`@for (tag of visibleTags(); track tag)`)
- [x] 4.5 Render `+N more` count badge when `remainingTagCount() > 0`

## 5. Update TaskDetailPanelComponent form — add fields

- [x] 5.1 Add `dueDate` form control (string, default `''`) to the reactive form group
- [x] 5.2 Add `tags` form control (string, default `''`) to the reactive form group (comma-separated text)
- [x] 5.3 In `ngAfterViewInit`, patch form with `task().dueDate ?? ''` and `task().tags?.join(', ') ?? ''`
- [x] 5.4 In `onSubmit`, convert the `tags` string to a trimmed, lowercased `string[]` (split by comma, filter empty)
- [x] 5.5 In `onSubmit`, set `dueDate` to `undefined` when the field value is empty string

## 6. Update TaskDetailPanelComponent template

- [x] 6.1 Add `<input type="date">` for due date, bound to `form.controls.dueDate`, with accessible label
- [x] 6.2 Add `<input type="text">` for tags with helper text "Comma-separated, e.g. ui, bug, backend"
- [x] 6.3 Ensure both fields are inside the existing form layout with consistent Tailwind styling

## 7. Browser testing

- [ ] 7.1 Open a task card and verify due date badge appears with correct color (red if overdue)
- [ ] 7.2 Open a task card with tags and verify pills render correctly
- [ ] 7.3 Open a task in the detail panel, edit due date and tags, save, and verify card updates
- [ ] 7.4 Create a new task with due date and tags and verify they persist after page refresh
- [ ] 7.5 Verify that tasks without `dueDate` or `tags` show no badge/pills (no broken layout)
