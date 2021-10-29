import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoints } from 'src/app/core/constants/endpoints';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { TeacherModel } from '../models/teacher-model.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTeachersService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getAllTeachers(): Observable<TeacherModel[]> {
    const url = Endpoints.GET_ALL_TEACHES;
    return this.http
      .get<TeacherModel[]>(url)
      .pipe(
        catchError(this.handleError<TeacherModel[]>('getAllTeachers', []))
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
    console.log(`ServiceTeachersService: ${message}'`);
  }
}
