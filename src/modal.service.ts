import {
  ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable,
  Injector, Renderer2
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
  private modalsContainer: HTMLElement;
  private scrollbarWidth;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
    this.modalFactory = this.componentFactoryResolver.resolveComponentFactory(IkBs3ModalComponent);
    /*TODO add custom container*/
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
    this.modalsContainer = document.querySelector('body');
    this.scrollbarWidth = this.getScrollBarWidth();


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
    ngxModalComponentInstance.container = this.modalsContainer;
    ngxModalComponentInstance.inputs = config.inputs;
    ngxModalComponentInstance.config = config.config;
    ngxModalComponentInstance.scrollWidth = this.scrollbarWidth;

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

  private getScrollBarWidth() {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }
    document.body.removeChild(outer);

    return (w1 - w2);
  };
}
