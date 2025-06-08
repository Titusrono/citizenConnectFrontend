import { Routes } from '@angular/router';

// Components imports
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ModeratorComponent } from './admin/moderator/moderator.component';
import { ReportAdminComponent } from './admin/report-admin/report-admin.component';
import { VoteCreateComponent } from './admin/vote-create/vote-create.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { GoogleCallbackComponent } from './auth/google-callback/google-callback.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { PortalComponent } from './citizen/portal/portal.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PetitionComponent } from './components/petition/petition.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { RealtimereportComponent } from './components/realtimereport/realtimereport.component';
import { ServiceComponent } from './components/service/service.component';
import { StreamingliveComponent } from './components/streaminglive/streaminglive.component';
import { TermsComponent } from './components/terms/terms.component';
import { VotingdasboardComponent } from './components/votingdasboard/votingdasboard.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

// Guards imports
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'service', title: 'Services', component: ServiceComponent },
  { path: 'blog', title: 'Blog', component: BlogComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'privacy', title: 'Privacy Policy', component: PrivacyComponent },
  { path: 'terms', title: 'Terms & Conditions', component: TermsComponent },

  // Auth routes (no guards)
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'forgot-password', title: 'Forgot Password', component: ForgotPasswordComponent },
  { path: 'reset-password', title: 'Reset Password', component: ResetPasswordComponent },
  { path: 'update-password', title: 'Update Password', component: UpdatePasswordComponent },
  { path: 'google-callback', title: 'Google Login', component: GoogleCallbackComponent },

  // Authenticated (user or admin) shared routes
  {
    path: 'dashboard',
    title: 'User Dashboard',
    //canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'moderator', component: ModeratorComponent },
      { path: 'petition', component: PetitionComponent },
      { path: 'realtimereport', component: RealtimereportComponent },
      { path: 'streaminglive', component: StreamingliveComponent },
      { path: 'votingdashboard', component: VotingdasboardComponent },
    ],
  },
  {
    path: 'proposal',
    title: 'Proposals',
    //canActivate: [AuthGuard],
    component: ProposalComponent,
  },
  {
    path: 'portal',
    title: 'Citizen Portal',
    //canActivate: [AuthGuard],
    component: PortalComponent,
  },

  // Admin-only routes
  {
    path: 'admin-dashboard',
    title: 'Admin Panel',
    //canActivate: [AuthGuard],
    component: AdminDashboardComponent,
    children: [
      { path: 'report-admin', component: ReportAdminComponent },
      { path: 'vote-create', component: VoteCreateComponent },
    ],
  },

  // Catch-all 404
  { path: '**', title: '404 - Page Not Found', component: PagenotfoundComponent },
];
