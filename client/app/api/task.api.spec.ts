import { TestBed, inject, async } from '@angular/core/testing';
import { TaskStore } from './task.api';
import {
    ConnectionBackend,
    XHRBackend,
    Response,
    ResponseOptions,
    HttpModule,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Task } from 'app/models/task';
import { AppService } from '../app.service';


describe('TaskStore', () => {
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
                TaskStore,
            ],
        });
    }));
    
    
    it('should list tasks', inject(
        [TaskStore, XHRBackend], (service: TaskStore, mockBacked: MockBackend) => {
            
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                connection.mockRespond(
                    new Response(
                        // pass in new isntance of Response Options
                        new ResponseOptions({
                            body: { ...mockData },
                        }),
                    ),
                );
            });
            
            
            service.getTaskList().subscribe(
                (data: Task[]) => {
                    expect(Object.keys(data).length).toBe(4);
                    expect(data[0].name).toBe('Video 0');
                    expect(data[1].status).toBeFalsy();
                    expect(data[3].name).toBe('Video 3');
                },
            );
        }),
    );
    
    it('should have task created', inject(
        [TaskStore, XHRBackend], (service: TaskStore, mockBacked: MockBackend) => {
            
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                expect(connection.request.url).toContain('tasks');
                expect(connection.request.method).toBe(1);
                expect(connection.request.getBody()).toBe(
                    JSON.stringify({ name: 'creation 1' }, null, '  '),
                );
                connection.mockRespond(
                    new Response(
                        // pass in new isntance of Response Options
                        new ResponseOptions({
                            body: { id: 5, name: 'creation 1', status: false },
                        }),
                    ),
                );
            });
            
            
            service.createTask('creation 1')
                .subscribe(
                    (data: Task) => {
                        expect(data.id).toBe(5);
                        expect(data.name).toBe('creation 1');
                        expect(data.status).toBeFalsy();
                    },
                );
        }),
    );
    
    it('should have task updated', inject(
        [TaskStore, XHRBackend], (service: TaskStore, mockBacked: MockBackend) => {
            
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                expect(connection.request.url).toContain('tasks/1');
                expect(connection.request.method).toBe(2);
                expect(connection.request.getBody()).toBe(
                    JSON.stringify({ id: 1, name: 'Hello 0', status: false }, null, '  '),
                );
                connection.mockRespond(
                    new Response(
                        // pass in new isntance of Response Options
                        new ResponseOptions({
                            body: { id: 1, name: 'Hello 0', status: false },
                        }),
                    ),
                );
            });
            
            
            service.updateTask(1, { id: 1, name: 'Hello 0', status: false }).subscribe(
                (data: Task) => {
                    expect(data.name).toBe('Hello 0');
                    expect(data.status).toBeFalsy();
                },
            );
        }),
    );
    
    it('should have task removed', inject(
        [TaskStore, XHRBackend], (service: TaskStore, mockBacked: MockBackend) => {
            
            // subscribe to connections to mock backend
            mockBacked.connections.subscribe((connection: MockConnection) => {
                // call mock respond of the connection
                // send in a Response Object
                expect(connection.request.url).toContain('tasks/1');
                expect(connection.request.method).toBe(3);
                expect(connection.request.getBody()).toBe('');
                connection.mockRespond(
                    new Response(
                        // pass in new isntance of Response Options
                        new ResponseOptions({
                            body: '',
                        }),
                    ),
                );
            });
            
            
            service.removeTask(1, { id: 1, name: 'Video 0', status: false }).subscribe(
                () => {
                    expect(true).toBeTruthy();
                },
            );
        }),
    );
});
