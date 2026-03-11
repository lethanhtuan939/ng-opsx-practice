## ADDED Requirements

### Requirement: Task card displays key information

Each task card SHALL display the task title, priority badge, category label, and estimate value.

#### Scenario: Card shows title

- **WHEN** a task card renders
- **THEN** the task title SHALL be displayed as the primary text

#### Scenario: Card shows priority badge

- **WHEN** a task card renders
- **THEN** a colored badge SHALL indicate the task's priority (high = red, medium = yellow, low = green)

#### Scenario: Card shows category

- **WHEN** a task has a category set
- **THEN** the category SHALL be displayed as a label on the card

#### Scenario: Card shows estimate

- **WHEN** a task has an estimate value
- **THEN** the estimate SHALL be displayed on the card (e.g., "3h")

### Requirement: Task card is interactive

The task card SHALL be clickable to open the task detail panel and draggable for column reordering.

#### Scenario: Click to open details

- **WHEN** a user clicks on a task card
- **THEN** the task detail panel SHALL open with that task's data

#### Scenario: Card is draggable

- **WHEN** a user initiates a drag on a task card
- **THEN** the card SHALL become a drag preview and be movable to another column

### Requirement: Task card accessibility

Each task card SHALL be keyboard accessible and have appropriate ARIA attributes.

#### Scenario: Keyboard focus

- **WHEN** a user tabs to a task card
- **THEN** the card SHALL receive visible focus indication

#### Scenario: Activate via keyboard

- **WHEN** a user presses Enter or Space on a focused task card
- **THEN** the task detail panel SHALL open for that task
