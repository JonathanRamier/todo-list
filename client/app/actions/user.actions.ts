import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const AUTHENTICATE_USER = 'AUTHENTICATE USER';
export const REGISTER_USER = 'REGISTER USER';
export const USER_SIGN_OUT = 'SIGN OUT USER';

export const REGISTER_USER_PAGE = 'PAGE REGISTRATION';
export const SIGN_IN_USER_PAGE = 'PAGE SIGN IN';

export const USER_NOT_AUTHENTICATED = 'USER ANONYMOUS';
export const USER_IS_AUTHENTICATED = 'USER AUTHENTICATED';


export class AuthenticateUserAction implements Action {
    readonly type = AUTHENTICATE_USER;
    
    constructor(public payload: User) {
    }
}


export class RegisterUserAction implements Action {
    readonly type = REGISTER_USER;
    
    constructor(public payload: User) {
    }
}

export class GoToRegistrationPageAction implements Action {
    readonly type = REGISTER_USER_PAGE;
}


export class GotToSignInPageAction implements Action {
    readonly type = SIGN_IN_USER_PAGE;
}

export class UserNotAuthenticateAction implements Action {
    readonly type = USER_NOT_AUTHENTICATED;
}


export class UserAuthenticateAction implements Action {
    readonly type = USER_IS_AUTHENTICATED;
}

export class UserSignOutAction implements Action {
    readonly type = USER_SIGN_OUT;
}


export type Actions =
    AuthenticateUserAction |
    RegisterUserAction |
    GoToRegistrationPageAction |
    GotToSignInPageAction |
    UserNotAuthenticateAction |
    UserSignOutAction |
    UserAuthenticateAction;
