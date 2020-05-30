import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtcComponent } from './utc.component';

describe('UtcComponent', () => {
  let component: UtcComponent;
  let fixture: ComponentFixture<UtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
