
const Header = ({openSidebar, showMenu}) => {
  console.log('showmenu en  header ', showMenu)
  return (
    <div className="header">
    <div className="menu-icon" onClick={() => {openSidebar()}}> 
      <span className="material-icons-outlined">menu</span>
    </div>
    
    <div className="header-left"> {/* OJO */}
      <span className="material-icons-outlined">search</span>
    </div>
    <div className="header-right"> {/* OJO */}
      <span className="material-icons-outlined">notifications</span>
      <span className="material-icons-outlined">email</span>
      <span className="material-icons-outlined">account_circle</span>
    </div>
  </div>
  )
}

export default Header