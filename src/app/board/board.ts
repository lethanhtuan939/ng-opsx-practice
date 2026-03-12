import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CdkDropListGroup, CdkDropList, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
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

    readonly tasksVersion = signal(0);

    private readonly tasksByStatusMap = new Map<TaskStatus, Task[]>(
        TASK_STATUSES.map(status => [status.key, [] as Task[]]),
    );

    constructor() {
        effect(() => {
            const tasks = this.taskService.filteredTasks();

            // Keep stable array references for CDK drop list data
            for (const status of TASK_STATUSES) {
                const list = this.tasksByStatusMap.get(status.key)!;
                list.length = 0;
            }

            for (const task of tasks) {
                this.tasksByStatusMap.get(task.status)?.push(task);
            }

            // Force change detection even though the arrays are stable references
            this.tasksVersion.update(v => v + 1);
        });
    }

    tasksByStatus(status: TaskStatus): Task[] {
        return this.tasksByStatusMap.get(status) ?? [];
    }

    ngOnInit(): void {
        this.taskService.loadTasks();
    }

    drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) return;

        const task = event.item.data as Task;
        const previousStatus = task?.status;
        const newStatus = event.container.id as TaskStatus;

        if (!task || previousStatus === newStatus) return;

        // Update the local arrays used by the CDK lists (stable references)
        const previousData = event.previousContainer.data as Task[] | undefined;
        const currentData = event.container.data as Task[] | undefined;

        if (Array.isArray(previousData) && Array.isArray(currentData)) {
            transferArrayItem(
                previousData,
                currentData,
                event.previousIndex,
                event.currentIndex,
            );
        }

        // Persist change to backend (with rollback on failure)
        this.taskService.setTaskStatusLocally(task.id, newStatus);
        this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
            error: () => {
                this.taskService.setTaskStatusLocally(task.id, previousStatus);
                transferArrayItem(
                    event.container.data,
                    event.previousContainer.data,
                    event.currentIndex,
                    event.previousIndex,
                );
            },
        });
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
