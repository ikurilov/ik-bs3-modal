import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IkBs3ModalService} from './modal.service';
import {IkBs3ModalComponent} from './modal/modal.component';
import {IkBs3ModalContainerComponent} from './modal-container/modal-container.component';
import {IkBs3ModalWarningComponent} from './modal-warning/modal-warning.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    IkBs3ModalComponent,
    IkBs3ModalContainerComponent,
    IkBs3ModalWarningComponent,
  ],
  entryComponents: [
    IkBs3ModalComponent,
    IkBs3ModalWarningComponent
  ],
  exports: [IkBs3ModalContainerComponent],
  providers: [
    IkBs3ModalService
  ]
})
export class IkBs3Modal {
}
