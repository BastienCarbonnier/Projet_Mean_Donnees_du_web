import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBiensComponent } from './liste-biens.component';

describe('ListeBiensComponent', () => {
  let component: ListeBiensComponent;
  let fixture: ComponentFixture<ListesBiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeBiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
