## Why

Users cannot open the task detail panel when clicking on task cards, blocking the ability to edit task information (title, description, priority, etc.). This is a critical usability issue that prevents normal workflow operations.

## What Changes

- Fix the task card click handler to reliably open the edit panel when clicked.
- Ensure the click event is properly detected and doesn't interfere with drag-and-drop functionality.
- Remove any event handling conflicts that prevent the `select` event from being emitted.

## Capabilities

### New Capabilities
- `task-card-click`: Clicking a task card reliably opens the edit panel without interfering with drag/drop.

### Modified Capabilities
- `task-detail-panel`: The panel must now be guaranteed to open whenever the board component tries to open it.

## Impact

- `src/app/board/task-card/task-card.ts` — Fix click handler logic
- `src/app/board/board.ts` — Ensure the board properly listens to task card click events
- Potential regression risk: drag-and-drop functionality must remain stable
