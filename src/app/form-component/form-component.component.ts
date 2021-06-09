import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})
export class FormComponentComponent implements OnInit {
  profileForm: FormGroup;
  formSubmited: boolean;
  checkExistEmail:boolean;
  frameworks: Array<Framework>;
  timeout: any = null;
  selectedFramework: Framework;
  constructor() {
    this.formSubmited = false;
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required,),
      hobby: new FormControl(Array<Hobby>(),Validators.required),
    });
    this.checkExistEmail = false;
    console.log(this.profileForm)
  }
  

  ngOnInit(): void {

    this.frameworks = [
      new Framework('angular', ['1.1.1', '1.2.1', '1.3.3']),
      new Framework('react', ['2.1.2', '3.2.4', '4.3.1']),
      new Framework('vue', ['3.3.1', '5.2.1', '5.1.3']),
    ];
    this.selectedFramework = new Framework('', []);
  }

  onFrameworkChange(event: any) {
    this.selectedFramework =
      this.frameworks[
        this.frameworks.findIndex((x) => x.name === event.target.value)
      ];
  }
  submit() {
    this.formSubmited = true;
    console.log(this.profileForm.value);
  }
   onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.checkEmail();
      }
    }, 1000);
  }
   checkEmail() {
    if (this.isValid(this.profileForm.value.email)) {
       this.checkEmailOnServer();
    }
  }
  checkEmailOnServer(){
    let mail = this.profileForm.value.email;
    this.checkExistEmail = (mail==="test@test.test");
  }
  isValid(email:string) {
    var re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$/;
    return re.test(String(email).toLowerCase());
}
addNewHobby(name:string,duration:string){
  let localHobby = new Hobby(name,duration);
  this.profileForm.value.hobby.push(localHobby);

}

}

class Hobby {
  name: string;
  duration: string;
  constructor(name: string, duration: string) {
    this.name = name;
    this.duration = duration;
  }
}
class Framework {
  name: string;
  versions: Array<string>;
  constructor(name: string, versions: Array<string>) {
    this.name = name;
    this.versions = versions;
  }
}
