import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { Token } from '../models/token';
import { Task } from 'app/models/task';


@Injectable()
export class TaskStore {

    /**
     * Creates an instance of UserStore.
     *
     * @param {Http} http
     * @param urlSettings
     */
    constructor(private http: Http,
                private urlSettings: AppService) {
    }

    /**
     * fetch the Json web token
     *
     * @return {Observable<UserToken>}
     */
    getTaskList(email: string, password: string): Observable<Token> {
        return this.http.post(
            this.urlSettings.getUrl('tasks'), { email, password },
            this.urlSettings.generateOptions(false),
        )
        .map((res: Response, status: number) => res.json() as Token)
        .catch((fail) => Observable.throw(fail));
    }
    
    updateTaskList(tasks: Task[]): Observable<Task[]> {
        return this.http.post(
            this.urlSettings.getUrl('tasks'), tasks,
            this.urlSettings.generateOptions(false),
        )
        .map((res: Response, status: number) => res.json() as Task)
        .catch((fail) => Observable.throw(fail));
    }
}
