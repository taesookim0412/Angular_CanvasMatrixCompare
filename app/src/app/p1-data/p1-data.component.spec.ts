import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P1DataComponent } from './p1-data.component';

describe('P1DataComponent', () => {
  let component: P1DataComponent;
  let fixture: ComponentFixture<P1DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P1DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P1DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
