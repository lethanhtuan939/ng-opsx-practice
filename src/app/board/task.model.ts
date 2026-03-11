export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    category: string;
    estimate: number;
    createdAt: string;
}

export type TaskStatus = 'backlog' | 'ready' | 'doing' | 'waiting' | 'done' | 'rejected';

export type Priority = 'low' | 'medium' | 'high';

export const TASK_STATUSES: { key: TaskStatus; label: string }[] = [
    { key: 'backlog', label: 'Backlog' },
    { key: 'ready', label: 'Ready' },
    { key: 'doing', label: 'Doing' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'done', label: 'Done' },
    { key: 'rejected', label: 'Rejected' },
];

export const PRIORITIES: Priority[] = ['low', 'medium', 'high'];
