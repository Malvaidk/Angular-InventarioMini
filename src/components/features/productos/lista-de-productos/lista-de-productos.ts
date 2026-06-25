import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../../../app/service/producto-service';
import { Producto } from '../../../../model/producto';

@Component({
  selector: 'app-lista-de-productos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './lista-de-productos.html',
  styleUrl: './lista-de-productos.css',
})
export class ListaDeProductos implements OnInit {
  private productoService = inject(ProductoService);
  productos: Producto[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.mostrarProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }
}
