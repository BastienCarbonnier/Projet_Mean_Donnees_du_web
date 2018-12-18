import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResaServicesMembreComponent } from './liste-resa-services-membre.component';

describe('ListeResaServicesMembreComponent', () => {
  let component: ListeResaServicesMembreComponent;
  let fixture: ComponentFixture<ListeResaServicesMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeResaServicesMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeResaServicesMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
