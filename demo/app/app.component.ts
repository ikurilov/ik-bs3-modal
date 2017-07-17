import { Component } from '@angular/core';
import {IkBs3ModalService} from '../../src/modal.service';
import {LongModalComponent} from './long-modal/long-modal.component';
import {ModalContentComponent} from './modal-content/modal-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLong = false;
  backdrop = true;
  keyboard = false;
  size = 'sm';
  constructor(private ikModal: IkBs3ModalService) {

  }
  open() {
    const content = this.isLong ? LongModalComponent : ModalContentComponent;
    this.ikModal.open(content, null, {size: this.size, backdrop: this.backdrop, keyboard: this.keyboard});
  }
}
