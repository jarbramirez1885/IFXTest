import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ServiceStudentsService } from '../../services/service-students.service';
import { fromEvent } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ApplicationModel } from '../../models/application-model.model';
import { StudentsMessages } from 'src/app/core/messages/students-messages';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})
export class ListApplicationsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  dataSource = new MatTableDataSource<ApplicationModel>();

  name = new FormControl('');
  lastName = new FormControl('');
  identification = new FormControl('');
  age = new FormControl('');
  house = new FormControl('');

  filterValues = {
    name: '',
    lastName: '',
    identification: '',
    age: '',
    house: '',
  };

  listApplications!: ApplicationModel[];

  applicationColumns: string[] = 
  [   
      'name'
    , 'lastName'
    , 'identification'
    , 'age'
    , 'house'
    , 'id'
  ];

  constructor(private serviceStudentsService: ServiceStudentsService, 
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllApplications();
    this.filters();
  }

  getAllApplications(): void{
    this.serviceStudentsService.getAllApplications().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    });
  }

  filters(){
    this.name.valueChanges.subscribe((nameValue) => {
      this.filterValues.name = nameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.lastName.valueChanges.subscribe((lastNameValue) => {
      this.filterValues.lastName = lastNameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.identification.valueChanges.subscribe((identificationValue) => {
      this.filterValues.identification = identificationValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.age.valueChanges.subscribe((ageValue) => {
      this.filterValues.age = ageValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.house.valueChanges.subscribe((houseValue) => {
      this.filterValues.house = houseValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  editApplication(id: number){
    this.router.navigate(['./home/students/update-application/' + `${ id }`]);
  }

  deleteApplication(id: number){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        icon: 'error',
        message: StudentsMessages.DELETE_CONFIRM_APP,
        opc: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.serviceStudentsService.deleteApplication(id).subscribe(data => {
          this.dialog.open(DialogComponent, {
            data: {
              icon: 'check_circle_outline',
              message: StudentsMessages.SUCCESS_APP_DELETED,
              opc: false,
            },
          });
          this.getAllApplications();
        },
        (error) => {
          console.log('e:', error);
        });
      }
    });
  }

  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        String(data.name).trim().toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
        String(data.lastName).trim().toLowerCase().indexOf(searchTerms.lastName.toLowerCase()) !== -1 &&
        String(data.identification).trim().toLowerCase().indexOf(searchTerms.identification.toLowerCase()) !== -1 &&
        String(data.age).trim().toLowerCase().indexOf(searchTerms.age.toLowerCase()) !== -1 &&
        String(data.house).trim().toLowerCase().indexOf(searchTerms.house.toLowerCase()) !== -1
      );
    };
    return filterFunction;
  }

}
