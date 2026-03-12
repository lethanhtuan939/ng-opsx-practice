## MODIFIED Requirements

### Requirement: Drag-and-drop between columns

The board SHALL support dragging task cards from one column and dropping them into another column using Angular CDK drag-drop. When a task is dropped into a different column, the task's `status` SHALL be updated and persisted to the backend.

#### Scenario: Drag task to different column

- **WHEN** a user drags a task card from the "Backlog" column and drops it into the "Ready" column
- **THEN** the task's status SHALL be updated to "ready" and the task SHALL appear in the "Ready" column
- **AND** the task SHALL be persisted to the backend with the updated status

#### Scenario: Reorder within same column

- **WHEN** a user drags a task card and drops it within the same column
- **THEN** the task's status SHALL remain unchanged

#### Scenario: Persistence failure

- **WHEN** the backend returns an error while updating the task status
- **THEN** the UI SHALL revert the task to its original column
- **AND** the user SHALL be notified that the status update failed
