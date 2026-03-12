import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TaskCardComponent } from './task-card';
import type { Task } from '../task.model';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'backlog',
      priority: 'medium',
      category: 'Testing',
      estimate: 5,
      createdAt: '2026-03-12T00:00:00Z',
    });
  });

  it('should emit select event when clicked and not dragging', () => {
    const selectSpy = vi.spyOn(component.select, 'emit');

    component.onClick();

    expect(selectSpy).toHaveBeenCalledWith(component.task());
  });

  it('should NOT emit select event when clicked during drag', () => {
    const selectSpy = vi.spyOn(component.select, 'emit');

    component.isDragging.set(true);
    component.onClick();

    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('should set isDragging to true on cdkDragStarted', () => {
    expect(component.isDragging()).toBe(false);

    component.isDragging.set(true);

    expect(component.isDragging()).toBe(true);
  });

  it('should set isDragging to false on cdkDragEnded', () => {
    component.isDragging.set(true);
    expect(component.isDragging()).toBe(true);

    component.isDragging.set(false);

    expect(component.isDragging()).toBe(false);
  });

  it('should emit select event after drag ends', () => {
    const selectSpy = vi.spyOn(component.select, 'emit');

    component.isDragging.set(true);
    component.isDragging.set(false);
    component.onClick();

    expect(selectSpy).toHaveBeenCalledWith(component.task());
  });
});
