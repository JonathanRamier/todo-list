import * as Actions from './user.actions';
import { User } from '../models/user';

describe('User Actions', () => {
    
    it('should register user Action', () => {
        const user = new User();
        user.email = 'toto@gmail.com';
        user.firstname = 'bibi';
        user.lastname = 'bobby';
        user.password = 'azerty';
        const action = new Actions.RegisterUserAction(user);
        expect(action.type).toBe('REGISTER USER');
        expect(action.payload).toBe(user);
    });
    
    it('should authenticate user Action', () => {
        const user = new User();
        user.username = 'hello';
        user.password = 'azerty';
        
        const action = new Actions.AuthenticateUserAction(user);
        
        expect(action.type).toBe('AUTHENTICATE USER');
        expect(action.payload).toBe(user);
    });
    
    it('should go to registration page Action', () => {
        const action = new Actions.GoToRegistrationPageAction();
        expect(action.type).toBe('PAGE REGISTRATION');
    });
    
    it('should go to login page Action', () => {
        const action = new Actions.GotToSignInPageAction();
        expect(action.type).toBe('PAGE SIGN IN');
    });

    it('should be authenticate user Action', () => {
        const action = new Actions.UserAuthenticateAction();
        expect(action.type).toBe('USER AUTHENTICATED');
    });
    
    it('should be anonymous user Action', () => {
        const action = new Actions.UserNotAuthenticateAction();
        expect(action.type).toBe('USER ANONYMOUS');
    });
});
