import PropTypes from 'prop-types'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { auth } from './firebase'
import AuthOptions from './AccountMenus/AuthOptions'
import AuthAccordion from './AccountMenus/AuthAccordion'

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      id="sidebar"
      className={`collapse collapse-horizontal ${isOpen ? 'show' : ''}`}
      style={{ width: '280px', minHeight: '100vh' }}
    >
      <div className="bg-dark text-white vh-100 p-3 d-flex flex-column">
        <h4 className="mb-4">Opcje</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">Wszystkie Zadania</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">Ważne</a>
          </li>
          <li className="nav-item">
            <AuthAccordion />
          </li>
        </ul>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100"
            onClick={onClose}
          >
            Ukryj
          </button>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Sidebar