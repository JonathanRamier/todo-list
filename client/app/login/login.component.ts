import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as USER_ACTION from '../actions/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
    });

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
    }

    goToRegistration() {
        this.store.dispatch(new USER_ACTION.GoToRegistrationPageAction());
    }

    logInMe() {
        if (this.loginForm.valid) {
            const login = this.loginForm.value;
            this.store.dispatch(new USER_ACTION.AuthenticateUserAction(login));
        }
    }

}
