import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FormularioPagoComponent } from './formulario-pago.component';
import { ParticipantePagoService } from '../services/participante-pago.service';
import { ParticipantesService } from '../services/participantes.service';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatNativeDateModule} from "@angular/material/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FormularioPagoComponent', () => {
  let component: FormularioPagoComponent;
  let fixture: ComponentFixture<FormularioPagoComponent>;


  beforeEach(async () => {
    const participantePagoServiceMock = {
      buscarParticipantePago: jasmine.createSpy('buscarParticipantePago').and.returnValue(of({})),
      actualizarParticipantePago: jasmine.createSpy('actualizarParticipantePago').and.returnValue(of({})),
      crearParticipantePago: jasmine.createSpy('crearParticipantePago').and.returnValue(of({}))
    };

    const participantesServiceMock = {
      buscarParticipante: jasmine.createSpy('buscarParticipante').and.returnValue(of({}))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [FormularioPagoComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDividerModule,
        MatNativeDateModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test' } } } },
        { provide: Router, useValue: routerMock },
        { provide: ParticipantePagoService, useValue: participantePagoServiceMock },
        { provide: ParticipantesService, useValue: participantesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    component.ngOnInit();
    const formPay = component.formPay;

    expect(formPay).toBeDefined();
    expect(formPay?.get('fecha_pago')).toBeDefined();
    expect(formPay?.get('direccion_pago')).toBeDefined();
    expect(formPay?.get('postal_pago')).toBeDefined();
    expect(formPay?.get('comprobante_pago')).toBeDefined();
  });

  it('debería validar la fecha de pago correctamente', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    component.formPay.get('fecha_pago')?.setValue(futureDate);
    expect(component.formPay.get('fecha_pago')?.valid).toBeTruthy();

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    component.formPay.get('fecha_pago')?.setValue(pastDate);
    expect(component.formPay.get('fecha_pago')?.valid).toBeFalsy();
  });

  it('debería manejar la selección de archivos correctamente', () => {
    const file = new File([''], 'filename', { type: 'image/jpeg' });
    const event = { target: { files: [file] } };
    component.onFileSelect(event);
    expect(component.selectedFile).toEqual(file);
  });

});
