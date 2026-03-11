import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Task } from '../task.model';

@Component({
    selector: 'app-task-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkDrag],
    host: {
        'class': 'block',
        '(click)': 'select.emit(task())',
        '(keydown.enter)': 'select.emit(task())',
        '(keydown.space)': '$event.preventDefault(); select.emit(task())',
        'tabindex': '0',
        'role': 'button',
        '[attr.aria-label]': '"Open task: " + task().title',
    },
    template: `
    <div
      class="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-blue-500 cursor-grab active:cursor-grabbing"
      cdkDrag
      [cdkDragData]="task()"
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
    </div>
  `,
})
export class TaskCardComponent {
    readonly task = input.required<Task>();
    readonly select = output<Task>();

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
