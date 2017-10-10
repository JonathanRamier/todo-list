export interface UserState {
    username: string;
    isAuthenticated: boolean;
    isRegistrationUserPage: boolean;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
}

export const initialUserState: UserState = {
    username: '',
    isAuthenticated: false,
    isRegistrationUserPage: false,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
};
