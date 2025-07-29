import { useState } from 'react'
import './Carparks.css'

const Carparks = () => {
  const [carparks] = useState([
    {
      id: 1,
      name: 'Central Mall Parking',
      available: 45,
      total: 200,
      distance: 0.5,
      lat: -6.200000,
      lng: 106.816666
    },
    {
      id: 2,
      name: 'Office Complex A',
      available: 12,
      total: 150,
      distance: 1.2,
      lat: -6.195000,
      lng: 106.820000
    },
    {
      id: 3,
      name: 'Shopping District B',
      available: 78,
      total: 300,
      distance: 2.1,
      lat: -6.210000,
      lng: 106.815000
    }
  ])

  const [focusedCarpark, setFocusedCarpark] = useState(null)
  const [pinnedCarparks, setPinnedCarparks] = useState(
    JSON.parse(localStorage.getItem('pinnedCarparks') || '[]')
  )

  const togglePin = (carparkId) => {
    const newPinned = pinnedCarparks.includes(carparkId)
      ? pinnedCarparks.filter(id => id !== carparkId)
      : [...pinnedCarparks, carparkId]
    
    setPinnedCarparks(newPinned)
    localStorage.setItem('pinnedCarparks', JSON.stringify(newPinned))
  }

  if (focusedCarpark) {
    return (
      <div className="focused-carpark">
        <button 
          className="back-to-list"
          onClick={() => setFocusedCarpark(null)}
        >
          ← Back to List
        </button>
        <div className="focused-card">
          <h2>{focusedCarpark.name}</h2>
          <p className="distance">Distance: {focusedCarpark.distance} km</p>
          <p className="availability">
            Available: {focusedCarpark.available}/{focusedCarpark.total} spaces
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="carparks-page">
      <div className="carparks-list">
        {carparks.map((carpark) => (
          <div key={carpark.id} className="carpark-card">
            <div 
              className="carpark-content"
              onClick={() => setFocusedCarpark(carpark)}
            >
              <h3 className="carpark-name">{carpark.name}</h3>
              <p className="carpark-distance">{carpark.distance} km away</p>
              <div className="availability-info">
                <span className={`availability ${carpark.available > 20 ? 'good' : 'limited'}`}>
                  {carpark.available}/{carpark.total} available
                </span>
              </div>
            </div>
            <button
              className={`pin-btn ${pinnedCarparks.includes(carpark.id) ? 'pinned' : ''}`}
              onClick={() => togglePin(carpark.id)}
              aria-label={pinnedCarparks.includes(carpark.id) ? 'Unpin carpark' : 'Pin carpark'}
            >
              📌
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carparks