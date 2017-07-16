import { Component } from '@angular/core';
import {IkBs3ModalService} from '../../src/modal.service';
import {LongModalComponent} from './long-modal/long-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ikModal: IkBs3ModalService) {

  }
  open() {
    this.ikModal.open(LongModalComponent);
  }
}
