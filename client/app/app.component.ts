import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    USER_IS_AUTHENTICATED,
    USER_NOT_AUTHENTICATED,
} from './reducers/user';
import { LoginService } from './login/login.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-root',
    template: `
        <app-landing [ngClass]="{'hide': isAuthenticated$ | async}"></app-landing>
        <app-container [ngClass]="{'hide': !(isAuthenticated$ | async) }"></app-container>
    `,
    providers: [
        LoginService,
    ],
})
export class AppComponent {
    
    isAuthenticated$: Observable<boolean>;
    
    constructor(private store: Store<any>, private loginSvc: LoginService) {
        
        this.isAuthenticated$ = this.store.select((state) => state.user.isAuthenticated);
        
        
        if (loginSvc.getToken() == null) {
            this.store.dispatch({ type: USER_NOT_AUTHENTICATED });
        } else {
            this.store.dispatch({ type: USER_IS_AUTHENTICATED });
        }
    }
}
