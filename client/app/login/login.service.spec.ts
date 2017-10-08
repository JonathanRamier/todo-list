import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {

    const name = 'productman.todo.token';
    this.store = { name: 'kgjhgcdrtdtrrsesdklihuigtydreserfkuy' };


    beforeEach(() => {
        this.store = { name: 'kgjhgcdrtdtrrsesdklihuigtydreserfkuy' };
        spyOn(localStorage, 'getItem').and.callFake((key) => {
            return this.store[key];
        });

        spyOn(localStorage, 'removeItem').and.callFake((key) => {
            return this.store[key] = '';
        });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));

    it('should get name', inject([LoginService], (service: LoginService) => {
        expect(service.name).toBe(name);
    }));

    it('should set and get new token', inject([LoginService], (service: LoginService) => {
        service.setToken('testing_1234567890');
        setTimeout(
            () => {
                expect(service.getToken()).toBe('testing_1234567890');
            },
            200,
        );
    }));

    it('should remove token', inject([LoginService], (service: LoginService) => {
        service.removeToken();
        expect(service.getToken()).toBe('');
    }));
});
