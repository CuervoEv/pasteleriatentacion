import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dulces } from './dulces';

describe('Dulces', () => {
  let component: Dulces;
  let fixture: ComponentFixture<Dulces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dulces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dulces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
