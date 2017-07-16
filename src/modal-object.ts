import {Component, EventEmitter} from '@angular/core';
import {IIkBs3ModalConfig} from './modal-config';
export interface IModalObject {
  component: Component,
  inputs?: any,
  resolve: Function,
  reject: Function,
  config?: IIkBs3ModalConfig,
  externalClose?: EventEmitter<any>
}
