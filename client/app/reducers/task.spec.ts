import { async, TestBed, inject } from '@angular/core/testing';
import { reducers } from './index';
import { StoreModule } from '@ngrx/store';
import { TaskState } from '../states/task';
import { Store } from '@ngrx/store';

describe('Reducer', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule(
            {
                declarations: [],
                imports: [
                    StoreModule.forRoot(reducers),
                ],
            })
            .compileComponents();
    }));
    
    const mockData = [
        { id: 1, name: 'task 0', status: true },
        { id: 2, name: 'task 1', status: false },
    ];
    
    it('should have no task', inject(
        [Store], (store: Store<TaskState>) => {
            expect(store).toBeTruthy();
            
            
        }),
    );
});
