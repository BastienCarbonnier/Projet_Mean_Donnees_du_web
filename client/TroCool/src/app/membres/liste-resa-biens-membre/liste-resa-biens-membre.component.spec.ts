import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResaBiensMembreComponent } from './liste-resa-biens-membre.component';

describe('ListeResaBiensMembreComponent', () => {
  let component: ListeResaBiensMembreComponent;
  let fixture: ComponentFixture<ListeResaBiensMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeResaBiensMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeResaBiensMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
