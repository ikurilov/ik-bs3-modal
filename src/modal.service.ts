import {
  ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable,
  Injector
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {IkBs3ModalWarningComponent} from './modal-warning/modal-warning.component';
import {IModalObject} from './modal-object';
import {IkBs3ModalComponent} from './modal/modal.component';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class IkBs3ModalService {
  public modalOpen = new Subject<IModalObject>();
  private modalFactory: ComponentFactory<IkBs3ModalComponent>;
  private modalsContainer;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
    this.modalFactory = this.componentFactoryResolver.resolveComponentFactory(IkBs3ModalComponent);
    /*TODO add custom container*/
    this.modalsContainer = document.querySelector('body');
  }

  open(component, inputs?: any, config?: any): { dismiss: Function, result: Promise<any> } {
    let modalObject: IModalObject;
    const externalClose = new EventEmitter();
    return {
      dismiss: () => externalClose.emit(),
      result: new Promise((resolve, reject) => {
        modalObject = {component, inputs, resolve, reject, config, externalClose};
        this.addModal(modalObject);
      })
    }
  }

  warning(title: string, description: string) {
    return this.open(IkBs3ModalWarningComponent, {title, description})
  }

  private addModal(config: IModalObject) {
    const modalComponentRef = this.modalFactory.create(this.injector);
    this.appRef.attachView(modalComponentRef.hostView);
    this.modalsContainer.appendChild(modalComponentRef.location.nativeElement);
    const ngxModalComponentInstance = <IkBs3ModalComponent>modalComponentRef.instance;
    const subscriptions = [];

    const closeModal = () => this.closeModal(modalComponentRef, subscriptions);

    if (config.externalClose) {
      subscriptions.push(config.externalClose.subscribe(() => {
        closeModal();
        config.externalClose.complete();
      }));
    }

    ngxModalComponentInstance.component = config.component;
    ngxModalComponentInstance.inputs = config.inputs;
    ngxModalComponentInstance.config = config.config;

    subscriptions.push(ngxModalComponentInstance.close.subscribe(res => {
      closeModal();
      config.resolve(res);
    }));

    subscriptions.push(ngxModalComponentInstance.dismiss.subscribe(res => {
      closeModal();
      config.reject(res);
    }));
  }

  private closeModal(modalRef: ComponentRef<IkBs3ModalComponent>, subscriptions: Subscription[]) {
    this.modalsContainer.removeChild(modalRef.location.nativeElement);
    this.appRef.detachView(modalRef.hostView);
    modalRef.destroy();

    subscriptions.forEach(subs => subs.unsubscribe());
  }
}
