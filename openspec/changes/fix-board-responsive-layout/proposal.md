## Why

On smaller laptop screens (1920x1200px), the task board columns force horizontal scrolling, breaking the user experience. All columns should fit within the viewport without requiring scroll, allowing users to see the full board state at once.

## What Changes

- Implement responsive grid layout that adapts column width and count based on screen size
- Remove `min-width: max-content` constraint that forces horizontal scroll
- Add breakpoints to handle different screen sizes:
  - Mobile/tablet: Stack or show 2-3 columns
  - Laptop (1920px): Show all 6 columns without scroll
  - Large desktop: Show all 6 columns with appropriate spacing
- Maintain keyboard navigation and accessibility during responsive changes
- Preserve drag-and-drop functionality across all screen sizes

## Capabilities

### New Capabilities

- `responsive-board-layout`: Responsive grid system that adapts column count and width based on viewport size
- `mobile-friendly-columns`: Mobile and tablet layout for reduced column visibility

### Modified Capabilities

- `board-layout`: Current requirements assume fixed 6-column layout with required horizontal scroll; now must support viewport-responsive column visibility

## Impact

- **Code affected**: `src/app/board/board.html`, `src/app/board/board.css`
- **Styling**: Tailwind responsive classes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:` breakpoints)
- **Dependencies**: No new dependencies; uses existing Tailwind utilities
- **Testing**: Responsive layout tests, drag-drop verification on different screen sizes
- **User impact**: Better UX on medium screens without reducing functionality
