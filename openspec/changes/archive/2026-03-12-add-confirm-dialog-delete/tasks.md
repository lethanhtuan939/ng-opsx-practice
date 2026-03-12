## 1. Add dialog state and signals to TaskDetailPanelComponent

- [x] 1.1 Add `showDeleteConfirmation` signal to track dialog visibility state
- [x] 1.2 Update `onDeleteClick()` to set `showDeleteConfirmation.set(true)` instead of immediately emitting delete
- [x] 1.3 Create new method `confirmDelete()` that emits the delete event after user confirms
- [x] 1.4 Create new method `cancelDelete()` that closes the dialog and returns to edit mode

## 2. Create HTML dialog element in template

- [x] 2.1 Add `<dialog>` element to task-detail-panel.html template
- [x] 2.2 Bind dialog `open` attribute to `showDeleteConfirmation()` signal
- [x] 2.3 Add dialog title/content displaying task title with confirmation message
- [x] 2.4 Add two buttons: "Cancel" and "Delete" with appropriate styling (gray and red)
- [x] 2.5 Bind button click handlers to `cancelDelete()` and `confirmDelete()` methods

## 3. Add keyboard event support

- [x] 3.1 Add `(keydown.escape)="cancelDelete()"` handler to dialog
- [x] 3.2 Add `(keydown.enter)="confirmDelete()"` handler to the delete confirm button
- [x] 3.3 Verify Tab key cycles focus between buttons without escaping modal

## 4. Add styling and accessibility

- [x] 4.1 Style dialog with semi-transparent overlay background
- [x] 4.2 Center dialog on screen with Tailwind classes
- [x] 4.3 Style Cancel button with neutral gray colors (hover effects)
- [x] 4.4 Style Delete button with red colors to indicate destructive action (hover effects)
- [x] 4.5 Add `aria-modal="true"` and `role="dialog"` to dialog element
- [x] 4.6 Add `aria-label` or `aria-labelledby` to describe dialog purpose
- [x] 4.7 Set initial focus to Cancel button after dialog opens using `requestAnimationFrame`

## 5. Add loading/processing state

- [x] 5.1 Add `isDeleting` signal to track deletion in progress
- [x] 5.2 Update `confirmDelete()` to set `isDeleting.set(true)` before emitting
- [x] 5.3 Bind button `[disabled]` attribute to `isDeleting()` signal
- [x] 5.4 Update board component's `onDelete()` to set `isDeleting.set(false)` after deletion completes

## 6. Test dialog interaction

- [x] 6.1 Test clicking Delete button triggers deletion flow
- [x] 6.2 Test clicking Cancel button closes dialog and returns to detail panel
- [x] 6.3 Test pressing Escape key closes dialog (same as Cancel)
- [x] 6.4 Test Tab key cycles between buttons without escaping modal
- [x] 6.5 Test dialog title displays correct task name
- [x] 6.6 Verify no console errors during dialog open/close

## 7. Browser testing

- [x] 7.1 Open app in browser and edit a task
- [x] 7.2 Click Delete button and verify dialog appears with correct task title
- [x] 7.3 Click Cancel and verify dialog closes, detail panel still open
- [x] 7.4 Click Delete again and click Delete to confirm, verify task is deleted
- [x] 7.5 Test on mobile viewport to verify dialog is readable and interactive
- [x] 7.6 Test keyboard navigation (Tab, Escape, Enter) works correctly

## 8. Final validation

- [x] 8.1 Run `npm run build` to verify no TypeScript errors
- [x] 8.2 Review task-detail-panel.ts for code quality and consistency
- [x] 8.3 Verify dialog styling matches board design system (colors, spacing)
- [x] 8.4 Confirm all accessibility requirements are met (ARIA, focus management)
- [x] 8.5 Check for any console warnings or errors during dialog interaction
