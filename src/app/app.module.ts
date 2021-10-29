import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCharactersComponent } from './modules/characters/components/list-characters/list-characters.component';
import { ListStudentsComponent } from './modules/students/components/list-students/list-students.component';
import { CreateApplicationComponent } from './modules/students/components/create-application/create-application.component';
import { UpdateApplicationComponent } from './modules/students/components/update-application/update-application.component';
import { ListTeachersComponent } from './modules/teachers/components/list-teachers/list-teachers.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { AppLoaderComponent } from './modules/shared/components/app-loader/app-loader.component';
import { HeaderComponent } from './modules/shared/components/home/header/header.component';
import { FooterComponent } from './modules/shared/components/home/footer/footer.component';
import { DialogComponent } from './modules/shared/components/dialog/dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './modules/shared/services/loader.interceptor';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ListApplicationsComponent } from './modules/students/components/list-applications/list-applications.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCharactersComponent,
    ListStudentsComponent,
    CreateApplicationComponent,
    UpdateApplicationComponent,
    ListTeachersComponent,
    HomeComponent,
    AppLoaderComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    ListApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    MatBadgeModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatChipsModule,
    MatRippleModule,
    MatDividerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTreeModule,
    OverlayModule,
    CdkTreeModule,
    PortalModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  exports:[
    AppLoaderComponent,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    MatBadgeModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatChipsModule,
    MatRippleModule,
    MatDividerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTreeModule,
    OverlayModule,
    CdkTreeModule,
    PortalModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
