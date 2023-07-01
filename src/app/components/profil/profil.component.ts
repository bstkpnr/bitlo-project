import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

import { MatTableDataSource } from '@angular/material/table';

export interface User {
  key: string;
  value: any;
}

export type UserList = User[];
@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  isLoggedIn = false;
  userData: UserList = [];
  displayedColumns: string[] = ['key', 'value'];

  dataSource = new MatTableDataSource(this.userData)
  constructor(private authService: AuthService) {}

  getUserData() {
    this.authService.userProfil().subscribe(
      (data) => {
        let userDataRaw = data.me; 
        this.userData = Object.keys(userDataRaw)
          .filter(key => key !== 'country') 
          .map(e => {
            return {
              key: e, 
              value: userDataRaw[e]
            };
          });
        console.log('Nerde bu', data);
        this.dataSource = new MatTableDataSource(this.userData);
        console.log(this.dataSource);
        console.log(this.dataSource.filteredData[0]);
        this.isLoggedIn = true; 
      },
      (error) => {
        console.error('Bir hata oluştu:', error);
      }
    );
  }
  

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn:boolean) => {
      this.isLoggedIn = loggedIn;     if (this.isLoggedIn) {
      this.getUserData();
    } else {
      alert('Sadece giriş yapmış kullanıcılar bu alanı görüntüleyebilir');
    }
    });
  }
}
