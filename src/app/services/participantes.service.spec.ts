import { TestBed } from '@angular/core/testing';

import { ParticipantesService } from './participantes.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ParticipantesService', () => {
  let service: ParticipantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParticipantesService]
    });
    service = TestBed.inject(ParticipantesService);
  });

  it('Debería crear el servicio de los participantes', () => {
    expect(service).toBeTruthy();
  });
});
