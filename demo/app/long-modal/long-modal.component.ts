import { Component, OnInit } from '@angular/core';
import {IkBs3ModalInstance} from "../../../src/modal-instance";

@Component({
  selector: 'ik-long-modal',
  templateUrl: './long-modal.component.html',
  styleUrls: ['./long-modal.component.css']
})
export class LongModalComponent implements OnInit {

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
