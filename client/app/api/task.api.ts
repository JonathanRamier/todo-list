import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
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
    getTaskList(): Observable<Task[]> {
        return this.http.get(
            this.urlSettings.getUrl('tasks'),
            this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json() as Task[])
            .catch((fail) => Observable.throw(fail));
    }
    
    createTask(name: string): Observable<Task> {
        return this.http.post(
            this.urlSettings.getUrl('tasks'), { name },
            this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json() as Task)
            .catch((fail) => Observable.throw(fail));
    }
    
    updateTask(id: number, tasks: Task): Observable<Task> {
        return this.http
            .put(
                this.urlSettings.getUrl(`tasks/${id}`), tasks,
                this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json() as Task)
            .catch((fail) => Observable.throw(fail));
    }
    
    removeTask(id: number, tasks: Task): Observable<any> {
        return this.http
            .delete(
                this.urlSettings.getUrl(`tasks/${id}`),
                this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.text())
            .catch((fail) => Observable.throw(fail));
    }
    
    saveTask(): Observable<any> {
        return this.http
            .post(
                this.urlSettings.getUrl(`tasks/save`),
                [],
                this.urlSettings.generateOptions(true),
            )
            .map((res: Response, status: number) => res.text())
            .catch((fail) => Observable.throw(fail));
    }
}
