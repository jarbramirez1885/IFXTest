import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceStudentsService } from '../../services/service-students.service';
import { ServiceCharactersService } from '../../../characters/services/service-characters.service';
import { ApplicationModel } from '../../models/application-model.model';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { StudentsMessages } from '../../../../core/messages/students-messages'

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  form!: FormGroup;
  formSubmitted: boolean = false;

  listHouse!: any[];

  constructor(private serviceStudentsService: ServiceStudentsService,
    private serviceCharactersService: ServiceCharactersService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllHouses();
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
          message: StudentsMessages.CREATE_CONFIRM_APP,
          opc: true,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          this.serviceStudentsService.addNewApplication(this.form.value).subscribe(response => {
            if (response == 200) {
              this.router.navigate(['./home/students/list-applications']);
              this.dialog.open(DialogComponent, {
                data: {
                  icon: 'check_circle_outline',
                  message: StudentsMessages.SUCCESS_APP_CREATED,
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

  clean() {
    this.form.reset();
    this.initForm();
  }

}
