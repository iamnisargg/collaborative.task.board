import { Component, signal, computed } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardColumn } from '../../models/task.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag, ReactiveFormsModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  columns = signal<BoardColumn[]>([
    {
      id: 'todo',
      name: 'To Do',
      tasks: [
        { id: '1', title: 'Design database schema' },
        { id: '2', title: 'Set up Azure SQL' },
      ],
    },
    {
      id: 'in-progress',
      name: 'In Progress',
      tasks: [{ id: '3', title: 'Build Angular board UI' }],
    },
    {
      id: 'done',
      name: 'Done',
      tasks: [{ id: '4', title: 'Scaffold .NET microservices' }],
    },
  ]);

  columnIds = computed(() => this.columns().map((c) => c.id));

  drop(event: CdkDragDrop<BoardColumn['tasks']>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.columns.set([...this.columns()]);
  }

  newTaskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  addTask() {
    if (this.newTaskForm.invalid) return;

    const title = this.newTaskForm.controls.title.value;
    const updated = this.columns().map((col) =>
      col.id === 'todo'
        ? { ...col, tasks: [...col.tasks, { id: crypto.randomUUID(), title }] }
        : col,
    );
    this.columns.set(updated);
    this.newTaskForm.reset();
  }

  deleteTask(columnId: string, taskId: string) {
    const updated = this.columns().map((col) =>
      col.id === columnId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col,
    );
    this.columns.set(updated);
  }
}