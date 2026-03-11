import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Priority, Task, TaskStatus } from './task.model';

const API_URL = 'http://localhost:3000/tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly http = inject(HttpClient);

    private readonly tasks = signal<Task[]>([]);
    readonly loading = signal(false);

    readonly searchTerm = signal('');
    readonly priorityFilter = signal<Priority | ''>('');

    readonly filteredTasks = computed(() => {
        let result = this.tasks();
        const term = this.searchTerm().toLowerCase();
        const priority = this.priorityFilter();

        if (term) {
            result = result.filter(t => t.title.toLowerCase().includes(term));
        }
        if (priority) {
            result = result.filter(t => t.priority === priority);
        }
        return result;
    });

    tasksByStatus(status: TaskStatus): Task[] {
        return this.filteredTasks().filter(t => t.status === status);
    }

    loadTasks(): void {
        this.loading.set(true);
        this.http.get<Task[]>(API_URL).subscribe({
            next: tasks => {
                this.tasks.set(tasks);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    }

    createTask(task: Omit<Task, 'id' | 'createdAt'>): void {
        const newTask = {
            ...task,
            createdAt: new Date().toISOString(),
        };
        this.http.post<Task>(API_URL, newTask).subscribe(created => {
            this.tasks.update(tasks => [...tasks, created]);
        });
    }

    updateTask(task: Task): void {
        this.http.put<Task>(`${API_URL}/${task.id}`, task).subscribe(updated => {
            this.tasks.update(tasks => tasks.map(t => (t.id === updated.id ? updated : t)));
        });
    }

    deleteTask(id: string): void {
        this.http.delete(`${API_URL}/${id}`).subscribe(() => {
            this.tasks.update(tasks => tasks.filter(t => t.id !== id));
        });
    }

    updateTaskStatus(id: string, status: TaskStatus): void {
        this.http.patch<Task>(`${API_URL}/${id}`, { status }).subscribe(updated => {
            this.tasks.update(tasks => tasks.map(t => (t.id === updated.id ? updated : t)));
        });
    }
}
