import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuelScreenPage } from './duel-screen.page';

describe('DuelScreenPage', () => {
  let component: DuelScreenPage;
  let fixture: ComponentFixture<DuelScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuelScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
