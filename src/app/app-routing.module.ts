import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCharactersComponent } from './modules/characters/components/list-characters/list-characters.component';
import { ListStudentsComponent } from './modules/students/components/list-students/list-students.component';
import { CreateApplicationComponent } from './modules/students/components/create-application/create-application.component';
import { UpdateApplicationComponent } from './modules/students/components/update-application/update-application.component';
import { ListTeachersComponent } from './modules/teachers/components/list-teachers/list-teachers.component';
import { ListApplicationsComponent } from './modules/students/components/list-applications/list-applications.component';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'characters/list-characters',
        component: ListCharactersComponent,
      },
      {
        path: 'teachers/list-teachers',
        component: ListTeachersComponent,
      },
      {
        path: 'students/list-students',
        component: ListStudentsComponent,
      },
      {
        path: 'students/list-applications',
        component: ListApplicationsComponent,
      },
      {
        path: 'students/create-application',
        component: CreateApplicationComponent,
      },
      {
        path: 'students/update-application/:id',
        component: UpdateApplicationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
