import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  @ViewChild("basicModal") modal;

  constructor(public auth: AuthService,
              private userService: UsersService,
              private toast: ToastrService,
              fb: FormBuilder) { 
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public submitLogin() {
    if (this.loginForm.valid) {
      let toast = this.toast.info("Loading...", "", {
        timeOut: 5000,
        positionClass: 'toast-bottom-center',
        progressBar: true
      });
      // TODO
      // this.userService.login(this.loginForm.controls["username"].value, this.loginForm.controls["password"].value)
      //   .subscribe(
      //     res => {
      //       console.log("Success");
      //       this.modal.hide();
      //       toast.toastRef.close();
      //     } ,
      //     err => {
      //       toast.toastRef.close();
      //       this.toast.error(err);
      //     }
      //   );
    }
  }
}
