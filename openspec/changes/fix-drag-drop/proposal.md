## Why

The board currently prevents users from moving tasks between columns via drag-and-drop, which breaks the core Kanban workflow and blocks progress tracking. Fixing this restores expected task mobility and improves usability.

## What Changes

- Fix the drag-and-drop implementation so tasks can be moved between all six columns (Backlog/Todo, Ready, Doing, Waiting, Done, Rejected).
- Ensure the task status is persisted to the backend (`json-server`) when dropped into a new column.
- Add regression coverage to prevent the drag/drop workflow from breaking again.

## Capabilities

### New Capabilities
- `drag-drop-fix`: Ensure drag-and-drop works reliably across all board columns and updates task status in the backend.

### Modified Capabilities
- `board-layout`: Adjust requirements or behavior to ensure drag/drop state transitions are properly persisted and UI updates correctly.

## Impact

- `src/app/board/board.ts` and/or related drag-drop logic will be updated.
- `src/app/board/task.service.ts` may require adjustments to ensure status updates persist.
- Potential small updates to unit tests or e2e tests to cover drag-drop behavior.
