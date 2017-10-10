import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-root',
    template: `
        <app-landing [ngClass]="{'hide': isAuthenticated$ | async}"></app-landing>
        <app-container [ngClass]="{'hide': !(isAuthenticated$ | async) }"></app-container>
    `,
})
export class AppComponent {
    
    isAuthenticated$: Observable<boolean>;
    
    constructor(private store: Store<any>) {
        this.isAuthenticated$ = this.store.select((state) => state.user.isAuthenticated);
    }
}
