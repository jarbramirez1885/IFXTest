import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoints } from 'src/app/core/constants/endpoints';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { CharacterModel } from '../models/character-model.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCharactersService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getAllCharacters(house: string): Observable<CharacterModel[]> {
    const url = Endpoints.GET_ALL_CHARACTERS_BY_HOUSE + '/' + house;
    return this.http
      .get<CharacterModel[]>(url)
      .pipe(
        catchError(this.handleError<CharacterModel[]>('getAllCharacters', []))
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

  getAllHouses(): Observable<any[]> {
    const url = environment.BackendURI + Endpoints.HOUSES_ENDPOINT + Endpoints.GET_ALL_HOUSES;
    console.log(url);
    return this.http
      .get<any[]>(url)
      .pipe(
        catchError(this.handleError<any[]>('getAllHouses', []))
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
    console.log(`ServiceCharactersService: ${message}'`);
  }
}
