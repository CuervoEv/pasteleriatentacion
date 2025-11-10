import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personalizados } from './personalizados';

describe('Personalizados', () => {
  let component: Personalizados;
  let fixture: ComponentFixture<Personalizados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personalizados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Personalizados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
