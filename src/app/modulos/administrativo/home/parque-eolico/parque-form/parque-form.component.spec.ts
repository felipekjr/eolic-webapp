import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueFormComponent } from './parque-form.component';

describe('ParqueFormComponent', () => {
  let component: ParqueFormComponent;
  let fixture: ComponentFixture<ParqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
