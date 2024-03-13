import { TestBed } from '@angular/core/testing';

import { ParticipantePagoService } from './participante-pago.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ParticipantePagoService', () => {
  let service: ParticipantePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParticipantePagoService]
    });
    service = TestBed.inject(ParticipantePagoService);
  });

  it('Debería crear el servicio de participante pago', () => {
    expect(service).toBeTruthy();
  });
});
