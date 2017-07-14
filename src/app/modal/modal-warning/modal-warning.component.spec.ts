import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IkBs3ModalWarningComponent } from './modal-warning.component';

describe('IkBs3ModalWarningComponent', () => {
  let component: IkBs3ModalWarningComponent;
  let fixture: ComponentFixture<IkBs3ModalWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IkBs3ModalWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IkBs3ModalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
