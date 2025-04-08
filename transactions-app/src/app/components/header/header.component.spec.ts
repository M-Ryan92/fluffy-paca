import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        RouterTestingModule,
        HeaderComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.header-title');
    expect(titleElement.textContent).toContain(testTitle);
  });

  it('should toggle menu when toggleMenu is called', () => {
    expect(component.isMenuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should close menu when closeMenu is called', () => {
    component.isMenuOpen = true;
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should show navigation items when showNav is true', () => {
    component.showNav = true;
    fixture.detectChanges();
    const navSection = fixture.nativeElement.querySelector('.nav-section');
    expect(navSection).toBeTruthy();
  });

  it('should hide navigation items when showNav is false', () => {
    component.showNav = false;
    fixture.detectChanges();
    const navSection = fixture.nativeElement.querySelector('.nav-section');
    expect(navSection).toBeFalsy();
  });

  it('should render correct number of navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(component.navItems.length);
  });
});
