import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigncrudComponent } from './signcrud.component';

describe('SigncrudComponent', () => {
  let component: SigncrudComponent;
  let fixture: ComponentFixture<SigncrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigncrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigncrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
