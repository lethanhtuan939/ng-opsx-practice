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
import { Task, TASK_STATUSES, PRIORITIES } from '../task.model';

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

    private readonly fb = new FormBuilder();
    readonly form = this.fb.nonNullable.group({
        title: ['', Validators.required],
        description: [''],
        status: ['backlog'],
        priority: ['medium'],
        category: [''],
        estimate: [0],
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
        const value = this.form.getRawValue() as Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'category' | 'estimate'>;
        const taskData = this.task();
        if (taskData) {
            this.save.emit({ ...taskData, ...value });
        } else {
            this.save.emit(value);
        }
    }

    onDeleteClick(): void {
        const taskData = this.task();
        if (taskData && confirm('Are you sure you want to delete this task?')) {
            this.delete.emit(taskData.id);
        }
    }

    onClose(): void {
        this.visible.set(false);
        // Wait for animation to finish
        setTimeout(() => this.close.emit(), 300);
    }
}
