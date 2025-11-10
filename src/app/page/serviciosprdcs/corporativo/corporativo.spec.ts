import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Corporativo } from './corporativo';

describe('Corporativo', () => {
  let component: Corporativo;
  let fixture: ComponentFixture<Corporativo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corporativo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Corporativo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
