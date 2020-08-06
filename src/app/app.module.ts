import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "angularfire2/auth"
// import {
// SocialLoginModule,
// GoogleLoginProvider,
// FacebookLoginProvider,
// AuthServiceConfig,
// } from "angular-6-social-login";
// import { FirebaseAuthService } from './firebase-auth.service';

// export function getAuthServiceConfigs() {
//   let config = new AuthServiceConfig(
//       [
//         // {
//         //   id: FacebookLoginProvider.PROVIDER_ID,
// 	      // provider: new FacebookLoginProvider("Your-Facebook-app-id")
//         // },
//         {
//           id: GoogleLoginProvider.PROVIDER_ID,
// 	       provider: new GoogleLoginProvider("967608344961-m43bf75fvm2lb42hast0je7249j0rel6.apps.googleusercontent.com")
//         },
//       ]
//   );
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
    // SocialLoginModule,
    // AuthServiceConfig,
    // GoogleLoginProvider,
    // FacebookLoginProvider,
  ],
  providers: [
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: getAuthServiceConfigs
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
