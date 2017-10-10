import { Component, OnInit } from '@angular/core';
import { UserSignOutAction } from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { TaskListAction } from '../actions/task.actions';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
    
    tasks$: Observable<Task[]>;
    
    constructor(private store: Store<any>) {
        const hasTask$ = this.store.select((state) => state.task.tasks == null);
        hasTask$.subscribe((taskEmpty) => {
            if (taskEmpty) {
                this.store.dispatch(new TaskListAction());
            }
        });
        
        this.tasks$ = this.store.select((state) => state.task.tasks);
        
        
    }
    
    ngOnInit() {
    }
    
    signOut() {
        this.store.dispatch(new UserSignOutAction());
    }
    
}
