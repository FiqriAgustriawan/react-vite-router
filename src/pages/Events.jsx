import { useState } from 'react'
import './Events.css'

const Events = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Company Meeting',
      date: '2024-12-15',
      image: 'https://via.placeholder.com/300x200?text=Event+1'
    },
    {
      id: 2,
      title: 'Team Building Workshop',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/300x200?text=Event+2'
    },
    {
      id: 3,
      title: 'Product Launch Event',
      date: '2024-12-25',
      image: 'https://via.placeholder.com/300x200?text=Event+3'
    }
  ])

  return (
    <div className="events-page">
      <div className="date-filters">
        <div className="date-input-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="loading-indicator" style={{ display: 'none' }}>
        Loading more events...
      </div>
    </div>
  )
}

export default Events