import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Store } from '@ngrx/store';
import { RemoveTaskAction, UpdateTaskList } from '../actions/task.actions';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    
    @Input() tasks: Task[];
    
    editedTask: Task;
    
    constructor(private store: Store<any>) {
    }
    
    ngOnInit() {
    }
    
    toggleStatus(task: Task) {
        this.store.dispatch(new UpdateTaskList(task));
    }
    
    editTask(task: Task) {
        this.editedTask = task;
    }
    
    removeTask(task: Task) {
        this.store.dispatch(new RemoveTaskAction(task));
    }
    
    saveEdits(task: Task, action: string) {
        this.editedTask = null;
        this.store.dispatch(new UpdateTaskList(task));
    }
    
    revertEdits(task: Task) {
    
    }
}
