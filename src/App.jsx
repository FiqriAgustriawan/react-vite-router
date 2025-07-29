import { useState } from 'react'
import './App.css'

// Components
import Header from './components/Header'
import Navigation from './components/Navigation'
import Events from './pages/Events'
import Carparks from './pages/Carparks'
import Weather from './pages/Weather'
import Settings from './pages/Settings'

function App() {
  const [activeTab, setActiveTab] = useState('events')

  const getPageTitle = () => {
    switch(activeTab) {
      case 'events': return 'Company Events'
      case 'carparks': return 'Carparks'
      case 'weather': return 'Weather Forecast'
      case 'settings': return 'Settings'
      default: return 'PWA App'
    }
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'events': return <Events />
      case 'carparks': return <Carparks />
      case 'weather': return <Weather />
      case 'settings': return <Settings />
      default: return <Events />
    }
  }

  return (
    <div className="app">
      <Header title={getPageTitle()} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
