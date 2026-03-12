import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Task } from '../task.model';

@Component({
    selector: 'app-task-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkDrag, DatePipe],
    host: {
        'class': 'relative block',
        '(keydown.enter)': 'onClick()',
        '(keydown.space)': '$event.preventDefault(); onClick()',
        'tabindex': '0',
        'role': 'button',
        '[attr.aria-label]': '"Open task: " + task().title',
    },
    template: `
    <div
      class="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-blue-500 cursor-grab active:cursor-grabbing"
      cdkDrag
      [cdkDragData]="task()"
      (click)="onClick()"
      (cdkDragStarted)="isDragging.set(true)"
      (cdkDragEnded)="isDragging.set(false)"
    >
      <p class="text-sm font-medium text-gray-900">{{ task().title }}</p>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        <span
          class="inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
          [class]="priorityClasses()"
        >{{ task().priority }}</span>
        @if (task().category) {
          <span class="text-xs text-gray-500">{{ task().category }}</span>
        }
        @if (task().estimate) {
          <span class="text-xs text-gray-400">{{ task().estimate }}h</span>
        }
      </div>
      @if (task().dueDate) {
        <div class="mt-1.5">
          <span
            class="text-xs"
            [class]="isOverdue() ? 'text-red-600 font-medium' : 'text-gray-400'"
            [attr.aria-label]="isOverdue() ? 'Overdue: due ' + task().dueDate : 'Due ' + task().dueDate"
          >
            {{ isOverdue() ? '⚠ ' : '' }}Due {{ task().dueDate | date:'mediumDate' }}
          </span>
        </div>
      }
      @if (task().tags?.length) {
        <div class="mt-1.5 flex flex-wrap gap-1">
          @for (tag of visibleTags(); track tag) {
            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{{ tag }}</span>
          }
          @if (remainingTagCount() > 0) {
            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">+{{ remainingTagCount() }} more</span>
          }
        </div>
      }
    </div>
  `,
})
export class TaskCardComponent {
    readonly task = input.required<Task>();
    readonly select = output<Task>();

    readonly isDragging = signal(false);

    readonly isOverdue = computed(() => {
        const due = this.task().dueDate;
        if (!due) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(due) < today;
    });

    readonly visibleTags = computed(() => (this.task().tags ?? []).slice(0, 3));
    readonly remainingTagCount = computed(() => Math.max(0, (this.task().tags ?? []).length - 3));

    onClick(): void {
        if (!this.isDragging()) {
            this.select.emit(this.task());
        }
    }

    priorityClasses(): string {
        switch (this.task().priority) {
            case 'high':
                return 'bg-red-100 text-red-700';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700';
            case 'low':
                return 'bg-green-100 text-green-700';
        }
    }
}
