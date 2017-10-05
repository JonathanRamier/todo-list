import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import * as hmr from '../hmr';
import { reducers } from './reducers';
import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        StoreModule.forRoot(reducers, {
            initialState: hmr.persistedState || (window as any).STATE,
            metaReducers: [],
        }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
