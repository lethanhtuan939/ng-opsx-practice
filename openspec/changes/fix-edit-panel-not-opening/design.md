## Context

The task card component uses Angular CDK's `cdkDrag` directive to enable drag-and-drop functionality between columns. Currently, when users attempt to click a task card to open the edit panel, the click event is not reliably detected or emitted. The interaction between the drag handler and click handler is interfering with normal click propagation, making it impossible for users to reliably open the detail panel.

## Goals / Non-Goals

**Goals:**
- Make clicking anywhere on a task card reliably open the edit panel.
- Ensure that drag-and-drop continues to work normally without regression.
- Guarantee the click-to-open behavior is not blocked by CDK drag internals.

**Non-Goals:**
- Change the drag-and-drop implementation or UX.
- Modify the edit panel component itself.
- Add new capabilities beyond opening the panel.

## Decisions

- **Move click handler to the draggable element**: Attach the click handler directly to the `cdkDrag` div (the actual draggable element) rather than the component host, ensuring the click event reaches the handler reliably.

- **Track drag state locally**: Use `cdkDragStarted` and `cdkDragEnded` events to maintain an `isDragging` signal. Only emit the "select" event on click if we're not actively dragging (prevents accidental opens during a drag).

- **Guard against false positives**: The handler checks `isDragging()` before emitting, ensuring that a user dragging a card and then releasing doesn't accidentally trigger an edit panel open.

## Risks / Trade-offs

- **[Risk]** If the drag state tracking is imprecise, a user might accidentally open the edit panel while dragging.
  → **Mitigation:** CDK's drag lifecycle events (`cdkDragStarted` / `cdkDragEnded`) are reliable; timing them with click is safe.

- **[Risk]** Placing the click handler on the same element as `cdkDrag` might introduce performance concerns or event ordering issues.
  → **Mitigation:** CDK drag handlers are optimized and designed to coexist with other element handlers; this pattern is standard in Angular apps using CDK.

- **[Risk]** If the click happens during pointer up (end of drag), it might still open the panel unexpectedly.
  → **Mitigation:** The `isDragging` signal is set to `false` by `cdkDragEnded`, which fires before the click, so timing is correct.
