## ADDED Requirements

### Requirement: Responsive column widths by screen size

The board SHALL display columns with widths that adapt to the viewport size, ensuring all 6 columns fit without horizontal scrolling on screens 1024px and larger.

#### Scenario: Column widths on 1024px-1366px laptop

- **WHEN** the viewport width is between 1024px and 1366px
- **THEN** each column displays with width `224px` (w-56 in Tailwind)
- **AND** all 6 columns fit within viewport without horizontal scroll

#### Scenario: Column widths on 1366px-1920px laptop

- **WHEN** the viewport width is between 1366px and 1920px
- **THEN** each column displays with width `256px` (w-64 in Tailwind)
- **AND** all 6 columns fit within viewport without horizontal scroll

#### Scenario: Column widths on large desktop (>1920px)

- **WHEN** the viewport width exceeds 1920px
- **THEN** each column displays with width `256px` (w-64 in Tailwind)
- **AND** comfortable spacing is maintained between columns

### Requirement: Remove horizontal scroll on responsive breakpoints

The board layout SHALL eliminate `min-width: max-content` to allow column widths to shrink responsively rather than forcing horizontal overflow.

#### Scenario: No forced horizontal scroll

- **WHEN** the viewport is resized to any width 1024px or larger
- **THEN** no horizontal scrollbar appears
- **AND** users can see all 6 columns simultaneously

### Requirement: Maintain gap consistency

The gap between columns SHALL remain consistent and proportional to the responsive layout.

#### Scenario: Gap consistency across breakpoints

- **WHEN** the viewport width changes to any responsive breakpoint
- **THEN** gap between columns remains at their breakpoint's configured value (e.g., gap-3 or gap-4)
- **AND** visual spacing feels balanced relative to column width
