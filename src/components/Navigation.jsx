import './Navigation.css'

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'carparks', label: 'Carparks', icon: '🅿️' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation