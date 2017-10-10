import { Action } from '@ngrx/store';

import { Task } from 'app/models/task';

export const TASK_LIST_ACTION = 'GET TASKS LIST';
export const ADD_TASK_ACTION = 'ADD TASK';
export const CREATE_TASK_ACTION = 'CREATE TASK';
export const UPDATE_TASK_ACTION = 'TASK DONE';
export const COMPLETE_TASK_ACTION = 'TASK COMPLETE';
export const GET_TASK_LIST_ACTION = 'TASK LIST DONE';
export const SUCCEED_TASK_ACTION = 'ERROR TASK';
export const ERROR_TASK_ACTION = 'ERROR TASK';
export const REMOVE_TASK_ACTION = 'REMOVE TASK';
export const DONE_ALL_TASK_ACTION = 'ALL TASKS DONE';
export const CLEAR_ALL_TASK_ACTION = 'CLEAR ALL TASKS';


export class TaskListAction implements Action {
    readonly type = TASK_LIST_ACTION;
}

export class CreateTaskAction implements Action {
    readonly type = CREATE_TASK_ACTION;
    
    constructor(public payload: string) {
    }
}

export class ErrorTaskAction implements Action {
    readonly type = ERROR_TASK_ACTION;
}

export class AddTaskAction implements Action {
    readonly type = ADD_TASK_ACTION;
    
    constructor(public payload: Task) {
    }
}

export class GetTaskListAction implements Action {
    readonly type = GET_TASK_LIST_ACTION;
    
    constructor(public payload: Task[]) {
    }
}

export class UpdateTaskList implements Action {
    readonly type = UPDATE_TASK_ACTION;
    
    constructor(public payload: Task) {
    }
}

export class SuccessTaskList implements Action {
    readonly type = SUCCEED_TASK_ACTION;
    
}

export class CompletedTaskAction implements Action {
    readonly type = COMPLETE_TASK_ACTION;
    
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
    UpdateTaskList |
    SuccessTaskList |
    CreateTaskAction |
    DoneAllTasks |
    CompletedTaskAction |
    GetTaskListAction |
    ErrorTaskAction |
    ClearAllTasks |
    RemoveTaskAction;
