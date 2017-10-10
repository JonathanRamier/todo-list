import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { reducers } from '../reducers/index';
import { StoreModule } from '@ngrx/store';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TaskListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FormsModule,
                StoreModule.forRoot(reducers),
            
            ],
        }).compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
