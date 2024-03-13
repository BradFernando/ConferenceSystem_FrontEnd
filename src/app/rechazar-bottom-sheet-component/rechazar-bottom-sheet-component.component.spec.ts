import { ComponentFixture, TestBed } from '@angular/core/testing';

// En rechazar-bottom-sheet-component.component.spec.ts
import { RechazarBottomSheetComponent } from './rechazar-bottom-sheet-component.component';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

describe('RechazarBottomSheetComponentComponent', () => {
  let component: RechazarBottomSheetComponent;
  let fixture: ComponentFixture<RechazarBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechazarBottomSheetComponent],
      imports: [
        MatDividerModule,
        MatCheckboxModule,
        FormsModule
      ],
      providers: [
        {provide: MatBottomSheetRef, useValue: {} }
      ],
    });
    fixture = TestBed.createComponent(RechazarBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear las opciones del motivo del rechazo de solicitudes', () => {
    expect(component).toBeTruthy();
  });
});
