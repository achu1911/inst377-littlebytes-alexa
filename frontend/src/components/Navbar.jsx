import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-parisRose/30 shadow-md px-6 py-5 flex items-center justify-between border-b-4 border-parisLavender">

      {/* Logo */}
      <Link 
        to="/"
        className="text-3xl font-script text-parisWine hover:text-parisLavender transition duration-300"
      >
        LittleBytes 
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg font-cafe text-parisWine">
        <Link to="/" className="hover:text-parisLavender transition">Home</Link>
        <Link to="/about" className="hover:text-parisLavender transition">About</Link>
        <Link to="/recipes" className="hover:text-parisLavender transition">Recipes</Link>
        <Link 
          to="/favorites" 
          className="hover:text-parisLavender transition flex items-center gap-1"
        >
          Favorites
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-3xl text-parisWine"
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-20 right-6 bg-parisCream shadow-lg rounded-lg p-4 flex flex-col space-y-4 text-lg font-cafe text-parisWine border-l-4 border-parisLavender">
          
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link to="/recipes" onClick={() => setOpen(false)}>
            Recipes
          </Link>
          <Link 
            to="/favorites" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-1"
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
