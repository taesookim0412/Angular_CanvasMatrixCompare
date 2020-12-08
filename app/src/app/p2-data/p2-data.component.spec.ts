import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2DataComponent } from './p2-data.component';

describe('P2DataComponent', () => {
  let component: P2DataComponent;
  let fixture: ComponentFixture<P2DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
