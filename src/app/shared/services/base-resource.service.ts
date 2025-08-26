import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceModel } from "../models/base-resource.model";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(

        protected apiPath: string, 
        protected injector: Injector, 
        protected jsonDataToResourceFn: (dataJson: any) => T
    ) { 

        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        
        return this.http.get<any[]>(this.apiPath, {withCredentials: true}).pipe(

            map(this.jsonDataToResources.bind(this)), 
            catchError(this.handleError)
        );
    }
 
    getAllPaginated(page?: number, pageSize?: number, sortBy?: string, sortDir?: string): Observable<any> {

        const url = this.apiPath + '/paginated?page=' + page?.toString() + '&size=' + pageSize?.toString();

        return this.http.get<any>(url, {withCredentials: true}).pipe(

            map(response => {
                
                response.content = response.content.map(this.jsonDataPaginatedToResources.bind(this))

                return response;
            }), 
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<T> {
    
        const url = `${this.apiPath}/${id}`;
    
        return this.http.get(url, {withCredentials: true}).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }
 
    create(resource: T): Observable<T> {
    
        return this.http.post(this.apiPath, resource, {withCredentials: true}).pipe(
            map(this.jsonDataToResource.bind(this)), 
            catchError(this.handleError)
        );
    }
 
    update(resource: T): Observable<T> {
    
        const url = `${this.apiPath}/${resource.id}`;
    
        return this.http.put(url, resource, {withCredentials: true}).pipe(

            map(() => resource), 
            catchError(this.handleError)
        );
    }
 
    delete(id: number): Observable<any> {
    
        const url = `${this.apiPath}/${id}`;
    
        return this.http.delete(url, {withCredentials: true}).pipe(
    
            map(() => null), 
            catchError(this.handleError), 
        );
    }   

    protected jsonDataToResources(jsonData: any[]): T[] {

        const resources: T[] = [];

        jsonData.forEach(element => {
            
            resources.push(this.jsonDataToResourceFn(element));
        });

        return resources;
    }

    protected jsonDataPaginatedToResources(jsonData: any): any {

        jsonData = this.jsonDataToResourceFn(jsonData);

        return jsonData;
    }

    protected jsonDataToResource(jsonData: any): T {

        return this.jsonDataToResourceFn(jsonData);
    }
    
    protected handleError(error: any): Observable<any> {

        console.log('Erro na requisição: ', error);

        return throwError(() => error);
    }
}