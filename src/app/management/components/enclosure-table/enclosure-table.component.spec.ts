import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureTableComponent } from './enclosure-table.component';

describe('EnclosureTableComponent', () => {
  let component: EnclosureTableComponent;
  let fixture: ComponentFixture<EnclosureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnclosureTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnclosureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
