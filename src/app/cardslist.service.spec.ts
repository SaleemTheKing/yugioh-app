import { TestBed } from '@angular/core/testing';

import { CardslistService } from './cardslist.service';

describe('CardslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardslistService = TestBed.get(CardslistService);
    expect(service).toBeTruthy();
  });
});
