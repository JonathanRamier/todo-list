import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    
    isSignInPage$: Observable<boolean>;
    
    constructor(private store: Store<any>) {
        this.isSignInPage$ = this.store.select((state) => state.user.isRegistrationUserPage);
    }
    
    ngOnInit() {
    
    }
    
}
