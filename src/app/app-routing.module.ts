import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MarketsComponent } from './components/markets/markets.component';
import { MarketDetailComponent } from './components/market-detail/market-detail.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BalanceComponent } from './components/balance/balance.component';
import { OpenOrdersComponent } from './components/open-orders/open-orders.component';

const routes: Routes = [
  { path: '' ,component: HomeComponent},
  { path: 'login', component: LoginComponent,data:{showFooter:true} },
  { path: 'marketler', component: MarketsComponent,data:{showFooter:true} },
  { path: 'market/:marketCode', component: MarketDetailComponent ,data:{showFooter:true}},
  { path: 'profil', component: ProfilComponent,data:{showFooter:true} },
  { path: 'profil/bakiyeler', component: BalanceComponent,data:{showFooter:true} },
  { path: 'profil/acik-emirler', component: OpenOrdersComponent ,data:{showFooter:true}},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
