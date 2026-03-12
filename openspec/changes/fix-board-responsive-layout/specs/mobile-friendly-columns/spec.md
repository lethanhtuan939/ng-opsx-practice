## ADDED Requirements

### Requirement: Mobile-friendly column visibility strategy

The board layout SHALL support appropriate column visibility and sizing on smaller screens (tablets and mobile), with a clear degradation path.

#### Scenario: Tablet layout (768px-1024px)

- **WHEN** the viewport width is between 768px and 1024px
- **THEN** each column displays with width `224px` (w-56 in Tailwind)
- **AND** 3-4 columns are visible with horizontal scroll acceptable on this breakpoint

#### Scenario: Mobile layout preparation (future phase)

- **WHEN** the viewport width is less than 768px
- **THEN** the layout is prepared for mobile optimization (implementation deferred)
- **AND** the responsive infrastructure supports future single or dual-column layouts

### Requirement: Touch-friendly interaction on tablet

On tablet devices, touch interactions for drag-and-drop and column scrolling SHALL remain functional.

#### Scenario: Drag-drop works on tablet with scroll

- **WHEN** user performs drag-and-drop on a 768px-1024px viewport
- **THEN** drag-drop functionality works correctly
- **AND** horizontal scrolling is available for columns not visible in viewport

### Requirement: Accessibility maintained across responsiveness

The board layout changes SHALL not degrade keyboard navigation or screen reader compatibility.

#### Scenario: Keyboard navigation works at all breakpoints

- **WHEN** user navigates board with keyboard (Tab, Shift+Tab) at any breakpoint
- **THEN** focus order remains logical
- **AND** focus indicators remain visible
