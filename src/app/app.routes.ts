import { Routes } from "@angular/router";

// 📦 Public Components
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutComponent } from "./components/about/about.component";
import { ServiceComponent } from "./components/service/service.component";
import { BlogComponent } from "./components/blog/blog.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { TermsComponent } from "./components/terms/terms.component";

// 🔐 Auth Components
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { UpdatePasswordComponent } from "./auth/update-password/update-password.component";
import { GoogleCallbackComponent } from "./auth/google-callback/google-callback.component";

// 🧑‍💼 Authenticated (User/Admin) Components
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ModeratorComponent } from "./admin/moderator/moderator.component";
import { PetitionComponent } from "./components/petition/petition.component";
import { RealtimereportComponent } from "./components/realtimereport/realtimereport.component";
import { StreamingliveComponent } from "./components/streaminglive/streaminglive.component";
import { VotingdasboardComponent } from "./components/votingdasboard/votingdasboard.component";
import { ProposalComponent } from "./components/proposal/proposal.component";
import { PortalComponent } from "./citizen/portal/portal.component";

// 🛡️ Admin-only Components
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { ReportAdminComponent } from "./admin/report-admin/report-admin.component";
import { VoteCreateComponent } from "./admin/vote-create/vote-create.component";

// ❌ Shared/Fallback
import { PagenotfoundComponent } from "./shared/pagenotfound/pagenotfound.component";

// 🔒 Guards
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [

  // 🌐 Public Routes
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'service', title: 'Services', component: ServiceComponent },
  { path: 'blog', title: 'Blog', component: BlogComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'privacy', title: 'Privacy Policy', component: PrivacyComponent },
  { path: 'terms', title: 'Terms & Conditions', component: TermsComponent },

  // 🔐 Auth Routes
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'forgot-password', title: 'Forgot Password', component: ForgotPasswordComponent },
  { path: 'reset-password', title: 'Reset Password', component: ResetPasswordComponent },
  { path: 'update-password', title: 'Update Password', component: UpdatePasswordComponent },
  { path: 'google-callback', title: 'Google Login', component: GoogleCallbackComponent },

  // 👥 Authenticated (User/Admin) Shared Routes
  {
    path: 'dashboard',
    title: 'User Dashboard',
    canActivate: [AuthGuard],
    component:DashboardComponent,
    data: { roles: ['user', 'admin'] },
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
    component: ProposalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'portal',
    title: 'Citizen Portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },

  // 🛡️ Admin-only Routes
  {
    path: 'admin',
    title: 'Admin Panel',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'report-admin', component: ReportAdminComponent },
      { path: 'vote-create', component: VoteCreateComponent },
    ],
  },

  // ❌ Catch-all for Unknown Routes
  {
    path: '**',
    title: '404 - Page Not Found',
    component: PagenotfoundComponent,
  },
];
