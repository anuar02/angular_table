import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideComponent } from './hide.component';

describe('HideComponent', () => {
  let component: HideComponent;
  let fixture: ComponentFixture<HideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
