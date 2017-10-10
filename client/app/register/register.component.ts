import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as USER_ACTION from '../actions/user.actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    registrationForm = new FormGroup({
        first_name: new FormControl(),
        last_name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(private store: Store<any>) { }

    ngOnInit() {
    }

    goToLogin() {
        this.store.dispatch(new USER_ACTION.GotToSignInPageAction());
    }

    createUser() {
        if (this.registrationForm.valid) {
            const registration = this.registrationForm.value;
            this.store.dispatch(new USER_ACTION.RegisterUserAction(registration));
        }
    }

}
