import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogComponent } from './image-dialog-component.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

describe('ImageDialogComponentComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ImageDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
