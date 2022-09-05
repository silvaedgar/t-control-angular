import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsFormComponent } from './components/clients/clients-form/clients-form.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CoinsComponent } from './components/maintenance/coins/coins.component';
import { PaymentFormsComponent } from './components/maintenance/payment-forms/payment-forms.component';
import { ProductCategoriesComponent } from './components/maintenance/product-categories/product-categories.component';
import { ProductGroupsComponent } from './components/maintenance/product-groups/product-groups.component';
import { TaxesComponent } from './components/maintenance/taxes/taxes.component';
import { ProductsFormComponent } from './components/products/products-form/products-form.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersFormComponent } from './components/suppliers/suppliers-form/suppliers-form.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WhoaimComponent } from './pages/whoaim/whoaim.component';
import { AdminUserGuard } from './shared/guard/admin-user.guard';
import { MaintenanceGuard } from './shared/guard/maintenance.guard'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'whoaim', component: WhoaimComponent},
  {path: 'coins', component: CoinsComponent, canActivate: [MaintenanceGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AdminUserGuard]},
  {path: 'clients/clients-forms/:id', component: ClientsFormComponent, canActivate: [AdminUserGuard]},
  {path: 'product-groups', component: ProductGroupsComponent, canActivate: [MaintenanceGuard]},
  {path: 'product-categories', component: ProductCategoriesComponent, canActivate: [MaintenanceGuard]},
  {path: 'payment-forms', component: PaymentFormsComponent, canActivate: [MaintenanceGuard]},
  {path: 'taxes', component: TaxesComponent, canActivate: [MaintenanceGuard]},
  {path: 'suppliers', component: SuppliersComponent, canActivate: [AdminUserGuard]},
  {path: 'suppliers/suppliers-forms/:id', component: SuppliersFormComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AdminUserGuard]},
  {path: 'products/products-forms/:id', component: ProductsFormComponent, canActivate: [AdminUserGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
