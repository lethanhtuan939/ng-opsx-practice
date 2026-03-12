import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { BoardComponent } from './board';
import { TaskService } from './task.service';
import type { Task } from './task.model';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let taskService: { setTaskStatusLocally: ReturnType<typeof vi.fn>; updateTaskStatus: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    taskService = {
      setTaskStatusLocally: vi.fn(),
      updateTaskStatus: vi.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [{ provide: TaskService, useValue: taskService }],
    }).compileComponents();

    const fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  it('should update task status when dropped into a different column', () => {
    const task: Task = {
      id: '1',
      title: 'Test',
      description: '',
      status: 'backlog',
      priority: 'low',
      category: '',
      estimate: 0,
      createdAt: '',
    };

    const container = { id: 'ready', data: [] } as any;
    const previousContainer = { id: 'backlog', data: [task] } as any;

    component.drop({ previousContainer, container, item: { data: task }, previousIndex: 0, currentIndex: 0 } as any);

    expect(taskService.setTaskStatusLocally).toHaveBeenCalledWith('1', 'ready');
    expect(taskService.updateTaskStatus).toHaveBeenCalledWith('1', 'ready');
  });

  it('should rollback status change if the backend update fails', () => {
    taskService.updateTaskStatus.mockReturnValue(throwError(() => new Error('fail')));

    const task: Task = {
      id: '1',
      title: 'Test',
      description: '',
      status: 'backlog',
      priority: 'low',
      category: '',
      estimate: 0,
      createdAt: '',
    };

    const container = { id: 'ready', data: [] } as any;
    const previousContainer = { id: 'backlog', data: [task] } as any;

    component.drop({ previousContainer, container, item: { data: task }, previousIndex: 0, currentIndex: 0 } as any);

    expect(taskService.setTaskStatusLocally).toHaveBeenCalledWith('1', 'ready');
    expect(taskService.setTaskStatusLocally).toHaveBeenCalledWith('1', 'backlog');
  });
});
