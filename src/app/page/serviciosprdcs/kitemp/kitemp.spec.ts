import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kitemp } from './kitemp';

describe('Kitemp', () => {
  let component: Kitemp;
  let fixture: ComponentFixture<Kitemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kitemp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kitemp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
