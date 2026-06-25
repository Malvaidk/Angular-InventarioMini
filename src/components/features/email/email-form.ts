import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../../app/service/email-service';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css',
})
export class EmailForm {
  private emailService = inject(EmailService);
  private cdr = inject(ChangeDetectorRef);

  destinatariosTexto: string = ''; // correos separados por coma
  asunto: string = '';
  mensaje: string = '';
  respuesta: string = '';
  enviando: boolean = false;

  enviar(): void {
    const destinatarios = this.destinatariosTexto
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    if (destinatarios.length === 0 || !this.asunto || !this.mensaje) {
      this.respuesta = 'Completa todos los campos.';
      return;
    }

    this.enviando = true;
    const destinatariosString = destinatarios.join(', ');

    this.emailService.enviarCorreo(destinatariosString, this.asunto, this.mensaje).subscribe({
      next: (res) => {
        this.respuesta = res.mensaje || 'Correo enviado correctamente.';
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.respuesta = 'Error al enviar: El servidor no pudo enviar el correo o tardó demasiado.';
        this.enviando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
