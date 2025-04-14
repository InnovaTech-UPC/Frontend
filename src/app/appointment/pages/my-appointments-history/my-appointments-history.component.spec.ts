import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointmentsHistoryComponent } from './my-appointments-history.component';

describe('MyAppointmentsHistoryComponent', () => {
  let component: MyAppointmentsHistoryComponent;
  let fixture: ComponentFixture<MyAppointmentsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAppointmentsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAppointmentsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
