import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantContactComponent } from './important-contact.component';

describe('ImportantContactComponent', () => {
  let component: ImportantContactComponent;
  let fixture: ComponentFixture<ImportantContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
