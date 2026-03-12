## Why

The current `Task` model is missing two fields that are explicitly called out in the project spec: `tags` and a deadline/due date. These were part of the original requirements for the task detail panel but were never implemented, leaving the data model incomplete.

Adding `dueDate` and `tags` closes the gap between the spec and the implementation, and unlocks immediately useful UX improvements:
- **Due dates** give tasks a sense of urgency. Overdue tasks can be visually highlighted on cards, and users can capture real deadlines during planning.
- **Tags** allow lightweight categorization beyond the single `category` field, making boards easier to scan and filter.

## What Changes

- Extend the `Task` interface with two optional fields: `dueDate?: string` (ISO date string) and `tags?: string[]`
- Update the task detail panel form with a date picker input for `dueDate` and a tag input for `tags`
- Update task cards to show a due date badge (with overdue highlight in red when past due)
- Update task cards to show tags as small pills beneath the title
- Seed `db.json` with example `dueDate` and `tags` values on existing tasks
- No backend schema change needed — json-server accepts arbitrary fields

## Capabilities

### New Capabilities
- `task-due-date`: Display and editing of a due date on each task, with overdue visual indicator on task cards

### Modified Capabilities
- `task-card`: Updated to show due date badge and tags pills
- `task-detail-panel`: Updated form with due date and tags input fields

## Impact

- **Code affected**: `task.model.ts`, `task-card.ts` and template, `task-detail-panel.ts` and template
- **Data affected**: `db.json` — optional fields on existing tasks, no migration needed
- **Dependencies**: No new external dependencies
- **User workflow**: Users can now set deadlines and tags when creating or editing tasks
- **Testing**: Visual regression on task cards, form input coverage for new fields
