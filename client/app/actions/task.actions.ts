import { Action } from '@ngrx/store';

import { Task } from 'app/models/task';

export const TASK_LIST_ACTION = 'GET TASKS LIST';
export const ADD_TASK_ACTION = 'ADD TASK';
export const DONE_TASK_ACTION = 'TASK DONE';
export const REMOVE_TASK_ACTION = 'REMOVE TASK';
export const DONE_ALL_TASK_ACTION = 'ALL TASKS DONE';
export const CLEAR_ALL_TASK_ACTION = 'CLEAR ALL TASKS';


export class TaskListAction implements Action {
    readonly type = TASK_LIST_ACTION;
}

export class AddTaskAction implements Action {
    readonly type = ADD_TASK_ACTION;
    
    constructor(public payload: Task) {
    }
}

export class DoneTaskAction implements Action {
    readonly type = DONE_TASK_ACTION;
    
    constructor(public payload: Task) {
    }
}

export class RemoveTaskAction implements Action {
    readonly type = REMOVE_TASK_ACTION;
    
    constructor(public payload: Task) {
    }
}

export class DoneAllTasks implements Action {
    readonly type = DONE_ALL_TASK_ACTION;
}

export class ClearAllTasks implements Action {
    readonly type = CLEAR_ALL_TASK_ACTION;
}


export type Actions =
    TaskListAction |
    AddTaskAction |
    DoneTaskAction |
    DoneAllTasks |
    ClearAllTasks |
    RemoveTaskAction;
