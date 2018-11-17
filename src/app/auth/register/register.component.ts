import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from './../../shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public signUpForm: FormGroup;
  @ViewChild("basicModal") modal;

  constructor(public user: AuthService,
    private usersService: UsersService,
    private toast: ToastrService,
    fb: FormBuilder) {
    this.signUpForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'last-name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(9)])],
      'rpassword': ['', Validators.compose([Validators.required, Validators.minLength(9)])],
    });
  }

  ngOnInit() {
  }

  public submitSignUp() {
    if (this.signUpForm.valid
      && this.signUpForm.controls["password"].value == this.signUpForm.controls["rpassword"].value) {

      let toast = this.toast.info("Loading...", "", {
        timeOut: 5000,
        positionClass: 'toast-bottom-center',
        progressBar: true
      });
      let user = {
        name: this.signUpForm.controls["name"].value,
        lastname: this.signUpForm.controls["last-name"].value,
        password: this.signUpForm.controls["password"].value,
        email: this.signUpForm.controls["email"].value,
      };

      this.modal.hide();
      // TODO
      // this.usersService.signUp(user).subscribe(
      //   () => {
      //     console.log("Success");
      //     toast.toastRef.close();
      //     this.modal.hide();
      //   },
      //   err => {
      //     console.log(err);
      //     toast.toastRef.close();
      //     this.toast.error(err, "", {
      //       timeOut: 5000,
      //       positionClass: 'toast-bottom-center'
      //     });
      //     this.modal.hide();
      //   }
      // );
    }
  }
} 
