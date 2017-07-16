import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongModalComponent } from './long-modal.component';

describe('LongModalComponent', () => {
  let component: LongModalComponent;
  let fixture: ComponentFixture<LongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
