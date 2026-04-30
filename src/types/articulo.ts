export interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen: string;
}

export interface ArticuloPayload {
  titulo: string;
  contenido: string;
  fecha: string;
  imagen: string;
}
