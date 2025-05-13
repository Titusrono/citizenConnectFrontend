import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { PetitionComponent } from './components/petition/petition.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ModeratorComponent } from './admin/moderator/moderator.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { RealtimereportComponent } from './components/realtimereport/realtimereport.component';
import { StreamingliveComponent } from './components/streaminglive/streaminglive.component';
import { VotingdasboardComponent } from './components/votingdasboard/votingdasboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ReportAdminComponent } from './admin/report-admin/report-admin.component';
import { VoteCreateComponent } from './admin/vote-create/vote-create.component';
import { ProposalComponent } from './components/proposal/proposal.component';


export const routes: Routes = [
    {path:'', 'title':'Home', component: HomeComponent},
    {path:'contact', 'title':'Contact', component: ContactComponent},
    {path:'about', 'title':'About', component: AboutComponent},
    {path:'service', 'title':'Services', component: ServiceComponent},
    {path:'dashboard', 'title':'Dashboard', component: DashboardComponent},
    {path:'dashboard',    children: [
            { path: '', component: DashboardComponent }, // default child (Dashboard main)
            { path: 'moderator', component: ModeratorComponent },
            { path: 'petition', component: PetitionComponent },
            { path: 'realtimereport', component: RealtimereportComponent },
            { path: 'streaminglive', component: StreamingliveComponent },
            { path: 'votingdashboard', component: VotingdasboardComponent },
          ]
    },
    {path:'login', 'title':'Login', component: LoginComponent},
    {path:'signup', 'title':'Signup', component: SignupComponent},
    {path:'resetpassword', 'title':'Reset password', component: ResetpasswordComponent},
    {path:'logout', 'title':'Logout', component: LogoutComponent},
    {path:'privacy', 'title':'Privacy',component:PrivacyComponent},
    {path:'terms', 'title':'Terms', component:TermsComponent},
    {path:'blog','title':'Blog',component:BlogComponent},
    {path:'admin-dashboard','title':'admin-dashboard',component:AdminDashboardComponent},
    {path:'report-admin', 'title':'Report-Admin', component: ReportAdminComponent},
    {path:'vote-create', 'title':'Vote Creation', component:VoteCreateComponent},
    {path:'proposal','title':'Proposal',component:ProposalComponent},
    {path:'**', 'title':'404', component: PagenotfoundComponent}


];
