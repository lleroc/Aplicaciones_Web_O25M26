import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login.interfa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  RUTA_API="https://localhost:7050/api/usuarios"

  constructor(private http:HttpClient) {}

  login(login:any):Observable<any>{
    let dato:any = this.http.post<any>(this.RUTA_API + "/login",login)
    this.carga_variable(dato)
    return login
  }

  carga_variable(usuario:any){
    console.log(usuario)
    localStorage.setItem("nombre",usuario.nombre)
    localStorage.setItem("email",usuario.email)
    localStorage.setItem("id",usuario.id)
  }

  logout(){
    localStorage.removeItem("nombre")
    localStorage.removeItem("email")
    localStorage.removeItem("id")
  }

  estaLogueado():boolean{
    const id: string = (localStorage.getItem("id")) ?? ""
    if (parseInt(id) != 0){
      return true
    }else{
      return false
    }
  }
  
}
