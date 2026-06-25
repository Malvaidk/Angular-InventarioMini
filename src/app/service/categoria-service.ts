import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categoria } from '../../model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly urlEndpoint = "http://localhost:8085/api/v1/categorias/categoria";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  mostrarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndpoint);
    }

  leerCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndpoint}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndpoint, categoria, { headers: this.httpHeaders });
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndpoint}/${categoria.idCategoria}`, categoria, { headers: this.httpHeaders });
  }

  eliminarCategoria(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders });
  }



  
  /*
  //Definir la URL del endpoint a trabajar
  private urlEndPoint: string = 'http://localhost:8085/api/v1/categorias';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  mostrarCategorias(): Observable<Categoria[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response: any) => response.content as Categoria[]));
  }

  leerCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria, { headers: this.httpHeaders });
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.idCategoria}`, categoria, { headers: this.httpHeaders });
  }

  eliminarCategoria(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }*/
}
