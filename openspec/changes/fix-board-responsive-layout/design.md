## Context

The current board layout uses `min-width: max-content` to accommodate all 6 columns (Backlog, Ready, Doing, Waiting, Done, Rejected) with each column fixed at `w-64` (256px). This forces horizontal scrolling on screens smaller than ~1700px, creating poor UX on modern laptop screens (1920x1200).

Current constraint: `flex gap-4` with `min-width: max-content` on the board container. Board is wrapped in `overflow-x-auto` to handle overflow. Tailwind 4 is available for responsive utilities.

## Goals / Non-Goals

**Goals:**
- Eliminate horizontal scrolling on 1920x1200 screens while showing all 6 columns
- Support responsive layouts for other screen sizes (tablet, mobile, large desktop)
- Maintain full drag-and-drop functionality across all breakpoints
- Preserve accessibility (keyboard navigation, ARIA labels, focus management)
- Keep implementation simple and maintainable using Tailwind utilities

**Non-Goals:**
- Server-side rendering or dynamic column visibility based on user preferences
- Column reordering or customization
- Mobile-optimized single-column layout (out of scope for this fix)
- Virtual scrolling or column virtualization

## Decisions

**Decision 1: Responsive Column Width**
- **Choice**: Use Tailwind responsive prefixes to adjust column width by breakpoint
- **Rationale**: Tailwind provides clean, maintainable breakpoint handling without custom CSS
- **Alternatives**: 
  - CSS Grid with auto-fit → More complex, harder to debug
  - JavaScript-based dynamic width calculation → Adds runtime overhead
  - Fixed width reduction → Less flexible for future layouts
- **Implementation**: Replace `w-64` with breakpoint-aware sizes: `w-56 md:w-64` (start narrower, expand on larger screens)

**Decision 2: Remove min-width Constraint**
- **Choice**: Remove `min-width: max-content`, let flex layout with gap handle spacing
- **Rationale**: The constraint forces horizontal scroll; responsive column widths eliminate the need for it
- **Alternatives**:
  - Use `overflow: hidden` on columns → Breaks scroll behavior on touch/trackpad
  - Implement virtual scrolling → Over-engineered for this use case
- **Implementation**: Update board container from `flex gap-4` style to rely purely on responsive column widths

**Decision 3: Breakpoint Strategy**
- **Breakpoints**:
  - `<768px` (mobile): 2-3 columns visible, likely with scroll (future phase)
  - `768px-1024px` (tablet): 3-4 columns, narrower widths
  - `1024px-1920px` (laptop): All 6 columns, adaptive spacing
  - `>1920px` (large desktop): All 6 columns with comfortable spacing
- **Rationale**: Target immediate pain point (1920x1200) while future-proofing for mobile
- **Current focus**: 1024px and above to eliminate horizontal scroll on laptop/desktop

**Decision 4: Maintain Drag-and-Drop**
- **Choice**: Test CDK drop lists with responsive column widths; no special handling needed
- **Rationale**: CDK drag-drop calculates positions dynamically; responsive width changes won't break it
- **Risk mitigation**: Add regression tests for drag/drop at different screen sizes

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Responsive widths might break drag-drop on some screen sizes | Test extensively at each breakpoint; CDK should handle dynamic widths fine |
| Columns become too narrow on tablet (768-1024px) may reduce readability | Accept minor UX degradation on tablet; mobile full redesign is future work |
| Gap spacing change might affect visual balance | Adjust gap responsively too if needed (e.g., `gap-2 md:gap-4`) |
| Users on large screens (>1920px) have lots of whitespace | Keep column widths capped; don't increase beyond comfortable reading width |

## Migration Plan

**Deployment**:
1. Update `board.html` to remove `min-width: max-content`
2. Update column breakpoints in wrapper div
3. Adjust individual column `w-64` to responsive `w-48 sm:w-56 md:w-64`
4. Test layout at multiple breakpoints (1024px, 1366px, 1920px, 2560px)
5. Verify drag-drop works on each breakpoint

**Rollback**:
- Revert HTML changes; no database or API changes, so rollback is instant

## Open Questions

- Should we adjust gap spacing responsively too? (e.g., `gap-2 md:gap-3 lg:gap-4`)
- Are there specific breakpoints beyond 1920px we should optimize for?
