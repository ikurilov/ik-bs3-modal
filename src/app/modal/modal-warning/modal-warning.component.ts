import {Component,  Input, OnInit} from '@angular/core';
import {IkBs3ModalInstance} from "../modal-instance";

@Component({
  selector: 'ik-bs3-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css'],
  host: {'class': 'modal-dialog modal-sm'}
})
export class IkBs3ModalWarningComponent implements OnInit {
  @Input() description;
  @Input() title;

  constructor(private modalInstance: IkBs3ModalInstance) { }

  ngOnInit() {

  }

  onClose() {
    this.modalInstance.close();
  }

  onDismiss() {
    this.modalInstance.dismiss();
  }
}
