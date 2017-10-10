import * as USER_ACTION from '../actions/user.actions';
import { initialUserState, UserState } from '../states/user';
import { Actions } from '../actions/user.actions';

export const user = (state = initialUserState, action: Actions): UserState => {
    switch (action.type) {
        case USER_ACTION.USER_IS_AUTHENTICATED:
            return { ...state, ...{ isAuthenticated: true } };
        
        case USER_ACTION.REGISTER_USER_PAGE:
            return { ...state, ...{ isRegistrationUserPage: true } };
        
        case USER_ACTION.USER_NOT_AUTHENTICATED:
        case USER_ACTION.USER_SIGN_OUT:
            return { ...state, ...{ isAuthenticated: false, username: '' } };
        
        case USER_ACTION.REGISTER_USER:
        case USER_ACTION.AUTHENTICATE_USER:
            return { ...state, ...action.payload };
        
        case USER_ACTION.SIGN_IN_USER_PAGE:
            return { ...state, ...{ isRegistrationUserPage: false } };
        
        default:
            return state;
    }
};
