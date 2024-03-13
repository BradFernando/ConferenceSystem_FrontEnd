import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarBottomPagoComponentComponent } from './rechazar-bottom-pago-component.component';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";

describe('RechazarBottomPagoComponentComponent', () => {
  let component: RechazarBottomPagoComponentComponent;
  let fixture: ComponentFixture<RechazarBottomPagoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechazarBottomPagoComponentComponent],
      imports: [
        MatCheckboxModule,
        MatDividerModule,
        FormsModule
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: {} } // Añade esta línea
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RechazarBottomPagoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el botón de rechazar pago', () => {
    expect(component).toBeTruthy();
  });
});
