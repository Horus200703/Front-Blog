import { useState, useEffect } from 'react';
interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen: string;
}


const Articulos = () => {



  //Logica del componente
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  //hook useEffect para cargar los articulos al montar el componente
  useEffect(() => { consumirApi }, []);

  async function consumirApi() {
    const url = 'https://localhost:3900/api/articulos/listararticulos';
    const peticion = await fetch(url, { method: 'GET' });
    const datos = await peticion.json();
    if (datos.status === 'success') {
      setArticulos(datos.articulos);
     // setArticulos([]);
    }
  }

  //Render de componente funcional
  return (
    <>
      {
        articulos.length>=1?(
          articulos.map((articulo) => {
        return (
          <div key={articulo.id} className="flex flex-col m-12">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUlIVJnic1e8T5ayvU2Z00inZCZAaAglWa1Q&s" alt="Sunset in the mountains" />
            <div className="flex flex-col rounded-full sm:flex-row border border-gray-300 py-1 px-1 w-full text-center sm:text-left shadow-2xs">
              <div className="flex flex-col py-6 pr-4">
                <div className="font-bold mb-4">{articulo.titulo}</div>
                <p className="text-sm font-hairline">{articulo.contenido}</p>
                <br />
                <p className="text-gray-500 text-sm">{articulo.fecha.slice(0, 10)}</p>
                <br />
                <a
                  target='_blank'
                  href="https://bootsnipp.com/muhittinbudak"
                  className="text-blue-500 text-sm font-hairline hover:underline">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        );
      })
    ):<h1>No hay articulos disponibles</h1>
  }

      
      
      
      
      
      
      
      
      
      
      
      
    </>
  );
};


export default Articulos;