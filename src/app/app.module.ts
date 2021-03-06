import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TextfieldComponent} from './textfield/textfield.component';
import {FormsModule} from '@angular/forms';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {IconComponent} from './icon/icon.component';
import {IconButtonComponent} from './icon-button/icon-button.component';
import { SignupComponent } from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import {UserApiService} from './services/user-api.service';
import {UserService} from './services/user.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    TextfieldComponent,
    CheckboxComponent,
    IconComponent,
    IconButtonComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
