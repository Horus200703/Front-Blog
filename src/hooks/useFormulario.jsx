import { useState } from "react";

const useFormulario = (objetoDatos = {}) => {

    const [formulario, setFormulario] = useState(objetoDatos);

  const serializarDatos = (formulario) => {
    const formData = new FormData(formulario);

    const objetoDatos = {};
    for (let [name, value] of formData) {
        objetoDatos[name] = value;
    }

    return objetoDatos;
  }


  const obtenrDatos = (e) => {
    e.preventDefault();
    let datos=serializarDatos(e.target);
    setFormulario(datos);
  };

  const cambiado = ({target}) => {
    const {name, value} = target;
    setFormulario({
        ...formulario,
        [name]: value
    });
  };
    return [formulario, obtenrDatos, cambiado];
}
 
export default useFormulario;