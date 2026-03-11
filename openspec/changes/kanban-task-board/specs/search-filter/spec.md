## ADDED Requirements

### Requirement: Search by title

The search filter component SHALL provide a text input that filters displayed tasks by title.

#### Scenario: Type search term

- **WHEN** a user types a search term in the search input
- **THEN** the board SHALL display only tasks whose title contains the search term (case-insensitive)

#### Scenario: Clear search

- **WHEN** a user clears the search input
- **THEN** all tasks SHALL be displayed again (subject to any active priority filter)

### Requirement: Filter by priority

The search filter component SHALL provide a priority selector to filter tasks by priority level.

#### Scenario: Select priority filter

- **WHEN** a user selects "high" from the priority filter
- **THEN** the board SHALL display only tasks with priority "high"

#### Scenario: Select "all" priority

- **WHEN** a user selects "All" in the priority filter
- **THEN** tasks of all priorities SHALL be displayed (subject to any active search term)

### Requirement: Combined filtering

Search and priority filters SHALL work together, showing only tasks matching both criteria.

#### Scenario: Search with priority filter active

- **WHEN** a user has "high" priority selected and types "login" in the search
- **THEN** the board SHALL display only high-priority tasks with "login" in the title

### Requirement: Filter controls accessibility

The search input and priority selector SHALL have proper labels and ARIA attributes.

#### Scenario: Screen reader labels

- **WHEN** a screen reader encounters the search input
- **THEN** it SHALL announce the input as "Search tasks"

#### Scenario: Priority filter label

- **WHEN** a screen reader encounters the priority selector
- **THEN** it SHALL announce it as "Filter by priority"
