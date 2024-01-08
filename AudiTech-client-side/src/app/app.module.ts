import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UpdateFileComponent } from './user/update-file/update-file.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateHeadingComponent } from './heading/create-heading/create-heading.component';
import { HeadingListComponent } from './heading/heading-list/heading-list.component';
import { UpdateHeadingComponent } from './heading/update-heading/update-heading.component';
import { HeadingDetailsComponent } from './heading/heading-details/heading-details.component';
import { DeleteHeadingComponent } from './heading/delete-heading/delete-heading.component';
import { SectionListComponent } from './section/section-list/section-list.component';
import { SectionDetailsComponent } from './section/section-details/section-details.component';
import { CreateSectionComponent } from './section/create-section/create-section.component';
import { UpdateSectionComponent } from './section/update-section/update-section.component';
import { DeleteSectionComponent } from './section/delete-section/delete-section.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { UpdateQuestionComponent } from './question/update-question/update-question.component';
import { QuestionDetailsComponent } from './question/question-details/question-details.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { DeleteQuestionComponent } from './question/delete-question/delete-question.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { DeleteCompanyComponent } from './company/delete-company/delete-company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { SadAuthGuard } from './guard/SAD/sad-auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { CreateAuditComponent } from './audit/create-audit/create-audit.component';
import { AuditListComponent } from './audit/audit-list/audit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    CreateUserComponent,
    DashboardComponent,
    NavbarComponent,
    UpdateUserComponent,
    UpdateFileComponent,
    ResetPasswordComponent,
    DeleteUserComponent,
    CreateHeadingComponent,
    HeadingListComponent,
    UpdateHeadingComponent,
    HeadingDetailsComponent,
    DeleteHeadingComponent,
    SectionListComponent,
    SectionDetailsComponent,
    CreateSectionComponent,
    UpdateSectionComponent,
    DeleteSectionComponent,
    QuestionListComponent,
    UpdateQuestionComponent,
    QuestionDetailsComponent,
    CreateQuestionComponent,
    DeleteQuestionComponent,
    CreateCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    LoginComponent,
    LogoutComponent,
    ProfileDetailsComponent,
    CreateAuditComponent,
    AuditListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Function to retrieve the token
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    SadAuthGuard,
    CookieService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
