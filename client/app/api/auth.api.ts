import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { Token } from '../models/token';


@Injectable()
export class AuthStore {

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
    authenticateUser(username: string, password: string): Observable<Token> {
        return this.http.post(
            this.urlSettings.getUrl('oauth/token'), { username, password },
            this.urlSettings.generateOptions(false),
            )
            .map((res: Response, status: number) => res.json() as Token)
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
