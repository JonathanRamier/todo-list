import { Action } from '@ngrx/store';

export interface AppState {
    username: string;
    isAuthenticated: boolean;
    isRegistrationUserPage: boolean;
    email: string;
    password: string;
}

export const AUTHENTICATE_USER = 'authenticate user';
export const AUTHENTICATE_USER_SUCCESS = 'authenticate user success';
export const REGISTER_USER_PAGE = 'register an account page';
export const SIGN_IN_USER_PAGE = 'authenticate user page';
export const REGISTER_USER = 'register an account';
export const REGISTER_USER_SUCCESS = 'success after user creation';
export const REGISTER_USER_FAILED = 'failed after user creation';
export const USER_NOT_AUTHENTICATED = 'user is not authenticated';
export const USER_IS_AUTHENTICATED = 'user is authenticated';


export const user = (state = null, action: any): AppState => {
    switch (action.type) {
        case USER_IS_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: true,
            });
        
        case REGISTER_USER_PAGE:
            return Object.assign({}, state, {
                isRegistrationUserPage: true,
            });
        
        case SIGN_IN_USER_PAGE:
            return Object.assign({}, state, {
                isRegistrationUserPage: false,
            });
        
        case USER_NOT_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: false,
            });
        
        case AUTHENTICATE_USER:
            return { ...state, ...action.payload };
        
        case AUTHENTICATE_USER_SUCCESS:
            return Object.assign({}, state, {
                username: action.payload.email,
                password: action.payload.password,
            });
        
        case REGISTER_USER:
            return Object.assign({}, state, {
                username: action.payload.email,
                password: action.payload.password,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            });
        
        case REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                isRegistrationUserPage: false,
            });
        
        default:
            return state;
    }
};
