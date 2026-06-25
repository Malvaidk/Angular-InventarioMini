import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../model/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private readonly urlEndpoint = 'https://inventariomini4bm2-dhd0.onrender.com/api/v1/productos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  mostrarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndpoint);
  }

  leerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndpoint}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndpoint, producto, { headers: this.httpHeaders });
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndpoint}/${id}`, producto, {
      headers: this.httpHeaders,
    });
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders });
  }
}
