import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';

export interface OpenOrders {
  marketCode: string;
  orderSide: string;
  orderDate: string;
  price: number;
  orderAmount: number;
  fillAmount: number;
}

export type OpenOrdersList = OpenOrders[];

@Component({
  selector: 'open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent implements OnInit {
  isLoggedIn = false;
  openOrdersData: OpenOrdersList = [];
  displayedColumns: string[] = [
    'marketCode',
    'orderSide',
    'orderDate',
    'price',
    'orderAmount',
    'fillAmount',
    'fillPercent'
  ];

  dataSource = new MatTableDataSource(this.openOrdersData);
  constructor(private authService: AuthService) {}

  getOpenOrdersData() {
    this.authService.userOpenOrders().subscribe(
      (data) => {
        this.openOrdersData = data.openOrders.map((order: OpenOrders) => {
          const fillPercent = ((order.fillAmount / order.orderAmount) * 100).toFixed(2);
          return { ...order, fillPercent: `%${fillPercent}` };});
        console.log('Nerde bu datalarr', data);
        this.dataSource = new MatTableDataSource(this.openOrdersData);
        console.log(this.dataSource);
        console.log(this.dataSource.filteredData[0]);
        this.isLoggedIn = true;
      },
      (error) => {
        console.log('hataalarınla gelll', error);
      }
    );
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getOpenOrdersData();
    } else {
      alert('Giriş yapmış kullanıcılar bakiyeyi görsün');
    }
  }
}
