import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreListPage } from './score-list.page';

describe('ScoreListPage', () => {
  let component: ScoreListPage;
  let fixture: ComponentFixture<ScoreListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
