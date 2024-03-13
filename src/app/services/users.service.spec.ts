import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientModule} from "@angular/common/http";

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
  });

  it('Debería crear el servicio de los usuarios', () => {
    expect(service).toBeTruthy();
  });
});
