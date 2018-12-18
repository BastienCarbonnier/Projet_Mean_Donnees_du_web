import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservationsMembreComponent } from './liste-reservations-membre.component';

describe('ListeReservationsMembreComponent', () => {
  let component: ListeReservationsMembreComponent;
  let fixture: ComponentFixture<ListeReservationsMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeReservationsMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReservationsMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
