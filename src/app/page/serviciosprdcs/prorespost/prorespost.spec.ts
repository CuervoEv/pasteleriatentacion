import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prorespost } from './prorespost';

describe('Prorespost', () => {
  let component: Prorespost;
  let fixture: ComponentFixture<Prorespost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prorespost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prorespost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
