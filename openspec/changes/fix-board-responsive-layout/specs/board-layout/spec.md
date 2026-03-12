## MODIFIED Requirements

### Requirement: Board displays all task columns

The board layout SHALL display all task status columns (Backlog, Ready, Doing, Waiting, Done, Rejected) in a single view where viewport space permits, with responsive adaptation.

#### Scenario: All columns visible on 1024px and larger

- **WHEN** the viewport width is 1024px or larger
- **THEN** all 6 columns are visible without requiring horizontal scroll
- **AND** the responsive column widths adapt to fit the viewport

#### Scenario: Partial visibility on smaller screens with scroll acceptable

- **WHEN** the viewport width is between 768px and 1024px
- **THEN** 3-4 columns are visible
- **AND** horizontal scroll is available to access remaining columns

#### Scenario: Drag-drop between columns works across all breakpoints

- **WHEN** user drags a task from one column to another at any viewport size
- **THEN** the drag-drop operation completes successfully
- **AND** the task is moved to the target column and persisted to backend

## REMOVED Requirements

None - all existing board-layout requirements remain valid; this is an extension to support responsive sizing.
