import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoaimComponent } from './whoaim.component';

describe('WhoaimComponent', () => {
  let component: WhoaimComponent;
  let fixture: ComponentFixture<WhoaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
