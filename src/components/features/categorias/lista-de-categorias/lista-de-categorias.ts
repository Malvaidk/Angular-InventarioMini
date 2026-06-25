import { Component, OnInit, inject } from '@angular/core';
import { Categoria } from '../../../../model/categoria';
import { CategoriaService } from '../../../../app/service/categoria-service';
import { signal } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-categorias',
  imports: [],
  templateUrl: './lista-de-categorias.html',
  styleUrl: './lista-de-categorias.css',
})
export class ListaDeCategorias implements OnInit {
  readonly titulo = 'Categoria de productos';
  listaDeCategorias = signal<Categoria[]>([]);
  private service = inject(CategoriaService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.service.mostrarCategorias().subscribe({
      next: (lasCategorias) => {
        this.listaDeCategorias.set(lasCategorias);
        console.log('Categorias cargadas', lasCategorias);
      },
      error: (err) => {
        console.error('Ocurrio un error al obtener las categorias ', err);
      },
    });
  }

  actualizarCategoria(categoria: Categoria): void {
    console.log('Navegando a formulario para actualizar categoria', categoria);
    this.router.navigate(['/categoriaForm', categoria.idCategoria]);
  }

  eliminarCategoria(categoria: Categoria): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la categoria ${categoria.nombreCategoria}?`,
      text: 'No será posible revertir la eliminación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed)
        this.service.eliminarCategoria(categoria.idCategoria).subscribe({
          next: () => {
            this.cargarCategorias();
            Swal.fire({
              title: 'Eliminar Categoria!',
              text: 'La categoria ha sido eliminada correctamente!',
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Ocurrio un error al eliminar la categoria ', err);
          },
        });
    });
  }

  /*titulo: string = 'Categorias de Productos';
  listaDeCategorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.mostrarCategorias().subscribe({
      next: (lasCategorias) => {
        this.listaDeCategorias = lasCategorias;
      },
      error: (err) => {
        console.error('Ocurrio un error al obtener las categorias ', err);
      },
    });
  }*/
}
