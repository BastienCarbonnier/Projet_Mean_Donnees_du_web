import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPropositionsMembreComponent } from './listes-propositions-membre.component';

describe('ListesPropositionsMembreComponent', () => {
  let component: ListesPropositionsMembreComponent;
  let fixture: ComponentFixture<ListesPropositionsMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesPropositionsMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesPropositionsMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
