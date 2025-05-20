import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ModeratorComponent } from "./admin/moderator/moderator.component";
import { ReportAdminComponent } from "./admin/report-admin/report-admin.component";
import { VoteCreateComponent } from "./admin/vote-create/vote-create.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";
import { SigncrudComponent } from "./auth/signcrud/signcrud.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { PortalComponent } from "./citizen/portal/portal.component";
import { AboutComponent } from "./components/about/about.component";
import { BlogComponent } from "./components/blog/blog.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from "./components/home/home.component";
import { PetitionComponent } from "./components/petition/petition.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ProposalComponent } from "./components/proposal/proposal.component";
import { RealtimereportComponent } from "./components/realtimereport/realtimereport.component";
import { ServiceComponent } from "./components/service/service.component";
import { StreamingliveComponent } from "./components/streaminglive/streaminglive.component";
import { TermsComponent } from "./components/terms/terms.component";
import { VotingdasboardComponent } from "./components/votingdasboard/votingdasboard.component";
import { PagenotfoundComponent } from "./shared/pagenotfound/pagenotfound.component";

export const routes: Routes = [
  // 🌐 Public routes
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'service', title: 'Services', component: ServiceComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  { path: 'resetpassword', title: 'Reset Password', component: ResetpasswordComponent },
  { path: 'privacy', title: 'Privacy Policy', component: PrivacyComponent },
  { path: 'terms', title: 'Terms & Conditions', component: TermsComponent },
  { path: 'blog', title: 'Blog', component: BlogComponent },

  // 👥 Authenticated user/admin shared routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'moderator', component: ModeratorComponent },
      { path: 'petition', component: PetitionComponent },
      { path: 'realtimereport', component: RealtimereportComponent },
      { path: 'streaminglive', component: StreamingliveComponent },
      { path: 'votingdashboard', component: VotingdasboardComponent },
    ]
  },
  {
    path: 'proposal',
    component: ProposalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },

  // 🛡️ Admin-only routes
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'report-admin',
    component: ReportAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'vote-create',
    component: VoteCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'signcrud',
    component: SigncrudComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },

  // 🔓 Logout (no guard needed)
  { path: 'logout', title: 'Logout', component: LogoutComponent },

  // ❌ Fallback route for unknown paths
  { path: '**', title: '404 - Page Not Found', component: PagenotfoundComponent }
];
