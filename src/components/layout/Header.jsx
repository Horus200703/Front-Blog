import logo from '../../assets/react.svg'

const Header = () => {
    return ( <div className="flex bg-gray-300 px-2 py-6 basis-full mb-1 shadow-2cs">
        <img src={logo} alt="Logo"  />
        <p className="text-3xl text-shadow-2xl">El Pulso del Futbol</p>
    </div> );
}
 
export default Header;