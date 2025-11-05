import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productsya } from './productsya';

describe('Productsya', () => {
  let component: Productsya;
  let fixture: ComponentFixture<Productsya>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productsya]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productsya);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
