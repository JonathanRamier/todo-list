import { ActionReducerMap } from '@ngrx/store';
import { UserState } from '../states/user';
import * as fromUser from './user';
import * as fromTask from './task';
import { TaskState } from '../states/task';

export interface State {
    user: UserState;
    task: TaskState;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.user,
    task: fromTask.task,
};
