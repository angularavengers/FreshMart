import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyPlusMinusComponent } from './qty-plus-minus.component';

describe('QtyPlusMinusComponent', () => {
  let component: QtyPlusMinusComponent;
  let fixture: ComponentFixture<QtyPlusMinusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtyPlusMinusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyPlusMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
