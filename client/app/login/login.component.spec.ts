import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [LoginComponent],
            })
            .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
