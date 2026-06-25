import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../app/service/producto-service';
import { CategoriaService } from '../../../../app/service/categoria-service';
import { Producto } from '../../../../model/producto';
import { Categoria } from '../../../../model/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoForm implements OnInit {
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  producto: Producto = new Producto();
  categorias: Categoria[] = [];
  categoriaSeleccionada: number = 0;
  esEdicion: boolean = false;

  ngOnInit(): void {
    this.categoriaService.mostrarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar categorías:', err),
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== 0) {
      this.esEdicion = true;
      this.productoService.leerProducto(id).subscribe({
        next: (data) => {
          this.producto = data;
          this.categoriaSeleccionada = data.idCategoria?.idCategoria ?? 0;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar producto:', err),
      });
    }
  }

  guardar(): void {
    if (!this.categoriaSeleccionada || Number(this.categoriaSeleccionada) === 0) {
      Swal.fire('Atención', 'Por favor, selecciona una categoría válida antes de guardar.', 'warning');
      return;
    }

    this.producto.idCategoria = { idCategoria: Number(this.categoriaSeleccionada) };

    if (this.esEdicion) {
      this.productoService.actualizarProducto(this.producto.idProducto, this.producto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto actualizado exitosamente.', 'success').then(() => {
            this.router.navigate(['/listaProductos']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          Swal.fire('Error', 'Error al actualizar el producto.', 'error');
        },
      });
    } else {
      this.productoService.crearProducto(this.producto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto guardado exitosamente.', 'success').then(() => {
            this.router.navigate(['/listaProductos']);
          });
        },
        error: (err) => {
          console.error('Error al crear:', err);
          Swal.fire('Error', 'Error al guardar el producto.', 'error');
        },
      });
    }
  }
}
