export class Producto {
  idProducto: number = 0;
  nombreProducto: string = '';
  precioProducto: number = 0;
  existencia: number = 0;
  descripcionProducto: string = '';
  createAt: string | null = null;
  idCategoria: { idCategoria: number } | null = null;
}
