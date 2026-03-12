## 1. Investigate

- [x] 1.1 Reproduce the drag-and-drop failure in the running app and identify where the status update is not applied
- [x] 1.2 Inspect the board drag/drop handler and `TaskService.updateTaskStatus()` implementation for issues

## 2. Fix drag-and-drop behavior

- [x] 2.1 Update the board component drop handler to call `TaskService.updateTaskStatus()` with the correct status when a task is dropped into a new column
- [x] 2.2 Ensure the task list signal is updated after the backend confirms the status change
- [x] 2.3 Add rollback behavior so dropped tasks return to their original column if persistence fails

## 3. Add regression coverage

- [x] 3.1 Add a unit test that verifies dropping a task into a new column triggers `TaskService.updateTaskStatus()` with the expected status
- [x] 3.2 Add a unit test that verifies the UI resets the task position when the status update fails

## 4. Validation

- [ ] 4.1 Run the app and manually verify drag-and-drop works across all columns and tasks persist
- [x] 4.2 Run existing unit tests and ensure none regress
