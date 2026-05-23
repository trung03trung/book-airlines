import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FlightSearchForm from './components/FlightSearchForm'
import Services from './components/Services'
import News from './components/News'
import Promotions from './components/Promotions'
import Footer from './components/Footer'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  return (
    <div className="min-h-screen">
      <Header collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 60 : 200 }}
      >
        <Hero />
        <main>
          <FlightSearchForm />
          <Services />
          <News />
          <Promotions />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
