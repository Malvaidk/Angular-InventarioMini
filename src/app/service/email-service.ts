import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private http = inject(HttpClient);
  private readonly urlEndpoint = 'https://inventariomini4bm2-dhd0.onrender.com/api/v1/mail/send';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  enviarCorreo(destinatarios: string, asunto: string, mensaje: string): Observable<any> {
    const body = {
      to: destinatarios,
      subject: asunto,
      message: mensaje,
    };
    return this.http.post(this.urlEndpoint, body, { headers: this.httpHeaders });
  }
}
