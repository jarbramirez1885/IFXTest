import { Component, OnInit, Pipe } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { fromEvent, Observable } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
  startWith,
  map,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { StudentsMessages } from 'src/app/core/messages/students-messages';
import { ServiceStudentsService } from '../../services/service-students.service';
import { ServiceCharactersService } from '../../../characters/services/service-characters.service';

@Component({
  selector: 'app-update-application',
  templateUrl: './update-application.component.html',
  styleUrls: ['./update-application.component.css']
})
export class UpdateApplicationComponent implements OnInit {

  id: number = 0;
  form!: FormGroup;
  formSubmitted: boolean = false;
  listHouse!: any[];

  constructor( private ServiceStudentsService: ServiceStudentsService,
    private serviceCharactersService: ServiceCharactersService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { 
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = this.activatedRoute.snapshot.params['id'];
      });
    }

    ngOnInit(): void {
      this.initForm();
      this.getAllHouses();
      this.ServiceStudentsService.getApplicationById(this.id).subscribe((response) => {
        this.form.patchValue(response);
      });

    }
  
    initForm() {
      this.form = this.fb.group({
        name: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(20),]],
        lastName: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(20),],],
        identification: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]{1,10}$'),],],
        age: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]{1,2}$'),]],
        house: [{ value: '', disabled: false }, Validators.required,],
        id:[0],
      });
    }

    getAllHouses(){
      this.serviceCharactersService.getAllHouses().subscribe((data) => {
        this.listHouse = data;
      });
    }

    onSubmit(appForm: FormGroup){

      if (this.form.valid) {
  
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            icon: 'error',
            message: StudentsMessages.SAVE_CONFIRM_APP,
            opc: true,
          },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          if (result == true) {
            this.ServiceStudentsService.updateApplication(this.form.value).subscribe(response => {
              if (response == 200) {
                this.router.navigate(['./home/students/list-applications']);
                this.dialog.open(DialogComponent, {
                  data: {
                    icon: 'check_circle_outline',
                    message: StudentsMessages.SUCCESS_APP_SAVED,
                    opc: false,
                  },
                });
              }
            });
          }
        });
      }
    }
  
    cancel() {
      this.router.navigate(['./home/students/list-applications']);
    }

}
