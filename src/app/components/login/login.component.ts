import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  username:string='';
  password:string='';
  loginError:string='';

  constructor(private authService:AuthService, private router:Router){}

  login(){
    if(!this.username || !this.password){
      this.loginError='Lütfen gerekli alanları doldurunuz';
      return;
    }

    if(!this.isValidEmail(this.username)){
      this.loginError='Lütfen geçerli bir e-posta adresi giriniz';
    }

    this.authService.login(this.username, this.password).subscribe(
      (response)=>{
        if(response.code ===0){
          localStorage.setItem('token',response.token);
          this.router.navigate(['/profil']);

        }
        else {
          this.loginError='Kullanıcı adı ya da parola yanlış !';
        }
      },
      (error)=>{
        console.error("Api isteği sırasında bir hata oluştu",error)
      }
    );
  }

  private isValidEmail(email:string):boolean{
    return true;
  }
}