import { TestBed, inject, async } from '@angular/core/testing';

import { UserStore } from './user.api';
import {
    ConnectionBackend,
    HttpModule,
    Response,
    ResponseOptions,
    XHRBackend,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppService } from '../app.service';

describe('UserStore', () => {
    const mockData = [
        { id: 1, name: 'Video 0', status: true },
        { id: 2, name: 'Video 1', status: false },
        { id: 3, name: 'Video 2', status: false },
        { id: 4, name: 'Video 3', status: true },
    ];
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                ConnectionBackend,
                AppService,
                { provide: XHRBackend, useClass: MockBackend },
                UserStore,
            ],
        });
    }));
    
    
    it('should authenticate user', inject(
        [UserStore, XHRBackend], (service: UserStore, mockBacked: MockBackend) => {
            
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                expect(connection.request.url).toContain('login');
                expect(connection.request.getBody()).toBe(
                    JSON.stringify({ username: 'login', password: 'password' }, null, '  '),
                );
                connection.mockRespond(
                    new Response(
                        // pass in new isntance of Response Options
                        new ResponseOptions({
                            body: { ...mockData },
                        }),
                    ),
                );
            });
            
            
            service.authenticateUser('login', 'password').subscribe(
                (data: any) => {
                    expect(service).toBeTruthy();
                },
            );
        }),
    );
    
    it('should be register', inject([UserStore], (service: UserStore) => {
        expect(service).toBeTruthy();
    }));
});
