import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { useState } from 'react'
import { ToastContainer} from 'react-toastify'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import MainBody from './MainBody/MainBody'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <>
      <div className="container-fluid vh-100 p-0">
        <div className="row flex-nowrap h-100 g-0">
          <div className="col-auto p-0">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>

          <div className="col p-0 d-flex flex-column">
            <Navbar
              isSidebarOpen={sidebarOpen}
              onToggleSidebar={toggleSidebar}
            />
            <MainBody />
          </div>
        </div>
      </div>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        pauseOnHover 
        draggable
      />
    </>
  )
}

export default App