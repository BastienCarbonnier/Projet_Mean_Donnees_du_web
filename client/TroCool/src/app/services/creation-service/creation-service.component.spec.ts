import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationServiceComponent } from './creation-service.component';

describe('CreationServiceComponent', () => {
  let component: CreationServiceComponent;
  let fixture: ComponentFixture<CreationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
