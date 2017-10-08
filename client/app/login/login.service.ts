import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    /**
     * @type {Storage}
     */
    private storage: Storage;


    constructor() {
        this.storage = localStorage;
    }

    /**
     * get the token from the localstorage
     *
     * @returns {string}
     */
    getToken(): string {
        return this.storage.getItem(this.name);
    }

    /**
     * set the token from the localstorage
     */
    setToken(value: string) {
        this.storage.setItem(this.name, value);
    }

    /**
     * set the token from the localstorage
     */
    removeToken() {
        this.storage.removeItem(this.name);
    }

    /**
     * get the name
     *
     * @returns {string}
     */
    get name(): string {
        return 'productman.todo.token';
    }

}
