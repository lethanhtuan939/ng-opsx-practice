## Why

Deleting tasks is a destructive action that cannot be undone. Users may accidentally click the delete button while working, resulting in permanent data loss. A confirmation dialog provides an essential safeguard to prevent accidental deletions and improves user experience by giving users a chance to reconsider before committing to the action.

## What Changes

- Add a confirmation dialog component that displays when users click the delete button
- Dialog shows the task title and asks for explicit confirmation before deletion proceeds
- Users can confirm deletion or cancel to return to editing
- Keyboard support: Escape key closes the dialog, Enter confirms (if focused on confirm button)
- Dialog is modal and blocks interaction with the board until dismissed

## Capabilities

### New Capabilities
- `delete-confirmation-dialog`: Modal confirmation dialog displayed before task deletion, requiring explicit user confirmation to proceed

### Modified Capabilities
- Empty (no existing requirements change; this is a new safeguard layer)

## Impact

- **Code affected**: `src/app/board/task-detail-panel/task-detail-panel.ts` and template
- **UI components**: New dialog component or Material Dialog integration
- **Dependencies**: No new external dependencies (will use native HTML dialog or existing UI patterns)
- **User workflow**: One additional click required to delete tasks (acceptance cost for safety)
- **Testing**: Dialog interaction tests, keyboard navigation, confirmation flow
