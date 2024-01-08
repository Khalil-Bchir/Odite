import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { HeadingListComponent } from './heading/heading-list/heading-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateHeadingComponent } from './heading/create-heading/create-heading.component';
import { HeadingDetailsComponent } from './heading/heading-details/heading-details.component';
import { UpdateQuestionComponent } from './question/update-question/update-question.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { SadAuthGuard } from './guard/SAD/sad-auth.guard';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { CreateAuditComponent } from './audit/create-audit/create-audit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Authenticated Routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'heading-list', component: HeadingListComponent },
      { path: 'heading-details/:id', component: HeadingDetailsComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'company-details/:id', component: CompanyDetailsComponent },
      { path: 'profile-details/:id', component: ProfileDetailsComponent},
      { path: 'create-audit', component: CreateAuditComponent}
    ],
  },

  // Admin Routes (requires SADAuthGuard)
  {
    path: 'admin',
    canActivate: [SadAuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-details/:id', component: UserDetailsComponent },
      { path: 'update-user/:id', component: UpdateUserComponent },
      { path: 'delete-user/:id', component: DeleteUserComponent },
      { path: 'create-heading', component: CreateHeadingComponent },
      { path: 'question-update/:id', component: UpdateQuestionComponent },
      { path: 'create-question', component: CreateQuestionComponent },
      { path: 'heading-list', component: HeadingListComponent },
      { path: 'heading-details/:id', component: HeadingDetailsComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'company-details/:id', component: CompanyDetailsComponent },
      { path: 'profile-details/:id', component: ProfileDetailsComponent},
      { path: 'create-audit', component: CreateAuditComponent}
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
