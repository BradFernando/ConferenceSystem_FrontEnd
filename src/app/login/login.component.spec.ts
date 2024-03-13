import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({}))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a AuthService.login cuando se envía el formulario', () => {
    authService.login = jasmine.createSpy('login').and.returnValue(of({}));
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpass');
    component.onSubmit(new Event('click'));
    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('debería navegar al tablero cuando el inicio de sesión es exitoso', () => {
    authService.login = jasmine.createSpy('login').and.returnValue(of({}));
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpass');
    component.onSubmit(new Event('click'));
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('debería establecer loginFailed en verdadero cuando el inicio de sesión no es exitoso', () => {
    authService.login = jasmine.createSpy('login').and.returnValue(of(null));
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpass');
    component.onSubmit(new Event('click'));
    expect(component.loginFailed).toBeTrue();
  });
});
