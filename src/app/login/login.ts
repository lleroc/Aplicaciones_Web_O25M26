import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/login.interfa';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = false;
  errorMsg = '';
  form: FormGroup = new FormGroup({
    emial: new FormControl('', [Validators.required, Validators.email]),
    contrasenia:new FormControl('',[Validators.required])
  });
  constructor(private fb:FormBuilder, private loginServicio:AuthService, private rutas:Router) {  
  }

  grabar(){
    this.errorMsg = '';
    this.loading = true;
    const usario:ILogin = this.form.getRawValue()

    this.loginServicio.login(usario).subscribe(
      dato => {
        console.log(dato)
      }
    )
  }
}
