import { Component, OnInit } from '@angular/core';
import {IkBs3ModalInstance} from "../../../src/modal-instance";

@Component({
  selector: 'ik-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {

  constructor(private ikModalInstance: IkBs3ModalInstance) { }

  ngOnInit() {
  }

  close() {
    this.ikModalInstance.dismiss();
  }

  accept() {
    this.ikModalInstance.close();
  }

}
