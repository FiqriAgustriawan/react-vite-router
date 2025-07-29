import { useState, useEffect } from 'react'
import './Weather.css'

const Weather = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)

  // Generate 7 days weather data starting from today
  const generateWeatherData = () => {
    const today = new Date()
    const data = []
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy']
    const conditionNames = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy']
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const randomCondition = Math.floor(Math.random() * conditions.length)
      const baseTemp = 15 + Math.floor(Math.random() * 15) // 15-30°C base
      const tempRange = Math.floor(Math.random() * 8) + 3 // 3-10°C range
      
      data.push({
        id: i + 1,
        date: date.toISOString().split('T')[0],
        temp: `${baseTemp}-${baseTemp + tempRange}°C`,
        condition: conditionNames[randomCondition],
        icon: conditions[randomCondition]
      })
    }
    
    return data
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setWeatherData(generateWeatherData())
      setLoading(false)
    }, 500)
  }, [])

  const WeatherIcon = ({ type }) => {
    const iconStyle = {
      stroke: '#1c3e60',
      strokeWidth: 1,
      fill: 'none',
      width: '60px',
      height: '60px'
    }

    const sunPaths = (
      <>
        <circle cx="30" cy="30" r="8" />
        <path d="M30 6v4M30 50v4M6 30h4M50 30h4M11.5 11.5l2.8 2.8M45.7 45.7l2.8 2.8M11.5 48.5l2.8-2.8M45.7 14.3l2.8-2.8" />
      </>
    )

    const cloudPath = <path d="M46 24c0-8.8-7.2-16-16-16s-16 7.2-16 16c-4.4 0-8 3.6-8 8s3.6 8 8 8h30c3.3 0 6-2.7 6-6s-2.7-6-6-6z" />

    const rainPaths = (
      <>
        {cloudPath}
        <path d="M20 42v8M24 44v6M28 42v8M32 44v6M36 42v8" />
      </>
    )

    switch(type) {
      case 'sunny':
        return <svg style={iconStyle} className="weather-icon">{sunPaths}</svg>
      case 'cloudy':
        return <svg style={iconStyle} className="weather-icon">{cloudPath}</svg>
      case 'rainy':
        return <svg style={iconStyle} className="weather-icon">{rainPaths}</svg>
      case 'partly-cloudy':
        return (
          <svg style={iconStyle} className="weather-icon">
            <circle cx="25" cy="25" r="6" />
            <path d="M25 8v3M25 40v3M8 25h3M40 25h3M14 14l2 2M34 34l2 2M14 36l2-2M34 16l2-2" />
            <path d="M40 20c0-6-4.5-10-10-10s-10 4-10 10c-3 0-5.5 2.5-5.5 5.5S17 31 20 31h18c2.2 0 4-1.8 4-4s-1.8-4-4-4z" />
          </svg>
        )
      default:
        return <svg style={iconStyle} className="weather-icon">{sunPaths}</svg>
    }
  }

  const getDayLabel = (dateStr, index) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    if (index === 0) {
      return 'Today'
    } else if (index === 1) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    }
  }

  if (loading) {
    return (
      <div className="weather-page">
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather forecast...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-page">
      <div className="weather-header">
        <h2>7-Day Weather Forecast</h2>
        <p>Scroll horizontally to see more days</p>
      </div>
      
      <div className="weather-scroll-container">
        {weatherData.map((day, index) => (
          <div key={day.id} className="weather-day">
            <div className="weather-date">
              {getDayLabel(day.date, index)}
            </div>
            <div className="weather-date-full">
              {new Date(day.date).toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="weather-icon-container">
              <WeatherIcon type={day.icon} />
            </div>
            <div className="weather-temp">{day.temp}</div>
            <div className="weather-condition">{day.condition}</div>
          </div>
        ))}
      </div>
      
      <div className="weather-scroll-indicators">
        {weatherData.map((_, index) => (
          <div 
            key={index} 
            className={`scroll-indicator ${index === 0 ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Weather