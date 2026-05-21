import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BootScreen } from './components/BootScreen'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/Home'
import { ServicesPage, ServiceDetailPage } from './pages/Services'
import { PortfolioPage } from './pages/Portfolio'
import { ProfilePage } from './pages/Profile'
import { OrderPage } from './pages/Order'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <div className={`transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/services"       element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio"      element={<PortfolioPage />} />
          <Route path="/profile"        element={<ProfilePage />} />
          <Route path="/order"          element={<OrderPage />} />
        </Routes>

        <NavBar />
      </div>
    </>
  )
}
