import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import {NgChartsModule } from 'ng2-charts'; // Importa ChartsModule
import { DashboardCardComponent } from './dashboard-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

describe('DashboardCardComponent', () => {
  let component: DashboardCardComponent;
  let fixture: ComponentFixture<DashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCardComponent],
      imports: [
        MatIconModule,
        MatCardModule,
        NgChartsModule, // Añade ChartsModule a la lista de imports
        MatProgressSpinnerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
