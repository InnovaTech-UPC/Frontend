import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnclosureComponent } from './register-enclosure.component';

describe('RegisterEnclosureComponent', () => {
  let component: RegisterEnclosureComponent;
  let fixture: ComponentFixture<RegisterEnclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEnclosureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterEnclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
