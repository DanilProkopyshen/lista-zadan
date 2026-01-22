import PropTypes from 'prop-types';

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      id="sidebar"
      className={`collapse collapse-horizontal ${isOpen ? 'show' : ''}`}
      style={{ width: '280px', minHeight: '100vh' }}
    >
      <div className="bg-dark text-white vh-100 p-3 d-flex flex-column">
        <h4 className="mb-4">jkwdknwq</h4>


        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">Wszystkie Zadania</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">Ważne</a>
          </li>
          <li className="nav-item">
            
          </li>
        </ul>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100"
            onClick={onClose}
          >
            Hide Sidebar
          </button>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;