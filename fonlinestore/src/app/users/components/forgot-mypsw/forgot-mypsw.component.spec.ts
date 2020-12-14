import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMypswComponent } from './forgot-mypsw.component';

describe('ForgotMypswComponent', () => {
  let component: ForgotMypswComponent;
  let fixture: ComponentFixture<ForgotMypswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotMypswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotMypswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
