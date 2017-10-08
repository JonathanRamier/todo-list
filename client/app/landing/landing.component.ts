import { Component, OnDestroy } from '@angular/core';
import { AppState } from '../reducers/user';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnDestroy {

    user$: Subscription;
    isSignInPage: boolean = true;

    constructor(private store: Store<any>) {
        this.user$ = store.select('user')
            .subscribe((state: AppState) => {
                if (state === null) {
                    this.isSignInPage = true;
                } else if (state.hasOwnProperty('isRegistrationUserPage')) {
                    this.isSignInPage = !state.isRegistrationUserPage;
                }
            });
    }

    ngOnDestroy() {
        this.user$.unsubscribe();
    }

}
