import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hojaldres } from './hojaldres';

describe('Hojaldres', () => {
  let component: Hojaldres;
  let fixture: ComponentFixture<Hojaldres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hojaldres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hojaldres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
