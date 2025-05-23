import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const collapseRef = useRef();

  const navigation = [
    { name: 'Inicio', path: '/' },
    { name: 'Actividades', path: '/activities' },
    { name: 'Mis Reservas', path: '/bookings' },
  ];

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js'); // Asegura que JS de Bootstrap esté disponible
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            ActiReserva
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar" ref={collapseRef}>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {navigation.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link className="nav-link" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
