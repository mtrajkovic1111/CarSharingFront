import { AddCarPictureComponent } from './add-car-picture/add-car-picture.component';
import { UserRentalsComponent } from './user-rentals/user-rentals.component';
import { RentedCarComponent } from './rented-car/rented-car.component';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { AdminRentedCarsComponent } from './admin/admin-rented-cars/admin-rented-cars.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminUsersCarComponent } from './admin/admin-users-car/admin-users-car.component';
import { DetailsComponent } from './admin/admin-users/details/details.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ChangeInfoComponent } from './users/profile/change-info/change-info.component';
import { SearchCarComponent } from './search-car/search-car.component';
import { AdditionalsComponent } from './additionals/additionals.component';
import { AddCarComponent } from './add-car/add-car.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './quards/auth-guard.service';
import { FooterIconsComponent } from './footer-icons/footer-icons.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UsersCarComponent } from './users/users-car/users-car.component';
import { AdminComponent } from './admin/admin.component';
import { UserRentalsDetailsComponent } from './user-rentals-details/user-rentals-details.component';

const routes: Routes = [

  // {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, children: [
    {path: 'admin-users/admin-users/:id', component: DetailsComponent},
    {path: 'admin-users/:id', component: DetailsComponent},
    {path: 'admin-users', component: AdminUsersComponent},
    {path: 'users-car', component: AdminUsersCarComponent},
    {path: 'admin-cars', component: AdminCarsComponent},
    {path: 'admin-rented', component: AdminRentedCarsComponent},
    {path: '', component: AdminUsersComponent},


  ]},


  {path: 'add-phone', component: AddPhoneComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login-signup', component: LoginSignupComponent},
  {path: 'footer-icons', component: FooterIconsComponent},
  {path: 'user', component: UsersComponent, children: [

    {path: 'profile/:id', component: ChangeInfoComponent},
    {path: 'profile/profile/:id', component: ChangeInfoComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '', component: ProfileComponent},
    {path: 'car', component: UsersCarComponent},
    {path: 'rentals', component: UserRentalsComponent},
    {path: 'rentals/:id', component: UserRentalsDetailsComponent}
  ]},
  {path: 'add-car', component: AddCarComponent},
  {path: 'add-car/:id', component: AdditionalsComponent},
  {path: 'add-carpicture/:id', component: AddCarPictureComponent},
  {path: 'search', component: SearchCarComponent},
  {path: 'search/:id', component: RentedCarComponent},
  {path: 'forbidden', component: NoAccessComponent}


 // {path: '', redirectTo : '/login', pathMatch : 'full'} is a full path is emty



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
