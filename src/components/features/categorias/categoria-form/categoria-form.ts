import { Component, OnInit, signal, inject } from '@angular/core';
import { Categoria } from '../../../../model/categoria';
import { CategoriaService } from '../../../../app/service/categoria-service';
import { Router } from '@angular/router';
import { input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  imports: [FormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit {
  readonly titulo: string = 'Categorias Form';
  laCategoria = signal<Categoria>(new Categoria());
  id = input<number>();
  private router = inject(Router);
  private service = inject(CategoriaService);

  ngOnInit(): void {
    this.cargarCategoriaExistente();
  }
  private cargarCategoriaExistente(): void {
    const elId = this.id();
    if (elId) {
      this.service.leerCategoria(elId).subscribe({
        next: (lc) => {
          this.laCategoria.set(lc);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  registrarCategoria(): void {
    this.service.crearCategoria(this.laCategoria()).subscribe({
      next: (lc) => {
        this.router.navigate(['/listaDeCategoria']);
        Swal.fire({
          title: 'Registrar Categoria',
          text: `La categoria ${lc.nombreCategoria} ha sido registrada correctamente!`,
          icon: 'info',
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  actualizarCategoria(): void {
    this.service.actualizarCategoria(this.laCategoria()).subscribe({
      next: (lc) => {
        this.router.navigate(['/listaDeCategoria']);
        Swal.fire({
          title: ' Actualizar Categoria',
          text: `La categoria ${lc.nombreCategoria} ha sido actualizada correctamente!`,
          icon: 'info',
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
