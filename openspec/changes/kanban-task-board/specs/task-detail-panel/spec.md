## ADDED Requirements

### Requirement: Panel displays full task details

The task detail panel SHALL display all editable task fields: title, description, status, priority, category, estimate, and creation date.

#### Scenario: View existing task

- **WHEN** a user opens the detail panel for an existing task
- **THEN** all fields SHALL be populated with the task's current values

#### Scenario: Creation date is read-only

- **WHEN** the detail panel renders
- **THEN** the creation date SHALL be displayed but not editable

### Requirement: Panel supports task editing

The detail panel SHALL allow users to edit task fields using a reactive form and save changes.

#### Scenario: Edit and save task

- **WHEN** a user modifies task fields and clicks "Save"
- **THEN** the updated task SHALL be sent to the API and the board SHALL reflect the changes

#### Scenario: Cancel editing

- **WHEN** a user clicks "Cancel" or closes the panel without saving
- **THEN** no changes SHALL be persisted and the panel SHALL close

### Requirement: Panel supports task creation

The detail panel SHALL support creating a new task when opened in creation mode.

#### Scenario: Create new task

- **WHEN** the panel opens in creation mode
- **THEN** all fields SHALL be empty (except status defaulting to "backlog") and the submit button SHALL read "Create"

#### Scenario: Submit new task

- **WHEN** a user fills in required fields (title) and clicks "Create"
- **THEN** a new task SHALL be created via the API with a generated ID and current timestamp for `createdAt`

### Requirement: Panel supports task deletion

The detail panel SHALL provide a delete action for existing tasks.

#### Scenario: Delete task from panel

- **WHEN** a user clicks "Delete" in the detail panel
- **THEN** a confirmation SHALL be requested, and upon confirmation the task SHALL be deleted via the API and removed from the board

### Requirement: Panel slide-in behavior

The detail panel SHALL slide in from the right side of the viewport and overlay the board.

#### Scenario: Open panel

- **WHEN** a task card is clicked or "Add Task" is pressed
- **THEN** the panel SHALL slide in from the right with a backdrop overlay

#### Scenario: Close panel

- **WHEN** the user clicks the close button, backdrop, or presses Escape
- **THEN** the panel SHALL slide out and the board SHALL be fully interactive again

### Requirement: Panel form validation

The detail panel form SHALL validate that title is required and not empty.

#### Scenario: Submit without title

- **WHEN** a user attempts to save/create a task without a title
- **THEN** a validation error message SHALL be displayed and the form SHALL not submit

### Requirement: Panel accessibility

The detail panel SHALL trap focus when open and return focus to the triggering element when closed.

#### Scenario: Focus trap

- **WHEN** the panel opens
- **THEN** focus SHALL move to the first focusable element in the panel and tab cycling SHALL be constrained within the panel

#### Scenario: Focus restoration

- **WHEN** the panel closes
- **THEN** focus SHALL return to the element that triggered the panel opening
