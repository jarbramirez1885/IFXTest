import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoints } from 'src/app/core/constants/endpoints';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { StudentModel } from '../models/student-model.model';
import { ApplicationModel } from '../models/application-model.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceStudentsService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

  getAllStudent(): Observable<StudentModel[]> {
    const url = Endpoints.GET_ALL_STUDENTS;
    return this.http
      .get<StudentModel[]>(url)
      .pipe(
        catchError(this.handleError<StudentModel[]>('getAllStudent', []))
      );
  }

  getImageByNameFile(fileName: string): Observable<any[]> {
    const url = Endpoints.GET_IMAGE_BY_NAME_FILE + '/' + fileName;
    return this.http
      .get<any[]>(url)
      .pipe(
        catchError(this.handleError<any[]>('getImageByNameFile', []))
      );
  }

  getAllApplications(): Observable<ApplicationModel[]> {
    const url = environment.BackendURI + Endpoints.APPLICATION_ENDPOINT + Endpoints.GET_APPLICATION;
    return this.http
      .get<ApplicationModel[]>(url)
      .pipe(
        catchError(this.handleError<ApplicationModel[]>('getAllApplications', []))
      );
  }

  getApplicationById(id: number){
    let url = environment.BackendURI + Endpoints.APPLICATION_ENDPOINT + Endpoints.GET_APPLICATION_BY_ID;
    url = url + '/' + id;

    return this.http
      .get<ApplicationModel>(encodeURI(url))
      .pipe(
        catchError(
          this.handleError<ApplicationModel>(
            'getApplicationById',
          )
        )
      );
  }

  addNewApplication(newApp: ApplicationModel): Observable<any>{
    let url = environment.BackendURI + Endpoints.APPLICATION_ENDPOINT + Endpoints.ADD_APPLICATION;

    return this.http
      .post<any>(encodeURI(url), newApp ,this.httpOptions)
      .pipe(
        catchError(
          this.handleError<any>('addNewApplication', newApp)
        )
      );
  }

  updateApplication(editApp: ApplicationModel): Observable<any>{
    let url = environment.BackendURI + Endpoints.APPLICATION_ENDPOINT + Endpoints.UPDATE_APPLICATION;

    return this.http
      .put<any>(encodeURI(url), editApp ,this.httpOptions)
      .pipe(
        catchError(
          this.handleError<any>('updateApplication', editApp)
        )
      );
  }

  deleteApplication(id: number): Observable<{}>{
    let url = environment.BackendURI + Endpoints.APPLICATION_ENDPOINT + Endpoints.DELETE_APPLICATION;
    url = url + '/' + id;

    return this.http
      .delete<any[]>(encodeURI(url), this.httpOptions)
      .pipe(catchError(this.handleError<any[]>('deleteApplication',[]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.error}`);
      this.dialog.open(DialogComponent, {
        data: {
          icon: 'error_outline',
          message: error.error,
          opc: false,
        },
      });
      return throwError(error);
    };
  }

  private log(message: string) {
    console.log(`ServiceStudentsService: ${message}'`);
  }
}
