import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import * as hmr from '../hmr';
import { reducers } from './reducers';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { ContainerComponent } from './container/container.component';
import { AppService } from './app.service';
import { ToDoAppEffects } from './effects/app.effect';
import { UserStore } from './api/user.api';
import { TaskStore } from './api/task.api';


@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskComponent,
        LoginComponent,
        LandingComponent,
        RegisterComponent,
        ContainerComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        StoreModule.forRoot(reducers, {
            initialState: hmr.persistedState || (window as any).STATE,
            metaReducers: [],
        }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([
            ToDoAppEffects,
        ]),
    ],
    providers: [
        AppService,
        TaskStore,
        UserStore,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
