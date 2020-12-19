import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrAirliquidComponent } from './dr-airliquid.component';

describe('DrAirliquidComponent', () => {
  let component: DrAirliquidComponent;
  let fixture: ComponentFixture<DrAirliquidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrAirliquidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrAirliquidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
