## ADDED Requirements

### Requirement: Modal confirmation dialog displays on delete request

When the user clicks the delete button, the system SHALL display a modal dialog that confirms the user wants to delete the task before proceeding.

#### Scenario: Dialog appears on delete click

- **WHEN** user clicks the "Delete" button in the task detail panel
- **THEN** a modal dialog appears blocking interaction with the board
- **AND** the dialog displays the task title to confirm which task is being deleted
- **AND** the task detail panel form remains visible but disabled behind the dialog

#### Scenario: Dialog displays confirmation message

- **WHEN** the confirmation dialog is open
- **THEN** the dialog displays text: "Delete task: [Task Title]?"
- **AND** the dialog provides two action buttons: "Cancel" and "Delete"
- **AND** the "Delete" button is styled distinctly (red) to indicate destructive action
- **AND** the "Cancel" button is styled neutrally (gray)

### Requirement: User can confirm deletion from dialog

The system SHALL allow users to confirm the deletion action via the dialog's confirm button.

#### Scenario: Confirm button triggers deletion

- **WHEN** the dialog is open and user clicks the "Delete" button
- **THEN** the dialog closes
- **AND** the task is deleted from the board and backend
- **AND** the detail panel closes
- **AND** deletion is immediately persisted to the database

### Requirement: User can cancel deletion from dialog

The system SHALL allow users to cancel the deletion and return to the detail panel.

#### Scenario: Cancel button dismisses dialog

- **WHEN** the dialog is open and user clicks the "Cancel" button
- **THEN** the dialog closes
- **AND** the task detail panel remains open with form data intact
- **AND** no deletion occurs

### Requirement: Keyboard support for dialog

The system SHALL support standard keyboard interactions with the confirmation dialog.

#### Scenario: Escape key cancels dialog

- **WHEN** the dialog is open and user presses the Escape key
- **THEN** the dialog closes (same as Cancel button)
- **AND** the detail panel remains open

#### Scenario: Enter key confirms deletion

- **WHEN** the dialog is open and the delete/confirm button has focus
- **AND** user presses the Enter key
- **THEN** the deletion proceeds (same as clicking confirm button)

#### Scenario: Tab navigation works in dialog

- **WHEN** the dialog is open and user presses Tab
- **THEN** focus cycles between Cancel and Delete buttons
- **AND** focus does not escape to the board behind the dialog

### Requirement: Accessibility for confirmation dialog

The system SHALL ensure the dialog is accessible to screen readers and keyboard users.

#### Scenario: Dialog has proper ARIA attributes

- **WHEN** the dialog is open
- **THEN** the dialog element has `role="dialog"` and `aria-modal="true"`
- **AND** the dialog has an `aria-label` or `aria-labelledby` describing its purpose
- **AND** buttons have descriptive labels ("Confirm Delete" / "Cancel")

#### Scenario: Focus management on dialog open

- **WHEN** the dialog opens
- **THEN** focus is automatically moved to the Cancel button (safe default)
- **AND** focus trap prevents tabbing to elements behind the modal

### Requirement: Visual feedback during dialog interaction

The system SHALL provide clear visual feedback during all dialog interactions.

#### Scenario: Hover states on buttons

- **WHEN** user hovers over the Cancel button
- **THEN** button background changes to indicate interactivity

- **WHEN** user hovers over the Delete button
- **THEN** button background changes to a darker red

#### Scenario: Button state during action

- **WHEN** deletion request is processing (waiting for backend response)
- **THEN** both buttons are disabled
- **AND** optional: a loading indicator appears
- **AND** user cannot accidentally trigger duplicate deletions
