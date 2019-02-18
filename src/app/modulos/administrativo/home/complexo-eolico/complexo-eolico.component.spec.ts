import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexoEolicoComponent } from './complexo-eolico.component';

describe('ComplexoEolicoComponent', () => {
  let component: ComplexoEolicoComponent;
  let fixture: ComponentFixture<ComplexoEolicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexoEolicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexoEolicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
