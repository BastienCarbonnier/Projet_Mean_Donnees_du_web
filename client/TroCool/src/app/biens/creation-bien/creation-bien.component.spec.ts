import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationBienComponent } from './creation-bien.component';

describe('CreationBienComponent', () => {
  let component: CreationBienComponent;
  let fixture: ComponentFixture<CreationBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
