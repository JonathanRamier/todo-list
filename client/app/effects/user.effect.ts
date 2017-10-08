import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Rx';
import * as ACTIONS from '../reducers/user';
import { AuthStore } from '../api/auth.api';
import { Token } from '../models/token';
import { USER_IS_AUTHENTICATED, USER_NOT_AUTHENTICATED } from '../reducers/user';


@Injectable()
export class ToDoAppEffects {
    
    @Effect() authenticateUser$ = this.action
        .ofType(ACTIONS.AUTHENTICATE_USER)
        .switchMap(
            (data: any) => {
                return this.auth
                    .authenticateUser(data.payload.username, data.payload.password)
                    .map((res: Token) => {
                        localStorage.setItem('productman.todo.token', res.token);
                        return { type: USER_IS_AUTHENTICATED };
                    })
                    .catch(() => {
                        return Observable.of({ type: USER_NOT_AUTHENTICATED });
                    });
            },
        );
    
    @Effect() registerUser$ = this.action
        .ofType(ACTIONS.REGISTER_USER)
        .switchMap(
            (data: any) => {
                return this.auth
                    .registerUser(
                        data.payload.email,
                        data.payload.password,
                        data.payload.first_name,
                        data.payload.last_name,
                    )
                    .map(() => {
                        return{ type: ACTIONS.REGISTER_USER_SUCCESS };
                    })
                    .catch(() => {
                        return Observable.of({ type: ACTIONS.REGISTER_USER_FAILED },);
                    });
            },
        );
    
    
    constructor(private action: Actions,
                private auth: AuthStore) {
    }
}
