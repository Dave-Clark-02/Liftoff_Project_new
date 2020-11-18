import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import {user} from 'src/app/_classes/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  mismatch: boolean = false;
  verifypassword: string;
  confirmpasswordData: string;
  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  } 

  checkVerify(form: FormGroup) { 
  
    if (form.get('password') && form.get('confirmpassword')) {
      return form.get('password').value === form.get('confirmpassword').value ? null : { mismatch: true };
    }
    return null;

    
  }

  

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // toppings: new FormControl(this.toppingList)
  }, this.checkVerify);
  
}


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { TokenStorageService } from '../_services/token-storage.service';
// import {FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   form: any = {};
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private authService: AuthService) { }

//   ngOnInit() {
//   }

//   onSubmit() {
//     this.authService.register(this.form).subscribe(
//       data => {
//         console.log(data);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;
//       },
//       err => {
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       }
//     );
//   }
// }
