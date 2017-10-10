import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { Token } from '../models/token';


@Injectable()
export class UserStore {

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
    authenticateUser(username: string, password: string): Observable<any> {
        return this.http.post(
            this.urlSettings.getUrl('login'), { username, password },
            this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json())
            .catch((fail) => Observable.throw(fail));
    }
    
    /**
     * fetch the Json web token
     *
     * @return {Observable<void>}
     */
    registerUser(email: string,
                 password: string,
                 firstName: string,
                 lastName: string): Observable<void> {
        
        return this.http.post(
            this.urlSettings.getUrl('users'), {
                email, password, first_name: firstName, last_name: lastName,
            },
            this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json())
            .catch((fail) => Observable.throw(fail));
    }
}
