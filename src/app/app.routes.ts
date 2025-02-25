import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RealtimereportComponent } from './components/realtimereport/realtimereport.component';
import { PetitionComponent } from './components/petition/petition.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';

export const routes: Routes = [
    {path:'', 'title':'Home', component: HomeComponent},
    {path:'contact', 'title':'Contact', component: ContactComponent},
    {path:'about', 'title':'About', component: AboutComponent},
    {path:'service', 'title':'Services', component: ServiceComponent},
    {path:'dashboad', 'title':'Dashboard', component: DashboardComponent},
    {path:'login', 'title':'Login', component: LoginComponent},
    {path:'signup', 'title':'Signup', component: SignupComponent},
    {path:'resetpassword', 'title':'Reset password', component: ResetpasswordComponent},
    {path:'realtimereport', 'title':'Real-time report', component: RealtimereportComponent},
    {path:'petition', 'title':'Petition', component: PetitionComponent},
    {path:'**', 'title':'404', component: PagenotfoundComponent}


];
