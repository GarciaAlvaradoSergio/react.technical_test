import { Outlet } from 'react-router-dom'
import Header from './Header'


const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
        {children}
      </main>
      
    </div>
  )
}

export default Layout