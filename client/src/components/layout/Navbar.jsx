import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/landing">
          Art Gallery
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobile-nav"
          aria-controls="mobile-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="profiles">
                {' '}
                {/* Add content here if needed */}
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
