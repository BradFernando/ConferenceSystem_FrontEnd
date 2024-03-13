import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../services/auth.service';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatProgressSpinnerModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserName: () => 'testuser',
            getUserRole: () => 'Admin'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
