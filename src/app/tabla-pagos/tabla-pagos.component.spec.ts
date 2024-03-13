import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TablaPagosComponent } from './tabla-pagos.component';
import { ParticipantePagoService } from '../services/participante-pago.service';
import { MailServiceService } from '../services/mail-service.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

describe('TablaPagosComponent', () => {
  let component: TablaPagosComponent;
  let fixture: ComponentFixture<TablaPagosComponent>;


  beforeEach(async () => {
    const participantePagoServiceMock = {
      listarParticipantePagosConParticipante: jasmine.createSpy('listarParticipantePagosConParticipante').and.returnValue(of([])),
      cambiarEstadoParticipantePago: jasmine.createSpy('cambiarEstadoParticipantePago').and.returnValue(of({}))
    };

    const mailServiceMock = {
      sendMail: jasmine.createSpy('sendMail').and.returnValue(of({}))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    const bottomSheetMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterDismissed: () => of({})
      })
    };

    await TestBed.configureTestingModule({
      declarations: [TablaPagosComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ParticipantePagoService, useValue: participantePagoServiceMock },
        { provide: MailServiceService, useValue: mailServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatBottomSheet, useValue: bottomSheetMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            snapshot: {
              paramMap: {
                get: () => 'test',
              },
            },
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a listarParticipantePagosConParticipante', () => {
    expect(component.dataSource).toEqual([]);
  });

  it('debería llamar al método rechazar', () => {
    const participante = {
      codigo_pago: 'codigo1',
      codigo_participante: 'participante1',
      nombres: 'Juan',
      apellidos: 'Perez',
      cedula: 1234567890,
      email: 'juan.perez@example.com',
      fecha_pago: '2022-01-01',
      direccion_pago: 'Calle Falsa 123',
      postal_pago: 12345,
      comprobante_pago: 'comprobante1',
      estado_pago: false,
      totalAPagar: 100,
      estadoVisual: 'pendiente' as 'pendiente' | 'aceptado' | 'rechazado',
      superposicion: false
    };

    spyOn(component, 'rechazar');
    component.rechazar(participante);
    expect(component.rechazar).toHaveBeenCalledWith(participante);
  });

  it('debería llamar al método enviarCorreoRechazo', () => {
    const participante = {
      codigo_pago: 'codigo1',
      codigo_participante: 'participante1',
      nombres: 'Juan',
      apellidos: 'Perez',
      cedula: 1234567890,
      email: 'juan.perez@example.com',
      fecha_pago: '2022-01-01',
      direccion_pago: 'Calle Falsa 123',
      postal_pago: 12345,
      comprobante_pago: 'comprobante1',
      estado_pago: false,
      totalAPagar: 100,
      estadoVisual: 'pendiente' as 'pendiente' | 'aceptado' | 'rechazado',
      superposicion: false
    };
    const motivo = 'Motivo de rechazo';

    spyOn(component, 'enviarCorreoRechazo');
    component.enviarCorreoRechazo(participante, motivo);
    expect(component.enviarCorreoRechazo).toHaveBeenCalledWith(participante, motivo);
  });

  it('debería llamar al método aceptar', () => {
  const participante = {
    codigo_pago: 'codigo1',
    codigo_participante: 'participante1',
    nombres: 'Juan',
    apellidos: 'Perez',
    cedula: 1234567890,
    email: 'juan.perez@example.com',
    fecha_pago: '2022-01-01',
    direccion_pago: 'Calle Falsa 123',
    postal_pago: 12345,
    comprobante_pago: 'comprobante1',
    estado_pago: false,
    totalAPagar: 100,
    estadoVisual: 'pendiente' as 'pendiente' | 'aceptado' | 'rechazado',
    superposicion: false
  };

  spyOn(component, 'aceptar');
  component.aceptar(participante);
  expect(component.aceptar).toHaveBeenCalledWith(participante);
});

  it('debería llamar al método enviarCorreoAceptacion', () => {
    const participante = {
      codigo_pago: 'codigo1',
      codigo_participante: 'participante1',
      nombres: 'Juan',
      apellidos: 'Perez',
      cedula: 1234567890,
      email: 'juan.perez@example.com',
      fecha_pago: '2022-01-01',
      direccion_pago: 'Calle Falsa 123',
      postal_pago: 12345,
      comprobante_pago: 'comprobante1',
      estado_pago: false,
      totalAPagar: 100,
      estadoVisual: 'pendiente' as 'pendiente' | 'aceptado' | 'rechazado',
      superposicion: false
    };

    spyOn(component, 'enviarCorreoAceptacion');
    component.enviarCorreoAceptacion(participante);
    expect(component.enviarCorreoAceptacion).toHaveBeenCalledWith(participante);
  } );

});
