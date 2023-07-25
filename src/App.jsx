import Normalize from 'react-normalize';
import {useState} from 'react'
import './assets/css/App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Persons from './components/Persons';
import Reports from './components/Reports';


function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [classMenu, setClassMenu] = useState('')


  function openSidebar() {
    if (!showMenu) {
      setClassMenu('sidebar-responsive');
      setShowMenu(!showMenu);
    } else {
      setClassMenu('');
      setShowMenu(!showMenu);
    }
  }
    console.log('showmenu en  app ', showMenu)

  return (
    <div>
      <Normalize />
      <div className="grid-container">
        <Header openSidebar={openSidebar} showMenu={showMenu}/>
        <Routes>
            <Route path="/" element={<Sidebar openSidebar={openSidebar} showMenu={showMenu} classMenu={classMenu}/>} />
            <Route path="persons" element={<Persons />} />
            <Route path="reports" element={<Reports />} />
        </Routes>
        <Sidebar openSidebar={openSidebar} showMenu={showMenu} classMenu={classMenu}/>
      </div>
    </div>
  )
}

export default App
