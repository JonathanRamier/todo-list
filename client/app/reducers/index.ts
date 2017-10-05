import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user';

export interface State {
    user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
};
