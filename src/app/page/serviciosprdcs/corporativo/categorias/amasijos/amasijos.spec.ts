import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Amasijos } from './amasijos';

describe('Amasijos', () => {
  let component: Amasijos;
  let fixture: ComponentFixture<Amasijos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Amasijos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Amasijos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
