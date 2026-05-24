import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import FlightSearchForm from './components/FlightSearchForm'
import Services from './components/Services'
import News from './components/News'
import Promotions from './components/Promotions'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import FlightResultsPage from './components/FlightResultsPage'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div
          className="transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? 60 : 200 }}
        >
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <main>
                  <FlightSearchForm />
                  <Services />
                  <News />
                  <Promotions />
                </main>
              </>
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/flights" element={<FlightResultsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
