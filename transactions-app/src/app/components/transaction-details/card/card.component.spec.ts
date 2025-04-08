import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  template: `
    <card>
      <div>Test Content</div>
    </card>
  `,
  standalone: true,
  imports: [CardComponent],
})
class TestHostComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TestHostComponent, NgIf],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when provided', () => {
    const testLabel = 'Test Label';
    component.label = testLabel;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.card-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent).toContain(testLabel);
  });

  it('should not display label when undefined', () => {
    component.label = undefined;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.card-label');
    expect(labelElement).toBeFalsy();
  });

  it('should render content via ng-content', () => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const contentElement =
      hostFixture.nativeElement.querySelector('.card-content');
    expect(contentElement).toBeTruthy();

    const projectedContent = contentElement.querySelector('div');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toContain('Test Content');
  });
});
