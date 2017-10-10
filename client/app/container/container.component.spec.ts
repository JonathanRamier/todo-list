import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from '../reducers/index';

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
    let element;
    let de;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContainerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                StoreModule.forRoot(reducers),
            ],
        }).compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        de = fixture.debugElement;
        fixture.detectChanges();
    });
    
    it('should be created', async(inject([Store], (store: Store<any>) => {
        expect(component).toBeTruthy();
        expect(element.querySelector('h1').innerText).toBe('TODOS');
    })));
});
