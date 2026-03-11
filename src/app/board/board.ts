import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CdkDropListGroup, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from './task.service';
import { Task, TaskStatus, TASK_STATUSES } from './task.model';
import { TaskCardComponent } from './task-card/task-card';
import { TaskDetailPanelComponent } from './task-detail-panel/task-detail-panel';
import { SearchFilterComponent } from './search-filter/search-filter';

@Component({
    selector: 'app-board',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CdkDropListGroup,
        CdkDropList,
        TaskCardComponent,
        TaskDetailPanelComponent,
        SearchFilterComponent,
    ],
    templateUrl: './board.html',
    styleUrl: './board.css',
})
export class BoardComponent implements OnInit {
    private readonly taskService = inject(TaskService);

    readonly columns = TASK_STATUSES;
    readonly loading = this.taskService.loading;
    readonly panelOpen = signal(false);
    readonly selectedTask = signal<Task | null>(null);

    ngOnInit(): void {
        this.taskService.loadTasks();
    }

    tasksByStatus(status: TaskStatus): Task[] {
        return this.taskService.filteredTasks().filter(t => t.status === status);
    }

    drop(event: CdkDragDrop<TaskStatus>): void {
        if (event.previousContainer === event.container) return;
        const task = event.item.data as Task;
        if (task) {
            this.taskService.updateTaskStatus(task.id, event.container.data);
        }
    }

    openCreatePanel(): void {
        this.selectedTask.set(null);
        this.panelOpen.set(true);
    }

    openEditPanel(task: Task): void {
        this.selectedTask.set(task);
        this.panelOpen.set(true);
    }

    closePanel(): void {
        this.panelOpen.set(false);
        this.selectedTask.set(null);
    }

    onSave(task: Task | Omit<Task, 'id' | 'createdAt'>): void {
        if ('id' in task) {
            this.taskService.updateTask(task);
        } else {
            this.taskService.createTask(task);
        }
        this.closePanel();
    }

    onDelete(id: string): void {
        this.taskService.deleteTask(id);
        this.closePanel();
    }
}
