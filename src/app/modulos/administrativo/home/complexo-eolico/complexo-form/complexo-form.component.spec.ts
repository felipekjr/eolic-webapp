import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexoFormComponent } from './complexo-form.component';

describe('ComplexoFormComponent', () => {
  let component: ComplexoFormComponent;
  let fixture: ComponentFixture<ComplexoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
