import { Routes, Route, BrowserRouter } from "react-router-dom";
import Nav from "../components/layout/Nav";
import Header from "../components/layout/Header";
import Articulos from "../components/pages/Articulos";
import CrearArticulo from "../components/pages/CrearArticulo";
import EditarArticulo from "../components/pages/EditarArticulo";
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";

const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Nav />
        <section className="flex flex-row flex-wrap p-2 h-lvh">
          <article className="flex flex-wrap flex-col basis-3/4">
            <Routes>
              <Route path="/" element={<Articulos />}> </Route>
              <Route path="/articulos" element={<Articulos />}> </Route>
              <Route path="/crear-articulo" element={<CrearArticulo />}> </Route>
              <Route path="/editar-articulo/:id" element={<EditarArticulo />}> </Route>
            </Routes>
          </article>

            <SideBar />
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Rutas;
