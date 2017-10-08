import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AUTHENTICATE_USER, REGISTER_USER_PAGE } from '../reducers/user';

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
        this.store.dispatch({ type: REGISTER_USER_PAGE });
    }

    logInMe() {
        if (this.loginForm.valid) {
            const login = this.loginForm.value;
            this.store.dispatch({ type: AUTHENTICATE_USER, payload: login });
        }
    }

}
