import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {IkBs3ModalWarningComponent} from './modal-warning/modal-warning.component';
import {IModalObject} from './modal-object';

@Injectable()
export class IkBs3ModalService {
  public modalOpen = new Subject<IModalObject>();

  constructor() {
  }

  open(component, inputs?: any, config?: any): { dismiss: Function, result: Promise<any> } {
    let modalObject: IModalObject;
    const externalClose = new EventEmitter();
    return {
      dismiss: () => externalClose.emit(),
      result: new Promise((resolve, reject) => {
        modalObject = {component, inputs, resolve, reject, config, externalClose};
        this.modalOpen.next(modalObject);
      })
    }
  }

  warning(title: string, description: string) {
    return this.open(IkBs3ModalWarningComponent, {title, description})
  }
}
