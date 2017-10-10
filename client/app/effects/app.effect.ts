import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Rx';
import * as USERACTIONS from '../actions/user.actions';
import * as TASKACTIONS from '../actions/task.actions';
import { UserStore } from '../api/user.api';
import { TaskStore } from '../api/task.api';
import { Task } from 'app/models/task';


@Injectable()
export class ToDoAppEffects {
    
    @Effect() authenticateUser$ = this.action
        .ofType(USERACTIONS.AUTHENTICATE_USER)
        .switchMap(
            (data: any) => {
                return this.auth
                    .authenticateUser(data.payload.username, data.payload.password)
                    .map(() => new USERACTIONS.UserAuthenticateAction())
                    .catch(() => Observable.of(new USERACTIONS.UserNotAuthenticateAction()));
            },
        );
    
    
    @Effect() getTaskList$ = this.action
        .ofType(USERACTIONS.USER_IS_AUTHENTICATED, TASKACTIONS.TASK_LIST_ACTION)
        .switchMap(
            (data: any) => {
                return this.task
                    .getTaskList()
                    .map((taskList: Task[]) => new TASKACTIONS.GetTaskListAction(taskList))
                    .catch(() => Observable.of(new USERACTIONS.UserNotAuthenticateAction()));
            },
        );
    
    @Effect() registerUser$ = this.action
        .ofType(USERACTIONS.REGISTER_USER)
        .switchMap(
            (data: any) => {
                return this.auth
                    .registerUser(
                        data.payload.email,
                        data.payload.password,
                        data.payload.first_name,
                        data.payload.last_name,
                    )
                    .map(() => new USERACTIONS.GotToSignInPageAction())
                    .catch(() => Observable.of(new USERACTIONS.GoToRegistrationPageAction()));
            },
        );
    
    @Effect() createTask$ = this.action
        .ofType(TASKACTIONS.CREATE_TASK_ACTION)
        .switchMap(
            (data: any) => {
                return this.task
                    .createTask(data.payload)
                    .map((task: Task) => new TASKACTIONS.AddTaskAction(task))
                    .catch(() => Observable.of(new TASKACTIONS.ErrorTaskAction()));
            },
        );
    
    @Effect() updateTask$ = this.action
        .ofType(TASKACTIONS.UPDATE_TASK_ACTION)
        .switchMap(
            (data: any) => {
                return this.task.updateTask(data.payload.id, data.payload)
                    .map((task: Task) => new TASKACTIONS.SuccessTaskList())
                    .catch(() => Observable.of(new TASKACTIONS.ErrorTaskAction()));
            },
        );
    
    @Effect() removeTask$ = this.action
        .ofType(TASKACTIONS.REMOVE_TASK_ACTION)
        .switchMap(
            (data: any) => {
                return this.task
                    .removeTask(data.payload.id, data.payload)
                    .map((task: Task) => new TASKACTIONS.SuccessTaskList())
                    .catch(() => Observable.of(new TASKACTIONS.ErrorTaskAction()));
            },
        );
    
    @Effect() clearAllTask$ = this.action
        .ofType(TASKACTIONS.CLEAR_ALL_TASK_ACTION)
        .switchMap(
            (data: any) => {
                return this.task
                    .saveTask()
                    .map((task: Task) => new TASKACTIONS.SuccessTaskList())
                    .catch(() => Observable.of(new TASKACTIONS.ErrorTaskAction()));
            },
        );
    
    
    constructor(private action: Actions,
                private task: TaskStore,
                private auth: UserStore) {
    }
}
