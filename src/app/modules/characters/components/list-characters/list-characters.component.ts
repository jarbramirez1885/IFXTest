import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCharactersService } from '../../services/service-characters.service';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { CharacterModel } from '../../models/character-model.model';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  dataSource = new MatTableDataSource<any>();

  listHouse!: any[];
  imageFile!: any[];
  showAge!: any;

  txtSearchHouse = new FormControl('');
  name = new FormControl('');
  patronus = new FormControl('');
  dateOfBirth = new FormControl('');

  isNaN: Function = Number.isNaN;

  noAge: string = 'No disponible';

  filterValues = {
    name: '',
    patronus: '',
    dateOfBirth: '',
  };

  listCharacters!: CharacterModel[];

  charactersColumns: string[] = 
  [   
      'name'
    , 'patronus'
    , 'dateOfBirth'
    , 'image'
  ];

  constructor(private serviceCharactersService: ServiceCharactersService, 
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllHouses();
    this.filters();
  }

  filters(){
    this.name.valueChanges.subscribe((nameValue) => {
      this.filterValues.name = nameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.patronus.valueChanges.subscribe((patronusValue) => {
      this.filterValues.patronus = patronusValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.dateOfBirth.valueChanges.subscribe((dateOfBirthValue) => {
      this.filterValues.dateOfBirth = dateOfBirthValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  getAllCharacters(house: string): void{
    this.serviceCharactersService.getAllCharacters(house).subscribe(data => {
      data.forEach(item => { 

        if(item.dateOfBirth !== "")
        {
          item.dateOfBirth = this.ageCalculator(item.dateOfBirth);
        }  
        else{
          item.dateOfBirth = "0";
        }      
      });

      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    });
  }

  getImageByNameFile(fileName: string){
    this.serviceCharactersService.getImageByNameFile(fileName.substr(35)).subscribe((data) => {
      this.imageFile = data;
    });
  }

  getAllHouses(){
    this.serviceCharactersService.getAllHouses().subscribe((data) => {
      this.listHouse = data;
    });
  }

  ageCalculator(date: any){
    if(date !== "" || !isNaN(date))
    {
      let newDate = new Date(date);
      const timeDiff = Math.abs(Date.now() - newDate.getTime()) ;
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      return this.showAge;
    }
    return;
  }

  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        String(data.name).trim().toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
        String(data.patronus).trim().toLowerCase().indexOf(searchTerms.patronus.toLowerCase()) !== -1 &&
        String(data.dateOfBirth).trim().toLowerCase().indexOf(searchTerms.dateOfBirth.toLowerCase()) !== -1
      );
    };
    return filterFunction;
  }
}
