import { TestBed } from '@angular/core/testing';

import { MailServiceService } from './mail-service.service';
import {HttpClientModule} from "@angular/common/http";

describe('MailServiceService', () => {
  let service: MailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MailServiceService]
    });
    service = TestBed.inject(MailServiceService);
  });

  it('Debería crear el servicio de envío de correos', () => {
    expect(service).toBeTruthy();
  });
});
