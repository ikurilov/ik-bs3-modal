import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IkBs3Modal} from '../../src/modal.module';
import {RouterModule} from '@angular/router';
import { LongModalComponent } from './long-modal/long-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LongModalComponent,
  ],
  imports: [
    BrowserModule,
    IkBs3Modal,
    RouterModule
  ],
  entryComponents: [
    LongModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
