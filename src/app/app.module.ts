import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/module/material.module';

// Providers
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';

// Componentes
import { AppComponent } from './app.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { CoinsComponent } from './components/maintenance/coins/coins.component';
import { PaymentFormsComponent } from './components/maintenance/payment-forms/payment-forms.component';
import { ProductGroupsComponent } from './components/maintenance/product-groups/product-groups.component';
import { ProductCategoriesComponent } from './components/maintenance/product-categories/product-categories.component';
import { TaxesComponent } from './components/maintenance/taxes/taxes.component';
import { PaymentClientsComponent } from './components/payment-clients/payment-clients.component';
import { PaymentSuppliersComponent } from './components/payment-suppliers/payment-suppliers.component';
import { NavbarStartComponent } from './layouts/navbar-start/navbar-start.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WhoaimComponent } from './pages/whoaim/whoaim.component';
import { MainComponent } from './pages/main/main.component';
import { ProductGroupsDialogComponent } from './components/maintenance/product-groups/product-groups-dialog/product-groups-dialog.component';
import { ProductCategoriesDialogComponent } from './components/maintenance/product-categories/product-categories-dialog/product-categories-dialog.component';
import { PaymentFormsDialogComponent } from './components/maintenance/payment-forms/payment-forms-dialog/payment-forms-dialog.component';
import { CoinsDialogComponent } from './components/maintenance/coins/coins-dialog/coins-dialog.component';
import { UsersComponent } from './components/maintenance/users/users.component';
import { UsersFormComponent } from './components/maintenance/users/users-form/users-form.component';
import { TaxesDialogComponent } from './components/maintenance/taxes/taxes-dialog/taxes-dialog.component';
import { ClientsFormComponent } from './components/clients/clients-form/clients-form.component';
import { SuppliersFormComponent } from './components/suppliers/suppliers-form/suppliers-form.component';
import { ProductsFormComponent } from './components/products/products-form/products-form.component';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CardHeaderComponent } from './shared/card-header/card-header.component';
import { SearchInTableComponent } from './shared/search-in-table/search-in-table.component';


@NgModule({
  declarations: [
    AppComponent,
    PurchasesComponent,
    SalesComponent,
    ProductsComponent,
    ClientsComponent,
    SuppliersComponent,
    CoinsComponent,
    PaymentFormsComponent,
    ProductGroupsComponent,
    ProductCategoriesComponent,
    TaxesComponent,
    PaymentClientsComponent,
    PaymentSuppliersComponent,
    NavbarStartComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    WhoaimComponent,
    MainComponent,
    LoginComponent,
    ProductGroupsDialogComponent,
    ProductCategoriesDialogComponent,
    PaymentFormsDialogComponent,
    CoinsDialogComponent,
    UsersComponent,
    UsersFormComponent,
    TaxesDialogComponent,
    ClientsFormComponent,
    SuppliersFormComponent,
    ProductsFormComponent,
    MainComponent,
    HomeComponent,
    SpinnerComponent,
    CardHeaderComponent,
    SearchInTableComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
