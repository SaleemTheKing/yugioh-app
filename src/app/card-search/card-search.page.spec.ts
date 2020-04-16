import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CardSearchPage } from './tab2.page';

describe('Tab2Page', () => {
  let component: CardSearchPage;
  let fixture: ComponentFixture<CardSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardSearchPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
