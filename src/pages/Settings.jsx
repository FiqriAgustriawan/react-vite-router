import { useState, useEffect } from 'react'
import './Settings.css'

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system')
  const [sortBy, setSortBy] = useState(localStorage.getItem('carparkSort') || 'alphabet')

  useEffect(() => {
    // Apply theme
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else if (theme === 'light') {
      root.removeAttribute('data-theme')
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.setAttribute('data-theme', 'dark')
      } else {
        root.removeAttribute('data-theme')
      }
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('carparkSort', sortBy)
  }, [sortBy])

  return (
    <div className="settings-page">
      <div className="settings-section">
        <h2 className="section-title">Appearance</h2>
        <div className="setting-item">
          <label className="setting-label">Theme</label>
          <div className="theme-options">
            <label className="radio-option">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
              />
              Light
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
              />
              Dark
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="theme"
                value="system"
                checked={theme === 'system'}
                onChange={(e) => setTheme(e.target.value)}
              />
              System
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Carpark Settings</h2>
        <div className="setting-item">
          <label className="setting-label">Sort carparks by</label>
          <div className="toggle-container">
            <label className="toggle-option">
              <input
                type="radio"
                name="sort"
                value="alphabet"
                checked={sortBy === 'alphabet'}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Alphabetical
            </label>
            <label className="toggle-option">
              <input
                type="radio"
                name="sort"
                value="distance"
                checked={sortBy === 'distance'}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Distance
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">About</h2>
        <div className="about-info">
          <p>Company Events PWA</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default Settings