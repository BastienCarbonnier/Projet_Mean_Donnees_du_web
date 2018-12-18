import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBiensMembreComponent } from './liste-biens-membre.component';

describe('ListeBiensMembreComponent', () => {
  let component: ListeBiensMembreComponent;
  let fixture: ComponentFixture<ListeBiensMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeBiensMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBiensMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
