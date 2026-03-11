import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { PRIORITIES, Priority } from '../task.model';

@Component({
    selector: 'app-search-filter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, TitleCasePipe],
    template: `
    <div class="flex flex-wrap items-center gap-4">
      <div>
        <label for="search-input" class="sr-only">Search tasks</label>
        <input
          id="search-input"
          type="search"
          placeholder="Search tasks…"
          aria-label="Search tasks"
          class="rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          [ngModel]="taskService.searchTerm()"
          (ngModelChange)="taskService.searchTerm.set($event)"
        />
      </div>
      <div>
        <label for="priority-filter" class="sr-only">Filter by priority</label>
        <select
          id="priority-filter"
          aria-label="Filter by priority"
          class="rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          [ngModel]="taskService.priorityFilter()"
          (ngModelChange)="taskService.priorityFilter.set($event)"
        >
          <option value="">All Priorities</option>
          @for (p of priorities; track p) {
            <option [value]="p">{{ p | titlecase }}</option>
          }
        </select>
      </div>
    </div>
  `,
})
export class SearchFilterComponent {
    readonly taskService = inject(TaskService);
    readonly priorities = PRIORITIES;
}
