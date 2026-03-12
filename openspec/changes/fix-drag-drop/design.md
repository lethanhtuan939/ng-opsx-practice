## Context

The application is a Kanban-style task board built on Angular 21 with a `TaskService` signal store and a board UI leveraging `@angular/cdk/drag-drop`. Tasks are grouped into six columns by status and should be movable between those columns via drag-and-drop. Currently, dragging a task does not successfully move it into another column, preventing users from updating task status through the UI.

## Goals / Non-Goals

**Goals:**
- Restore drag-and-drop functionality so tasks can be moved between any of the six board columns.
- Ensure the task’s `status` is updated in the backend (`json-server`) and the UI updates immediately.
- Add a small regression test (unit or integration) to prevent this behavior from breaking again.

**Non-Goals:**
- Re-architecting the drag/drop implementation beyond what is needed to restore correct behavior.
- Introducing a new drag-and-drop library or changing the UI paradigm (e.g., switching to click-to-move).

## Decisions

- **Fix the existing CDK drop handler**: The most likely root cause is that the drop handler isn’t updating the task status correctly or is not called due to misconfiguration of `cdkDropList`/`cdkDrag`. Instead of rebuilding the drag/drop layer, we will inspect and fix existing logic in `board.ts` and related templates.

- **Persist status changes via `TaskService.updateTaskStatus()`**: Ensure the drop handler calls the service method responsible for updating a task’s status and that the service updates its signal after a successful HTTP response.

- **Add a regression test**: A unit test should cover the drop handler updating the task and verify the service is called with the correct status. This ensures future changes do not regress the drag/drop workflow.

## Risks / Trade-offs

- **[Risk]** Fix might surface related state issues (e.g., tasks not re-rendering after update).
  → **Mitigation:** Confirm `TaskService` uses signals/called `set()` properly; ensure board uses `TaskService.filteredTasks` computed signal.

- **[Risk]** Testing drag/drop behavior can be flaky in unit tests.
  → **Mitigation:** Keep tests focused on the handler logic and service interaction rather than full drag/drop DOM events.
