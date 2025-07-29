import { useState, useEffect } from 'react'
import { usePagination } from '../hooks/usePagination'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import ApiService from '../services/api'
import './Events.css'

const Events = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filters, setFilters] = useState({})

  // Use pagination hook
  const {
    items: events,
    loading,
    error,
    hasMore,
    loadInitial,
    loadMore,
    reset
  } = usePagination(ApiService.getEvents)

  // Use infinite scroll hook
  const lastEventRef = useInfiniteScroll(loadMore, hasMore, loading)

  // Load initial data
  useEffect(() => {
    loadInitial(filters)
  }, [loadInitial, filters])

  // Handle date filter changes
  const handleDateFilter = () => {
    const newFilters = {}
    if (startDate) newFilters.beginning_date = startDate
    if (endDate) newFilters.ending_date = endDate

    setFilters(newFilters)
  }

  // Apply filters when dates change
  useEffect(() => {
    if (startDate || endDate) {
      handleDateFilter()
    }
  }, [startDate, endDate])

  // Mock data fallback
  const mockEvents = [
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
  ]

  // Use mock data if API fails or no events
  const displayEvents = events.length > 0 ? events : mockEvents

  if (error) {
    console.warn('API Error, using mock data:', error)
  }

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
        {displayEvents.map((event, index) => {
          // Add ref to last element for infinite scroll
          const isLast = index === displayEvents.length - 1
          return (
            <div
              key={event.id}
              className="event-card"
              ref={isLast ? lastEventRef : null}
            >
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                }}
              />
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <p>Loading more events...</p>
          </div>
        )}

        {!hasMore && events.length > 0 && (
          <div className="end-indicator">
            <p>No more events to load</p>
          </div>
        )}

        {error && events.length === 0 && (
          <div className="error-indicator">
            <p>Failed to load events. Showing sample data.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events