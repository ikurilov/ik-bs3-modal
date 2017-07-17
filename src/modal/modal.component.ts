import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output, ReflectiveInjector,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import _collection from 'lodash/collection';
import {IkBs3ModalInstance} from '../modal-instance';

@Component({
  selector: 'ik-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class IkBs3ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalWrapper') modalWrapper;
  @ViewChild('modalContent', {read: ViewContainerRef}) modalContent: ViewContainerRef;

  /*TODO закрытие модального окна по клику на подложке*/
  @ViewChild('backdrop') backdrop;

  @Input() config: any;
  @Input() component: Component;
  @Input() inputs: any;
  @Output() close = new EventEmitter();
  @Output() dismiss = new EventEmitter();

  closing = false;
  result: Function;
  wrapperElem;
  backdropElem;

  modalOpener;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private elem: ElementRef) {
    this.renderer.addClass(document.body, 'modal-open');
  }

  ngAfterViewInit() {
    this.initChildComponent(this.modalContent, this.component, this.inputs);
    this.wrapperElem = this.modalWrapper.nativeElement;
    this.backdropElem = this.backdrop.nativeElement;
    /*TODO добавить в конфиг параметр "animate"*/
    this.renderer.setStyle(this.wrapperElem, 'display', 'block');
    setTimeout(() => {
      this.renderer.addClass(this.wrapperElem, 'in');
      this.renderer.addClass(this.backdropElem, 'in');
    }, 0);

    this.modalOpener = document.activeElement;

    this.modalWrapper.nativeElement.focus();
  }

  initChildComponent(container: ViewContainerRef, component: Component, inputs: any) {

    const modalInstanceProvider = ReflectiveInjector.resolve([{
      provide: IkBs3ModalInstance,
      useValue: new IkBs3ModalInstance(
        res => this.closeModal(true, res),
        res => this.closeModal(false, res)
      )
    }]);

    const injector = ReflectiveInjector.fromResolvedProviders(modalInstanceProvider, this.modalContent.parentInjector);
    const factory = this.componentFactoryResolver.resolveComponentFactory(<any>component);
    const modalRef = container.createComponent(factory, null, injector);
    const modalInstance: any = modalRef.instance;

    this.renderer.setStyle(modalRef.injector.get(ElementRef).nativeElement, 'display', 'block');

    _collection.each(inputs, (val, key) => {
      modalInstance[key] = val;
    });
  }

  closeModal = (resolve, result?) => {
    this.closing = true;
    this.result = () => resolve ? this.close.emit(result) : this.dismiss.emit(result);
    this.renderer.removeClass(this.modalWrapper.nativeElement, 'in');
    this.renderer.removeClass(this.backdrop.nativeElement, 'in');
  };

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (this.config && this.config.keyboard && event.keyCode === 27) {
      this.closeModal(false);
    }
  }

  @HostListener('transitionend', ['$event'])
  transitionEnd(event: TransitionEvent) {
    if (this.closing) {
      this.result();
    }
  }

  ngOnDestroy() {
    this.wrapperElem = null;
    this.backdropElem = null;
    console.log('destroyed modal');
    this.modalContent.clear();
    this.renderer.removeClass(document.body, 'modal-open');
    this.modalOpener.focus();
  }
}
