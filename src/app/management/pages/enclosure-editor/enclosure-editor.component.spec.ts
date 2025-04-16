import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureEditorComponent } from './enclosure-editor.component';

describe('EnclosureEditorComponent', () => {
  let component: EnclosureEditorComponent;
  let fixture: ComponentFixture<EnclosureEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnclosureEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnclosureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
