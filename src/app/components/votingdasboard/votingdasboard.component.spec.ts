import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingdasboardComponent } from './votingdasboard.component';

describe('VotingdasboardComponent', () => {
  let component: VotingdasboardComponent;
  let fixture: ComponentFixture<VotingdasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingdasboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingdasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
