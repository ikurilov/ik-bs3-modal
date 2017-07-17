import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedModalsComponent } from './nested-modals.component';

describe('NestedModalsComponent', () => {
  let component: NestedModalsComponent;
  let fixture: ComponentFixture<NestedModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
