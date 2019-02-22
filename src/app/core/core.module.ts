import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {HttpService} from './http/http.service';
import {AuthenticationService} from './http/authentication.service';
import {AuthGuard} from './guards/auth.guard';
import {TranslationService} from 'angular-l10n';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HttpService,
    AuthenticationService,
    AuthGuard,
    TranslationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
