import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchFreeOrdersComponent } from './components/search-free-orders/search-free-orders.component';
import { OrderTransportComponent } from './components/order-transport/order-transport.component';
import { BlackBoxOpenComponent } from './components/black-box-open/black-box-open.component';
import { OrderFindComponent } from './components/order-find/order-find.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'order/recipient', component: OrderListComponent},
  {path: 'order/sender', component: OrderListComponent},
  {path: 'order/free', component: SearchFreeOrdersComponent},
  {path: 'order/:id', component: OrderDetailsComponent},
  {path: 'order/tracking/:trackingCode/map', component: MapComponent},
  {path: 'transport', component: OrderTransportComponent},
  {path: 'findOrder', component: OrderFindComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'signIn', component: RegistrationComponent},
  {path: 'blackBox/open', component: BlackBoxOpenComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
    OrderListComponent,
    LoginComponent,
    OrderDetailsComponent,
    HeaderComponent,
    MapComponent,
    RegistrationComponent,
    SearchFreeOrdersComponent,
    OrderTransportComponent,
    BlackBoxOpenComponent,
    OrderFindComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
