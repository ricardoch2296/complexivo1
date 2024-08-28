import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsistenteComponent } from './crear-asistente.component';

describe('CrearAsistenteComponent', () => {
  let component: CrearAsistenteComponent;
  let fixture: ComponentFixture<CrearAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAsistenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
