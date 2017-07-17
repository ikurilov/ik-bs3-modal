import { Component, OnInit } from '@angular/core';
import {IkBs3ModalInstance} from "../../../src/modal-instance";
import {IkBs3ModalService} from "../../../src/modal.service";
import {LongModalComponent} from "../long-modal/long-modal.component";

@Component({
  selector: 'ik-nested-modals',
  templateUrl: './nested-modals.component.html',
  styleUrls: ['./nested-modals.component.css']
})
export class NestedModalsComponent implements OnInit {

  constructor(private ikModalInstance: IkBs3ModalInstance, private modalService: IkBs3ModalService) { }

  ngOnInit() {
  }

  close() {
    this.ikModalInstance.dismiss();
  }

  accept() {
    this.ikModalInstance.close();
  }

  openChild() {
    this.modalService.open(LongModalComponent);
  }
}
