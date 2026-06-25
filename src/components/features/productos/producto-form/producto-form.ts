import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../app/service/producto-service';
import { CategoriaService } from '../../../../app/service/categoria-service';
import { Producto } from '../../../../model/producto';
import { Categoria } from '../../../../model/categoria';

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

  producto: Producto = new Producto();
  categorias: Categoria[] = [];
  categoriaSeleccionada: number = 0;
  esEdicion: boolean = false;

  ngOnInit(): void {
    this.categoriaService.mostrarCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al cargar categorías:', err),
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== 0) {
      this.esEdicion = true;
      this.productoService.leerProducto(id).subscribe({
        next: (data) => {
          this.producto = data;
          this.categoriaSeleccionada = data.idCategoria?.idCategoria ?? 0;
        },
        error: (err) => console.error('Error al cargar producto:', err),
      });
    }
  }

  guardar(): void {
    this.producto.idCategoria = { idCategoria: this.categoriaSeleccionada };

    if (this.esEdicion) {
      this.productoService.actualizarProducto(this.producto.idProducto, this.producto).subscribe({
        next: () => this.router.navigate(['/listaProductos']),
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      this.productoService.crearProducto(this.producto).subscribe({
        next: () => this.router.navigate(['/listaProductos']),
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
