import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

interface IData {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  mobile: number,
  address: string,
  courses: string,
  pin?: number,
  skill?: string
}

const newData: IData[] = []

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
  errorStatus: boolean = false
  data: IData[] = newData
  newArray!: FormArray
  HardworkValue: boolean = false
  CommunicationValue: boolean = false
  ConfidenceValue: boolean = false

  profileForm = this.formBuilder.group({
    newArray: this.formBuilder.array([])
  })
  constructor(private formBuilder: FormBuilder, private routeRef: Router) { }

  ngOnInit() {
    this.newArray = this.profileForm.controls['newArray'] as FormArray
    this.newArray.push(this.newGroup())
  }

  newGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^\S+@\S+\.\S+$/)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?]*$/)]),
      pin: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]),
      myCheckboxGroup: new FormGroup({
        myCheckbox1: new FormControl(false),
        myCheckbox2: new FormControl(false),
        myCheckbox3: new FormControl(false),
      }, this.requireCheckboxesToBeCheckedValidator()),
      courses: new FormControl('', [Validators.required])
    });
  }

  requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate (formGroup:any) {
      let checked = 0;
  
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
  
        if (control.value === true) {
          checked ++;
        }
      });
  
      if (checked < minRequired) {
        return {
          
          requireOneCheckboxToBeChecked: true,
        };
      }
  
      return null;
    };
  }

  submit(): void {
    this.data.push(...this.newArray.value)
    const newData: IData[] = JSON.parse(localStorage.getItem('localData') || '[]')
    newData.push(...this.newArray.value)
    localStorage.setItem("localData", JSON.stringify(newData))
    this.routeRef.navigate(["home"])
  }

  addData(): void {
    this.newArray.push(this.newGroup())
  }

  errorValid(value:any):void {
    if (value.target.value == "Hardwork") {
      this.HardworkValue = !this.HardworkValue
    }
    else if (value.target.value == "Communication") {
      this.CommunicationValue = !this.CommunicationValue
    }
    else if (value.target.value == "Confidence") {
      this.ConfidenceValue = !this.ConfidenceValue
    }

    if (this.HardworkValue == false && this.CommunicationValue == false && this.ConfidenceValue == false) {
      this.errorStatus = true
    }
    else{
      this.errorStatus = false
    }
  }
}
