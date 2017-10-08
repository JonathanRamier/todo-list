import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class AppService {

    private get name(): string {
        return 'productman.todo.token';
    }

    private getToken(): string {
        return localStorage.getItem(this.name);
    }

    /**
     * Generate API URL to fetch
     *
     * @param {string} resource
     * @returns {string}
     */
    getUrl(resource: string): string {
        return `http://127.0.0.1:4300/${resource}`;
    }

    /**
     * generate request options
     *
     * @param {boolean} isSecure
     * @param search
     * @return {RequestOptions}
     */
    generateOptions(isSecure: boolean, search?: object): RequestOptions {

        const params: URLSearchParams = new URLSearchParams();
        if (typeof search !== 'undefined') {
            Object.keys(search).map((key) => {
                params.set(key, search[key]);
            });
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        if (isSecure) {
            const token = this.getToken();
            if (token !== null) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        if (search) {
            const options = { headers, search: params };
            return new RequestOptions(options);
        }
        return new RequestOptions({ headers });
    }
}
