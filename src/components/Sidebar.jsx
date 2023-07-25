import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const Sidebar = ({openSidebar, showMenu, classMenu}) => {
    console.log('showmenu en  sidebar ', showMenu)
    return (
        <aside id="sidebar" className={`${!showMenu} ? ${classMenu} : "" `}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <span className="material-icons-outlined">public</span> magmCODE
                </div>
                <span onClick={() => {openSidebar()}} className="material-icons-outlined"
                
                >close</span>
            </div>

            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/">
                        <span className="material-icons-outlined">dashboard</span> Home
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/persons">
                        <span className="material-icons-outlined">people_outline</span> Persons
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <a href="#" target="_blank">
                        <span className="material-icons-outlined">category</span> Categories
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#" target="_blank">
                        <span className="material-icons-outlined">groups</span> Customers
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#" target="_blank">
                        <span className="material-icons-outlined">inventory</span> Inventory
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/reports">
                        <span className="material-icons-outlined">poll</span> Reports
                        </Link>
                </li>
                <li className="sidebar-list-item">
                    <a href="#" target="_blank">
                        <span className="material-icons-outlined">settings</span> Settings
                    </a>
                </li>
            </ul>
            <Outlet />
        </aside>
    )
}

export default Sidebar