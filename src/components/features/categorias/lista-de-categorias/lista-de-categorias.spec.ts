import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeCategorias } from './lista-de-categorias';

describe('ListaDeCategorias', () => {
  let component: ListaDeCategorias;
  let fixture: ComponentFixture<ListaDeCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeCategorias],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDeCategorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
