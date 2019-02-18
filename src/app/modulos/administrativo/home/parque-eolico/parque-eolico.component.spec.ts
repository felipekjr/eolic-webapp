import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueEolicoComponent } from './parque-eolico.component';

describe('ParqueEolicoComponent', () => {
  let component: ParqueEolicoComponent;
  let fixture: ComponentFixture<ParqueEolicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParqueEolicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueEolicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
