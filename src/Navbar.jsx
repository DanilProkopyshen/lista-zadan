import PropTypes from 'prop-types';

function Navbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Toggle button – only shown when sidebar is closed */}
        {!isSidebarOpen && (
          <button
            className="btn btn-outline-light me-3"
            type="button"
            onClick={onToggleSidebar}
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar"
          >
            ☰ Menu
          </button>
        )}

        <a className="navbar-brand" href="#">
          Todo App
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;