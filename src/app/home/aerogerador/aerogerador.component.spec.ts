import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AerogeradorComponent } from './aerogerador.component';

describe('AerogeradorComponent', () => {
  let component: AerogeradorComponent;
  let fixture: ComponentFixture<AerogeradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AerogeradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AerogeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
