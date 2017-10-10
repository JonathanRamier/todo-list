import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClearAllTasks, CreateTaskAction } from '../actions/task.actions';
import { Task } from 'app/models/task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    
    @Input()
    tasks: Task[];
    temp: Task[];
    status = '';
    hasTask = false;
    taskNumber: number = 0;
    newTodo: string;
    
    constructor(private store: Store<any>) {
        this.store.select((state) => state.task.tasks)
            .subscribe(
                (tasks) => {
                    this.temp = tasks;
                    console.log(this.temp);
                    if (tasks != null) {
                        this.hasTask = true;
                        const completed = tasks.filter((task) => !task.status);
                        this.taskNumber = completed.length;
                    }
                },
            );
    }
    
    ngOnInit() {
        this.temp = this.tasks;
    }
    
    addTodo(todo: string) {
        if (todo !== '') {
            this.store.dispatch(new CreateTaskAction(todo));
            this.newTodo = '';
        }
    }
    
    clearCompletedTasks() {
        this.hasTask = false;
        this.store.dispatch(new ClearAllTasks());
    }
    
    activeTask() {
        this.status = 'completed';
        this.tasks = this.temp.filter((task) => task.status);
    }
    
    inActiveTask() {
        this.status = 'active';
        this.tasks = this.temp.filter((task) => !task.status);
    }
    
    allTask() {
        this.status = '';
        this.tasks = this.temp;
    }
    
}
