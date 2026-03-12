import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    OnDestroy,
    output,
    signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Task, TaskStatus, Priority, TASK_STATUSES, PRIORITIES } from '../task.model';

@Component({
    selector: 'app-task-detail-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, DatePipe, TitleCasePipe],
    templateUrl: './task-detail-panel.html',
    host: {
        '(document:keydown.escape)': 'onClose()',
    },
})
export class TaskDetailPanelComponent implements AfterViewInit, OnDestroy {
    readonly task = input<Task | null>(null);
    readonly save = output<Task | Omit<Task, 'id' | 'createdAt'>>();
    readonly delete = output<string>();
    readonly close = output<void>();

    readonly statuses = TASK_STATUSES;
    readonly priorities = PRIORITIES;

    readonly visible = signal(false);
    readonly isEditMode = computed(() => !!this.task());
    readonly showDeleteConfirmation = signal(false);
    readonly isDeleting = signal(false);

    private readonly fb = new FormBuilder();
    readonly form = this.fb.nonNullable.group({
        title: ['', Validators.required],
        description: [''],
        status: ['backlog'],
        priority: ['medium'],
        category: [''],
        estimate: [0],
        dueDate: [''],
        tags: [''],
    });

    private triggerElement: Element | null = null;

    ngAfterViewInit(): void {
        this.triggerElement = document.activeElement;

        const taskData = this.task();
        if (taskData) {
            this.form.patchValue({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                category: taskData.category,
                estimate: taskData.estimate,
                dueDate: taskData.dueDate ?? '',
                tags: taskData.tags?.join(', ') ?? '',
            });
        }

        // Trigger slide-in after mount
        requestAnimationFrame(() => this.visible.set(true));
    }

    ngOnDestroy(): void {
        if (this.triggerElement instanceof HTMLElement) {
            this.triggerElement.focus();
        }
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const raw = this.form.getRawValue();
        const tags = raw.tags
            .split(',')
            .map((t: string) => t.trim().toLowerCase())
            .filter((t: string) => t.length > 0);
        const dueDate = raw.dueDate || undefined;
        const value = {
            title: raw.title,
            description: raw.description,
            status: raw.status as TaskStatus,
            priority: raw.priority as Priority,
            category: raw.category,
            estimate: raw.estimate,
            dueDate,
            tags: tags.length > 0 ? tags : undefined,
        };
        const taskData = this.task();
        if (taskData) {
            this.save.emit({ ...taskData, ...value });
        } else {
            this.save.emit(value);
        }
    }

    onDeleteClick(): void {
        this.showDeleteConfirmation.set(true);
        // Set focus to cancel button after dialog opens
        requestAnimationFrame(() => {
            const cancelButton = document.getElementById('delete-cancel-btn');
            if (cancelButton instanceof HTMLElement) {
                cancelButton.focus();
            }
        });
    }

    confirmDelete(): void {
        const taskData = this.task();
        if (taskData) {
            this.isDeleting.set(true);
            this.delete.emit(taskData.id);
        }
    }

    cancelDelete(): void {
        this.showDeleteConfirmation.set(false);
    }

    onClose(): void {
        this.visible.set(false);
        // Wait for animation to finish
        setTimeout(() => this.close.emit(), 300);
    }
}
