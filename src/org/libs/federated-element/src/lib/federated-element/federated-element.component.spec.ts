import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatedElementComponent } from './federated-element.component';

describe('FederatedElementComponent', () => {
  let component: FederatedElementComponent;
  let fixture: ComponentFixture<FederatedElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatedElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
