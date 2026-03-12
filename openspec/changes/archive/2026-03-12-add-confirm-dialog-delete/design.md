## Context

Currently, the task detail panel has a delete button that immediately removes the task without confirmation. The panel is displayed in `src/app/board/task-detail-panel/task-detail-panel.ts`, and the delete flow calls `onDeleteClick()` which emits a `delete` event with the task ID. The board component then directly calls `taskService.deleteTask(id)` without confirmation UI.

Users may accidentally click delete, causing permanent data loss since there's no undo capability.

## Goals / Non-Goals

**Goals:**
- Prevent accidental task deletions with a modal confirmation dialog
- Display task title in confirmation message
- Support keyboard navigation (Escape to cancel, Enter to confirm)
- Maintain accessibility (ARIA labels, focus management)
- Keep dialog styling consistent with app theme (Tailwind)

**Non-Goals:**
- Soft-delete or trash/recovery system (data still deleted immediately after confirmation)
- Undo/redo functionality
- Bulk delete operations
- Custom confirmation message per task

## Decisions

**Decision 1: Native HTML Dialog vs. Angular Component**
- **Choice**: Use native HTML `<dialog>` element with CSS styling
- **Rationale**: Lightweight, no extra dependencies, built-in modal behavior, native browser support
- **Alternatives**:
  - Angular Material Dialog → Larger bundle, unnecessary for this use case
  - Custom div with overlay → More complex, reinvents modal behavior
- **Implementation**: Add `<dialog>` element in task-detail-panel template, control with `open` attribute binding

**Decision 2: Dialog Trigger Location**
- **Choice**: Add confirmation dialog inside TaskDetailPanelComponent, triggered before emit
- **Rationale**: Dialog is consumed by the detail panel, keeps logic colocated
- **Alternatives**:
  - Move to board component → Separates concern, board doesn't own delete UI
  - Separate dialog component → Over-engineered for single use
- **Implementation**: Dialog triggered by modified `onDeleteClick()` that shows dialog instead of emitting immediately

**Decision 3: Keyboard Support**
- **Choice**: Escape closes (cancel), Enter confirms (if confirm button focused)
- **Rationale**: Standard UX pattern, matches accessibility expectations
- **Implementation**: 
  - `(keydown.escape)="closeDialog()"` on dialog
  - Focus confirmation button after dialog opens
  - Button click handlers for explicit confirm/cancel

**Decision 4: Styling**
- **Choice**: Match existing panel styling with Tailwind classes
- **Rationale**: Consistent UX, uses existing design system
- **Implementation**: Reuse color/spacing patterns from task-detail-panel (blue for confirm, gray for cancel)

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Dialog adds one extra click to delete workflow | Accept as UX cost for data safety; standard pattern in most apps |
| Native `<dialog>` browser support older versions | Check browser stats; nearly 100% modern support; graceful fallback in tests |
| Focus management needs testing | Add test to verify focus traps and cycles correctly |
| Keyboard Enter might interfere with form submission | Dialog is separate from form; only triggers on focused confirm button |

## Migration Plan

**Deployment**:
1. Add dialog element and state signal to TaskDetailPanelComponent
2. Add confirmation logic in onDeleteClick() that shows dialog
3. Add dialog styling in component template
4. Add keyboard event handlers for Escape/Enter
5. Test keyboard navigation and focus management

**Rollback**:
- Remove dialog template, restore onDeleteClick() to emit immediately
- Frontend-only change, no database/API modifications

## Open Questions

- Should we show task details (ID, created date) in confirmation, or just title?
- Should cancel button be primary focus, or confirm button?
