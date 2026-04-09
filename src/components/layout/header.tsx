import logo from '../../assets/react.svg'

const Header = () => {
  return <>
  <div className="flex bg-gray-300 text-black px-2 py-6 basis-full mb-1 shadow-2xs">
    <img src={logo} alt="Logo" />
    <p className="text-3xl text-shadow-2xs">El pulso del Futbol</p>

  </div>
  </>;
}

export default Header;