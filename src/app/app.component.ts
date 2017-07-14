import { Component } from '@angular/core';
import {IkBs3ModalService} from "./modal/modal.service";
import {ModalContentComponent} from "./modal-content/modal-content.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ikModal: IkBs3ModalService) {

  }
  open() {
    this.ikModal.open(ModalContentComponent);
  }
}
