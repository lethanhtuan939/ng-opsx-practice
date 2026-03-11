## Why

The project requires a Kanban-style task management application (similar to Jira/Trello) that allows users to organize, track, and manage tasks across multiple workflow states. Currently the Angular application is an empty shell with no features. Building the task board is the core deliverable, providing interactive drag-and-drop task management backed by a json-server mock API.

## What Changes

- Add a Kanban board UI with six columns: Backlog/Todo, Ready, Doing, Waiting, Done, Rejected
- Implement drag-and-drop task movement between columns using `@angular/cdk/drag-drop`
- Build full CRUD operations for tasks against a json-server REST API (port 3000)
- Add search and filter functionality by title and priority
- Create a task detail modal/side-panel for editing descriptions, tags, and deadlines
- Set up `json-server` with a `db.json` data file for persistence
- Install required dependencies: `@angular/cdk`, `json-server`

## Capabilities

### New Capabilities

- `task-api-service`: HTTP service layer for CRUD operations against json-server (`/tasks` endpoint), including search/filter support
- `board-layout`: Main Kanban board component with six status columns rendering task cards, including drag-and-drop reordering between columns
- `task-card`: Task card component displaying title, priority badge, category, and estimate within board columns
- `task-detail-panel`: Side panel or modal for viewing and editing full task details (description, priority, category, estimate, deadline)
- `search-filter`: Search bar and priority filter controls to filter visible tasks across the board

### Modified Capabilities

## Impact

- **Dependencies**: Add `@angular/cdk` (drag-drop module) and `json-server` (mock backend)
- **New files**: Board component, task card component, task detail panel, task service, db.json, app routing updates
- **Scripts**: Add npm script to start json-server alongside the Angular dev server
- **Routing**: Update `app.routes.ts` with board route
- **Styles**: Leverage existing Tailwind CSS setup for all styling
