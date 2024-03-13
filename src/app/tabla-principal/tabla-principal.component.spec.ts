import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TablaPrincipalComponent } from './tabla-principal.component';
import { ParticipantesService } from '../services/participantes.service';
import { MailServiceService } from '../services/mail-service.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

describe('TablaPrincipalComponent', () => {
  let component: TablaPrincipalComponent;
  let fixture: ComponentFixture<TablaPrincipalComponent>;

  beforeEach(async () => {
    const participantesServiceMock = {
      listarParticipantes: () => of([]),
      cambiarEstadoParticipante: () => of({})
    };

    const mailServiceMock = {
      sendMail: () => of({})
    };

    const routerMock = {
      navigate: () => {}
    };

    const bottomSheetMock = {
      open: () => ({ afterDismissed: () => of({}) })
    };

    await TestBed.configureTestingModule({
      declarations: [TablaPrincipalComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        MatDialogModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ParticipantesService, useValue: participantesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'test' }) } },
        { provide: MailServiceService, useValue: mailServiceMock },
        { provide: MatBottomSheet, useValue: bottomSheetMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería llamar a listarParticipantes al inicializar', () => {
    const service = TestBed.inject(ParticipantesService);
    const spy = spyOn(service, 'listarParticipantes').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debería cambiar el estado de un participante a "rechazado" al llamar a rechazar()', () => {
    const participante: any = {
      codigo_participante: '123',
      nombres: 'Juan',
      apellidos: 'Pérez',
      cedula: 1234567890,
      email: 'juan.perez@example.com',
      telefono: 987654321,
      doi: 'DOI123',
      area: 'Tecnología',
      tema: 'Tema de prueba',
      participacion: 'Expositor',
      descuento: 'Sin descuento',
      totalAPagar: 100,
      fecha_registro: '2024-03-12',
      estado: true,
      estadoVisual: 'pendiente',
      superposicion: false,
    };

    spyOn(component['bottomSheet'], 'open').and.returnValue({
      afterDismissed: () => of({}),
    } as MatBottomSheetRef<unknown, unknown>);
    spyOn(component, 'enviarCorreoRechazo').and.stub();
    spyOn(localStorage, 'setItem').and.stub();

    component.rechazar(participante);

    expect(component.enviarCorreoRechazo).toHaveBeenCalledWith(participante, jasmine.any(String));
    expect(participante.estadoVisual).toBe('rechazado');
    expect(localStorage.setItem).toHaveBeenCalledWith(participante.codigo_participante, 'rechazado');
  });

  it('debería enviar un correo al rechazar un participante', () => {
    const participante: any = {
      codigo_participante: '123',
      nombres: 'Juan',
      apellidos: 'Pérez',
      cedula: 1234567890,
      email: 'bfcorro@espe.edu.ec',
      telefono: 987654321,
      doi: 'DOI123',
      area: 'Tecnología',
      tema: 'Tema de prueba',
      participacion: 'Expositor',
      descuento: 'Sin descuento',
      totalAPagar: 100,
      fecha_registro: '2024-03-12',
      estado: true,
      estadoVisual: 'pendiente',
      superposicion: false,
    };

    spyOn(component['mailService'], 'sendMail').and.returnValue(of({}));
    component.enviarCorreoRechazo(participante, 'Motivo de prueba');
    expect(component['mailService'].sendMail).toHaveBeenCalled();

  });
});
