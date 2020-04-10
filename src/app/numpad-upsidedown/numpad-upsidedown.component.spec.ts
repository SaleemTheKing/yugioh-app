import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumpadUpsidedownComponent } from './numpad-upsidedown.component';

describe('NumpadUpsidedownComponent', () => {
  let component: NumpadUpsidedownComponent;
  let fixture: ComponentFixture<NumpadUpsidedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumpadUpsidedownComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumpadUpsidedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
