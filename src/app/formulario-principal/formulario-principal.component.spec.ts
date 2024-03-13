import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FormularioPrincipalComponent } from './formulario-principal.component';
import { MailServiceService } from '../services/mail-service.service';
import { ParticipantesService } from '../services/participantes.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatNativeDateModule } from "@angular/material/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('FormularioPrincipalComponent', () => {
  let component: FormularioPrincipalComponent;
  let fixture: ComponentFixture<FormularioPrincipalComponent>;

  beforeEach(async () => {
    const mailServiceMock = {
      sendMail: jasmine.createSpy('sendMail').and.returnValue(of({}))
    };

    const participantesServiceMock = {
      crearParticipante: jasmine.createSpy('crearParticipante').and.returnValue(of({}))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [FormularioPrincipalComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatChipsModule,
        MatButtonModule,
        MatNativeDateModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: MailServiceService, useValue: mailServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'testId' } } } },
        { provide: ParticipantesService, useValue: participantesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('debería abrir una barra de notificaciones en openSnackBar', () => {
    spyOn(component['snackBar'], 'open');
    component.openSnackBar('Mensaje de prueba');
    // Verificar si el método open fue llamado
    expect(component['snackBar'].open).toHaveBeenCalledWith('Mensaje de prueba', 'Cerrar', { duration: 10000 });
  });

  it('debería validar la cédula correctamente', () => {
    // Configurar el valor de cédula en un formato válido
    component.form.get('cedula')?.setValue('1753796091');
    // Verificar que el control sea válido después de ingresar un valor válido
    expect(component.form.get('cedula')?.valid).toBeTruthy();

    // Configurar el valor de cédula en un formato inválido
    component.form.get('cedula')?.setValue('123');
    // Verificar que el control sea inválido después de ingresar un valor inválido
    expect(component.form.get('cedula')?.valid).toBeFalsy();
  });

  it('debería realizar correctamente la lógica al seleccionar la participación', () => {
    // Configurar el valor de participación como 'Expositor'
    component.form.get('participacion')?.setValue('Expositor');
    // Verificar que los valores de descuento y totalAPagar sean los esperados
    expect(component.form.get('descuento')?.value).toBe(20);
    expect(component.form.get('totalAPagar')?.value).toBe(20);

    // Configurar el valor de participación como 'Asistente'
    component.form.get('participacion')?.setValue('Asistente');
    // Verificar que los valores de descuento y totalAPagar sean los esperados
    expect(component.form.get('descuento')?.value).toBe(10);
    expect(component.form.get('totalAPagar')?.value).toBe(13.5);

    // Configurar el valor de participación como 'Invitado'
    component.form.get('participacion')?.setValue('Invitado');
    // Verificar que los valores de descuento y totalAPagar sean los esperados
    expect(component.form.get('descuento')?.value).toBe(5);
    expect(component.form.get('totalAPagar')?.value).toBe(4.75);
  });

});
