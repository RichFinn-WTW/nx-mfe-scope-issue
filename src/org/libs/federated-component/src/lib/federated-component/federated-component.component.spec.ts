import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatedComponentComponent } from './federated-component.component';

describe('FederatedComponentComponent', () => {
  let component: FederatedComponentComponent;
  let fixture: ComponentFixture<FederatedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatedComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
