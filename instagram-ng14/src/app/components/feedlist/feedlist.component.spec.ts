import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedlistComponent } from './feedlist.component';

describe('FeedlistComponent', () => {
  let component: FeedlistComponent;
  let fixture: ComponentFixture<FeedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
