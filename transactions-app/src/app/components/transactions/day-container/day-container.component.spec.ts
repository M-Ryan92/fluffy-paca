import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayContainerComponent } from './day-container.component';
import { CommonModule } from '@angular/common';

describe('DayContainerComponent', () => {
  let component: DayContainerComponent;
  let fixture: ComponentFixture<DayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DayContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
