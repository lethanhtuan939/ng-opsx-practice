## ADDED Requirements

### Requirement: Task CRUD operations

The system SHALL provide create, read, update, and delete operations for tasks via HTTP against the json-server API at `http://localhost:3000/tasks`.

#### Scenario: Fetch all tasks

- **WHEN** the board initializes
- **THEN** the service SHALL fetch all tasks from `GET /tasks` and populate the task signal

#### Scenario: Create a new task

- **WHEN** a user submits a new task with title, status, and priority
- **THEN** the service SHALL send a `POST /tasks` request with the task data and add the created task to the signal

#### Scenario: Update an existing task

- **WHEN** a user modifies a task's fields (title, description, status, priority, category, estimate)
- **THEN** the service SHALL send a `PUT /tasks/:id` request with the updated task and update the signal accordingly

#### Scenario: Delete a task

- **WHEN** a user deletes a task
- **THEN** the service SHALL send a `DELETE /tasks/:id` request and remove the task from the signal

### Requirement: Task status update on drag-and-drop

The service SHALL provide a method to update only the `status` field of a task, used when a task is dropped into a different column.

#### Scenario: Move task to a new column

- **WHEN** a task is dragged from one column and dropped into another
- **THEN** the service SHALL send a `PATCH /tasks/:id` request with the new status and update the task in the signal

### Requirement: Signal-based state

The service SHALL expose tasks as a signal so that consuming components receive reactive updates without manual subscription management.

#### Scenario: Components read current tasks

- **WHEN** a component accesses the tasks signal
- **THEN** it SHALL receive the current array of all tasks without subscribing to an Observable

### Requirement: Task filtering support

The service SHALL expose computed signals that filter tasks by search term and priority.

#### Scenario: Filter tasks by title

- **WHEN** a search term is set on the service
- **THEN** a computed signal SHALL return only tasks whose title contains the search term (case-insensitive)

#### Scenario: Filter tasks by priority

- **WHEN** a priority filter is set on the service
- **THEN** a computed signal SHALL return only tasks matching the selected priority

#### Scenario: Combined filter

- **WHEN** both a search term and a priority filter are set
- **THEN** the computed signal SHALL return only tasks matching both criteria
