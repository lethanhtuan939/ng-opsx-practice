## Context

The project is a greenfield Angular 21.2.2 application with Tailwind CSS 4 already configured. The workspace currently has only the default scaffolded app component with empty routing. The goal is to build a Kanban task board backed by json-server on port 3000. Angular CDK provides the drag-and-drop primitives. All components must be standalone (Angular 21 default), use signals for state, and follow OnPush change detection.

## Goals / Non-Goals

**Goals:**

- Deliver a fully functional Kanban board with drag-and-drop task management
- Clean separation between data layer (service) and presentation (components)
- Responsive board layout using Tailwind CSS
- Real-time persistence of all changes to json-server

**Non-Goals:**

- User authentication or multi-user support
- Real-time collaboration / WebSocket sync
- Agentic AI features (deferred to a future change)
- Production backend — json-server is sufficient
- Offline support or service workers

## Decisions

### 1. State Management: Signal-based service with RxJS for HTTP

**Decision**: Use a `TaskService` that holds a `signal<Task[]>` as the single source of truth. HTTP calls use Angular `HttpClient` (returns Observables), but results are pushed into the signal.

**Rationale**: Signals integrate naturally with Angular 21's change detection and `computed()`. RxJS is only used at the HTTP boundary. This avoids pulling in NgRx or another state library for a single-entity domain.

**Alternative considered**: Full RxJS BehaviorSubject store — rejected because signals are simpler for synchronous reads in templates and computed derivations.

### 2. Component Architecture

**Decision**: Four main components organized under `src/app/board/`:

```
src/app/board/
  board.ts              — Main board page (route component)
  board.html
  board.css
  task-card/
    task-card.ts        — Single task card (presentational)
  task-detail-panel/
    task-detail-panel.ts — Side panel for editing tasks
    task-detail-panel.html
  search-filter/
    search-filter.ts    — Search bar + priority filter
```

**Rationale**: Flat structure within a single feature folder. Components are small and focused. The board component orchestrates layout and drag-drop; child components are presentational.

### 3. Drag-and-Drop: Angular CDK DragDrop

**Decision**: Use `CdkDragDrop` with `cdkDropList` per column and `cdkDrag` per task card. On drop, call the API to update the task's `status` field.

**Rationale**: CDK drag-drop is the standard Angular solution, well-maintained, and already part of the Angular ecosystem. No need for a third-party library.

### 4. Task Detail Editing: Side Panel (not modal)

**Decision**: Use a slide-in side panel anchored to the right of the viewport rather than a centered modal dialog.

**Rationale**: Side panels keep the board visible for context. They also work better on wide screens where the board is the primary workspace. Implemented as a component with conditional rendering via `@if`, no dialog CDK needed.

### 5. Routing

**Decision**: Single route `/` renders the board. The side panel is toggled via component state, not a child route.

**Rationale**: The application has a single page. Sub-routing for the detail panel adds complexity without benefit.

### 6. json-server Setup

**Decision**: Add `db.json` at project root with seed data. Add an npm script `"api": "json-server --watch db.json --port 3000"` and a `"dev"` script using `concurrently` to run both Angular and json-server.

**Rationale**: Keeps the mock API self-contained. `concurrently` is a common dev dependency for running parallel processes.

### 7. Data Model

**Decision**: Use the `Task` interface as defined in project.md:

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  category: string;
  estimate: number;
  createdAt: string;
}

type TaskStatus = 'backlog' | 'ready' | 'doing' | 'waiting' | 'done' | 'rejected';
type Priority = 'low' | 'medium' | 'high';
```

**Rationale**: Matches the `db.json` schema from the project requirements. String IDs for json-server compatibility.

## Risks / Trade-offs

- **[No optimistic updates]** → Tasks update only after the API responds. Acceptable for a local json-server with near-zero latency. If perceived lag becomes an issue, optimistic updates can be added later.
- **[Single signal store]** → All tasks in one signal array. For a small dataset (< hundreds of tasks), this is fine. Not designed for thousands of tasks.
- **[No error retry]** → HTTP errors display a message but don't auto-retry. Sufficient for a dev mock API.
- **[json-server limitations]** → No complex queries. Filtering is done client-side after fetching all tasks. json-server's `_like` query param can be used for server-side title search if needed.
