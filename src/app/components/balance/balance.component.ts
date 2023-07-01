import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';

export interface Balances {
  assetCode: string;
  availableAmount: number;
  availableAmountTRYValue: number;
}
export type BalanceList = Balances[];

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  isLoggedIn = false;
  balancesData: BalanceList = [];
  displayedColumns: string[] = [
    'assetCode',
    'availableAmount',
    'availableAmountTRYValue',
  ];
  isFirstLoad = true;

  showLowBalances = true;
  dataSource = new MatTableDataSource(this.balancesData);
  constructor(private authService: AuthService) {}

  getUserBalance() {
    this.authService.userBalance().subscribe(
      (data) => {
        this.balancesData = data.balances;
        console.log('Nerde bu datalar', data);
        this.dataSource = new MatTableDataSource(this.balancesData);
        this.numberFormat();
        console.log(this.dataSource);
        console.log(this.dataSource.filteredData[0]);
        this.isLoggedIn = true;
      },
      (error) => {
        console.log('hataalarınla gelll', error);
      }
    );
  }
  toggleBalance() {
    this.showLowBalances = !this.showLowBalances;
    this.dataSource.data = this.showLowBalances
      ? this.balancesData.filter(
          (balance) => balance.availableAmountTRYValue >= 1
        )
      : this.balancesData;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  numberFormat(): void {
    this.dataSource.data.forEach((balance) => {
      balance.availableAmount = this.convertToFormatnumber(
        balance.availableAmount
      );
      balance.availableAmountTRYValue = this.convertToFormatnumber(
        balance.availableAmountTRYValue
      );
    });
    this.dataSource.filterPredicate = this.createFilterPredicate();
    this.dataSource.filter = this.showLowBalances ? '' : '1';
  }
  convertToFormatnumber(value: number): number {
    return Number(value.toFixed(2));
  }
  createFilterPredicate() {
    return (data: Balances, filter: string) => {
      return data.availableAmountTRYValue > 1 || filter !== '1';
    };
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn:boolean) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.getUserBalance();
      } else if(this.isFirstLoad) {
        alert('Giriş yapmış kullanıcılar bakiyeyi görür');
      }
      this.isFirstLoad = false;
    });
    
  }
}
