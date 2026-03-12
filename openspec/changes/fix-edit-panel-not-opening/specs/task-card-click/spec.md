## ADDED Requirements

### Requirement: Clicking a task card opens the edit panel

The system SHALL allow users to click on any task card to open the task detail panel for editing.

#### Scenario: Click on task title

- **WHEN** a user clicks on the task title text
- **THEN** the edit panel SHALL open with the task details loaded

#### Scenario: Click on empty area of card

- **WHEN** a user clicks on an empty area of the task card (not on title or badge)
- **THEN** the edit panel SHALL open with the task details loaded

#### Scenario: Click does not interfere with drag

- **WHEN** a user drags a task card to another column
- **THEN** the card SHALL move to the new column
- **AND** the edit panel SHALL NOT open during the drag

#### Scenario: Multiple rapid clicks

- **WHEN** a user rapidly clicks a task card multiple times
- **THEN** the edit panel SHALL open on each click without errors
- **AND** the panel SHALL not open multiple times simultaneously
