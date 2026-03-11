## ADDED Requirements

### Requirement: Board displays six status columns

The board component SHALL render six columns corresponding to the task statuses: Backlog/Todo, Ready, Doing, Waiting, Done, and Rejected.

#### Scenario: All columns visible on load

- **WHEN** the board component renders
- **THEN** six columns SHALL be displayed with headers: "Backlog", "Ready", "Doing", "Waiting", "Done", "Rejected"

### Requirement: Tasks grouped by status

Each column SHALL display only the tasks whose `status` field matches that column.

#### Scenario: Tasks appear in correct columns

- **WHEN** tasks are loaded from the API
- **THEN** each task SHALL appear in the column matching its `status` value

#### Scenario: Empty column shows placeholder

- **WHEN** a column has no tasks
- **THEN** it SHALL display a placeholder message indicating no tasks are present

### Requirement: Drag-and-drop between columns

The board SHALL support dragging task cards from one column and dropping them into another column using Angular CDK drag-drop.

#### Scenario: Drag task to different column

- **WHEN** a user drags a task card from the "Backlog" column and drops it into the "Ready" column
- **THEN** the task's status SHALL be updated to "ready" and the task SHALL appear in the "Ready" column

#### Scenario: Reorder within same column

- **WHEN** a user drags a task card and drops it within the same column
- **THEN** the task's status SHALL remain unchanged

### Requirement: Board layout is responsive

The board layout SHALL be horizontally scrollable on smaller viewports and display all columns side by side on wide screens.

#### Scenario: Wide viewport

- **WHEN** the viewport is 1280px or wider
- **THEN** all six columns SHALL be visible without horizontal scrolling

#### Scenario: Narrow viewport

- **WHEN** the viewport is narrower than 1280px
- **THEN** the board SHALL be horizontally scrollable to access all columns

### Requirement: Create task from board

The board SHALL provide a way to create a new task, defaulting to "backlog" status.

#### Scenario: Add new task

- **WHEN** a user clicks the "Add Task" button
- **THEN** the task detail panel SHALL open in creation mode with status pre-set to "backlog"
