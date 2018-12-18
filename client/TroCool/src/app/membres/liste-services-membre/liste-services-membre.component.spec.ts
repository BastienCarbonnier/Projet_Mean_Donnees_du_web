import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeServicesMembreComponent } from './liste-services-membre.component';

describe('ListeServicesMembreComponent', () => {
  let component: ListeServicesMembreComponent;
  let fixture: ComponentFixture<ListeServicesMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeServicesMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeServicesMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
