import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuelCalculatorPage } from './duel-calculator.page';

describe('Tab1Page', () => {
  let component: DuelCalculatorPage;
  let fixture: ComponentFixture<DuelCalculatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuelCalculatorPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuelCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
