import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Articulos from '../components/pages/Articulos';
import CrearArticulo from '../components/pages/CrearArticulo';
import Footer from '../components/layout/Footer';

const Rutas = () => {
  return (
  <>
<BrowserRouter>
 {/* Layout */}
 <Header />
 <Nav />

 {/* Contenido del Sitio */}
 <section className="flex flex-row flex-wrap h-lvh p-2">
  <article className="flex flex-wrap flex-col basis-3/4 p-2 rounded-2xl shadow-2xs">
    <Routes>
      <Route path="/" element={<Articulos/>} />
      <Route path="/articulos" element={<Articulos/>} />
      <Route path="/creararticulo" element={<CrearArticulo/>} />
    </Routes>
  </article>

  <Sidebar />
 </section>
 <Footer />
</BrowserRouter>

  </>
    );
}
export default Rutas;