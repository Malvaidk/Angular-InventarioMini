import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../../../app/service/producto-service';
import { Producto } from '../../../../model/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-de-productos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './lista-de-productos.html',
  styleUrl: './lista-de-productos.css',
})
export class ListaDeProductos implements OnInit {
  private productoService = inject(ProductoService);
  productos = signal<Producto[]>([]);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.mostrarProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
            this.cargarProductos();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          },
        });
      }
    });
  }
}
