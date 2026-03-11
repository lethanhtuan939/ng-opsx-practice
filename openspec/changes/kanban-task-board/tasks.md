## 1. Project Setup & Dependencies

- [x] 1.1 Install `@angular/cdk`, `json-server`, and `concurrently` dependencies
- [x] 1.2 Create `db.json` at project root with seed task data matching the Task interface
- [x] 1.3 Add npm scripts: `"api"` for json-server and `"dev"` for concurrent Angular + API startup
- [x] 1.4 Create `Task` interface and `TaskStatus`/`Priority` type definitions in `src/app/board/task.model.ts`

## 2. Task API Service

- [x] 2.1 Create `TaskService` in `src/app/board/task.service.ts` with `HttpClient` injection and task signal
- [x] 2.2 Implement `loadTasks()` method — `GET /tasks`, populates signal
- [x] 2.3 Implement `createTask()` method — `POST /tasks`, appends to signal
- [x] 2.4 Implement `updateTask()` method — `PUT /tasks/:id`, updates signal
- [x] 2.5 Implement `deleteTask()` method — `DELETE /tasks/:id`, removes from signal
- [x] 2.6 Implement `updateTaskStatus()` method — `PATCH /tasks/:id` with status, updates signal
- [x] 2.7 Add search term and priority filter signals with a computed `filteredTasks` signal

## 3. Board Layout Component

- [x] 3.1 Create board component at `src/app/board/board.ts` with six column definitions and OnPush change detection
- [x] 3.2 Implement board template with horizontal column layout using Tailwind CSS (responsive, scrollable)
- [x] 3.3 Set up `cdkDropList` per column and `cdkDropListGroup` on the board container
- [x] 3.4 Implement `drop()` handler to update task status via `TaskService.updateTaskStatus()`
- [x] 3.5 Add "Add Task" button that opens the task detail panel in creation mode
- [x] 3.6 Add board route to `app.routes.ts` as the default route (`''`)
- [x] 3.7 Provide `HttpClient` in app config (`provideHttpClient()`)

## 4. Task Card Component

- [x] 4.1 Create task card component at `src/app/board/task-card/task-card.ts` with `input()` for task data
- [x] 4.2 Implement card template showing title, priority badge (color-coded), category, and estimate
- [x] 4.3 Add `cdkDrag` directive to the card for drag support
- [x] 4.4 Add click handler and `output()` event to open task detail panel
- [x] 4.5 Add keyboard accessibility: focus styles, Enter/Space to activate

## 5. Task Detail Panel

- [x] 5.1 Create task detail panel component at `src/app/board/task-detail-panel/task-detail-panel.ts`
- [x] 5.2 Implement reactive form with fields: title (required), description, status, priority, category, estimate
- [x] 5.3 Implement slide-in animation and backdrop overlay using CSS transitions
- [x] 5.4 Implement save handler — calls `createTask()` or `updateTask()` based on mode
- [x] 5.5 Implement delete handler with confirmation prompt
- [x] 5.6 Implement close behavior: close button, backdrop click, Escape key
- [x] 5.7 Add focus trap on open and focus restoration on close
- [x] 5.8 Add form validation — title required, display error message

## 6. Search & Filter

- [x] 6.1 Create search-filter component at `src/app/board/search-filter/search-filter.ts`
- [x] 6.2 Implement search text input bound to `TaskService.searchTerm` signal
- [x] 6.3 Implement priority dropdown/select bound to `TaskService.priorityFilter` signal
- [x] 6.4 Add accessible labels and ARIA attributes to search input and priority selector
- [x] 6.5 Integrate search-filter component into board layout above the columns

## 7. Integration & Polish

- [x] 7.1 Wire up board to use `TaskService.filteredTasks` computed signal for rendering columns
- [x] 7.2 Add empty-state placeholder text for columns with no tasks
- [x] 7.3 Add loading state while initial task fetch is in progress
- [x] 7.4 Verify drag-and-drop works across all six columns
- [x] 7.5 Test responsive layout on narrow and wide viewports
