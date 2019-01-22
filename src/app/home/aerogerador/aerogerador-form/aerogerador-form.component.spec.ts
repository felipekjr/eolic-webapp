import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AerogeradorFormComponent } from './aerogerador-form.component';

describe('AerogeradorFormComponent', () => {
  let component: AerogeradorFormComponent;
  let fixture: ComponentFixture<AerogeradorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AerogeradorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AerogeradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
