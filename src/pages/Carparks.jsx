import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import ApiService from '../services/api';
import './Carparks.css';

const Carparks = () => {
  const [location, setLocation] = useState(null);
  const [focusedCarpark, setFocusedCarpark] = useState(null);
  const [pinnedCarparks, setPinnedCarparks] = useState(
    JSON.parse(localStorage.getItem('pinnedCarparks') || '[]')
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('carparkSort') || 'alphabet'
  );

  // API hook
  const {
    data: apiCarparks,
    loading,
    error,
    execute: fetchCarparks
  } = useApi(ApiService.getCarparks);

  // Mock data
  const mockCarparks = [
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
  ];

  // Get location from URL or geolocation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('latitude');
    const lng = urlParams.get('longitude');

    if (lat && lng) {
      setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
    } else {
      // Try geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.warn('Geolocation failed:', error);
            // Use default location
            setLocation({ latitude: -6.200000, longitude: 106.816666 });
          }
        );
      }
    }
  }, []);

  // Fetch carparks when location changes
  useEffect(() => {
    if (location) {
      fetchCarparks({
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
  }, [location, fetchCarparks]);

  // Use API data if available, otherwise use mock data
  const carparks = apiCarparks?.data || apiCarparks || mockCarparks;

  const togglePin = (carparkId) => {
    const newPinned = pinnedCarparks.includes(carparkId)
      ? pinnedCarparks.filter(id => id !== carparkId)
      : [...pinnedCarparks, carparkId];
    
    setPinnedCarparks(newPinned);
    localStorage.setItem('pinnedCarparks', JSON.stringify(newPinned));
  };

  // Sort carparks based on settings
  const sortedCarparks = [...carparks].sort((a, b) => {
    // Pinned items first
    const aPinned = pinnedCarparks.includes(a.id);
    const bPinned = pinnedCarparks.includes(b.id);
    
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    
    // Then sort by selected method
    if (sortBy === 'distance') {
      return a.distance - b.distance;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

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
    );
  }

  return (
    <div className="carparks-page">
      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Loading carparks...</p>
        </div>
      )}

      {error && (
        <div className="error-indicator">
          <p>Failed to load carparks. Showing sample data.</p>
        </div>
      )}

      <div className="carparks-list">
        {sortedCarparks.map((carpark) => (
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
  );
};

export default Carparks;