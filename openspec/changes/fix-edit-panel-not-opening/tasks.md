## 1. Fix task card click handler

- [x] 1.1 Update `src/app/board/task-card/task-card.ts` to move click handler from host to the draggable div element
- [x] 1.2 Add `isDragging` signal to track drag state and prevent accidental opens during drag
- [x] 1.3 Implement `onClick()` method that checks `isDragging()` before emitting the select event
- [x] 1.4 Connect `cdkDragStarted` and `cdkDragEnded` events to update the `isDragging` signal

## 2. Ensure board listens to task card events

- [x] 2.1 Verify that the board component's `openEditPanel()` is called when task card emits select event
- [x] 2.2 Confirm the task detail panel opens properly with the selected task data

## 3. Add regression coverage

- [x] 3.1 Add unit test to verify clicking a card emits the select event when not dragging
- [x] 3.2 Add unit test to verify clicking during drag does NOT emit the select event
- [x] 3.3 Verify existing drag/drop tests still pass

## 4. Manual validation

- [x] 4.1 Run the app and click on task cards to open edit panel
- [x] 4.2 Verify drag-and-drop still works without interference
- [x] 4.3 Verify clicking immediately after dragging opens the panel
