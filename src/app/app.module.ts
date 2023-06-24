import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MarketsComponent } from './components/markets/markets.component';
import { MarketDetailComponent } from './components/market-detail/market-detail.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BalanceComponent } from './components/balance/balance.component';
import { OpenOrdersComponent } from './components/open-orders/open-orders.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table'
import { SharedModule } from './shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from './button.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MarketsComponent,
    MarketDetailComponent,
    ProfilComponent,
    BalanceComponent,
    OpenOrdersComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    SharedModule,
    FlexLayoutModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
