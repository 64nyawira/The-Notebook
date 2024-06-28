import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormnavbarComponent } from './formnavbar.component';

describe('FormnavbarComponent', () => {
  let component: FormnavbarComponent;
  let fixture: ComponentFixture<FormnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormnavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
