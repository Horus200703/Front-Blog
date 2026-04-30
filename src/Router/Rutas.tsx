import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Nav from '../components/layout/Navbar';
import Sidebar from '../components/layout/sidebar';
import Articulos from '../components/pages/Articulos';
import CrearArticulo from '../components/pages/CrearArticulo';
import Footer from '../components/layout/footer';

const Rutas = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f4f5f7] text-gray-900">
        <Nav />

        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <main className="min-w-0">
              <Routes>
                <Route path="/" element={<Articulos />} />
                <Route path="/articulos" element={<Articulos />} />
                <Route path="/creararticulo" element={<CrearArticulo />} />
              </Routes>
            </main>

            <Sidebar />
          </div>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Rutas;

