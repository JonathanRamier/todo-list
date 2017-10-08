import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { REGISTER_USER, SIGN_IN_USER_PAGE } from '../reducers/user';
import { Store } from '@ngrx/store';

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
        this.store.dispatch({ type: SIGN_IN_USER_PAGE });
    }

    createUser() {
        if (this.registrationForm.valid) {
            const registration = this.registrationForm.value;
            this.store.dispatch({ type: REGISTER_USER, payload: registration });
        }
    }

}
