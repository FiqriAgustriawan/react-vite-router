import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import ApiService from '../services/api';
import './Weather.css';

const Weather = () => {
  // API hook
  const {
    data: apiWeather,
    loading,
    error,
    execute: fetchWeather
  } = useApi(ApiService.getWeather);

  // Load weather data
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Generate mock 7 days weather data
  const generateMockWeatherData = () => {
    const today = new Date();
    const data = [];
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    const conditionNames = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const randomCondition = Math.floor(Math.random() * conditions.length);
      const baseTemp = 15 + Math.floor(Math.random() * 15);
      const tempRange = Math.floor(Math.random() * 8) + 3;
      
      data.push({
        id: i + 1,
        date: date.toISOString().split('T')[0],
        temp: `${baseTemp}-${baseTemp + tempRange}°C`,
        condition: conditionNames[randomCondition],
        icon: conditions[randomCondition]
      });
    }
    
    return data;
  };

  // Use API data if available, otherwise use mock data
  const weatherData = apiWeather?.data || apiWeather?.forecast || generateMockWeatherData();

  const WeatherIcon = ({ type }) => {
    const iconStyle = {
      stroke: '#1c3e60',
      strokeWidth: 1,
      fill: 'none',
      width: '45px',
      height: '45px'
    };

    const sunPaths = (
      <>
        <circle cx="22.5" cy="22.5" r="6" />
        <path d="M22.5 4.5v3M22.5 37.5v3M4.5 22.5h3M37.5 22.5h3M8.625 8.625l2.1 2.1M34.275 34.275l2.1 2.1M8.625 36.375l2.1-2.1M34.275 10.725l2.1-2.1" />
      </>
    );

    const cloudPath = <path d="M34.5 18c0-6.6-5.4-12-12-12s-12 5.4-12 12c-3.3 0-6 2.7-6 6s2.7 6 6 6h22.5c2.475 0 4.5-2.025 4.5-4.5s-2.025-4.5-4.5-4.5z" />;

    const rainPaths = (
      <>
        {cloudPath}
        <path d="M15 31.5v6M18 33v4.5M21 31.5v6M24 33v4.5M27 31.5v6" />
      </>
    );

    switch(type) {
      case 'sunny':
        return <svg style={iconStyle} className="weather-icon">{sunPaths}</svg>;
      case 'cloudy':
        return <svg style={iconStyle} className="weather-icon">{cloudPath}</svg>;
      case 'rainy':
        return <svg style={iconStyle} className="weather-icon">{rainPaths}</svg>;
      case 'partly-cloudy':
        return (
          <svg style={iconStyle} className="weather-icon">
            <circle cx="18.75" cy="18.75" r="4.5" />
            <path d="M18.75 6v2.25M18.75 30v2.25M6 18.75h2.25M30 18.75h2.25M10.5 10.5l1.5 1.5M25.5 25.5l1.5 1.5M10.5 27l1.5-1.5M25.5 12l1.5-1.5" />
            <path d="M30 15c0-4.5-3.375-7.5-7.5-7.5s-7.5 3-7.5 7.5c-2.25 0-4.125 1.875-4.125 4.125S12.75 23.25 15 23.25h13.5c1.65 0 3-1.35 3-3s-1.35-3-3-3z" />
          </svg>
        );
      default:
        return <svg style={iconStyle} className="weather-icon">{sunPaths}</svg>;
    }
  };

  const getDayLabel = (dateStr, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="weather-page">
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-page">
      <div className="weather-header">
        <h2>7-Day Weather Forecast</h2>
        <p>Scroll horizontally to see more days</p>
      </div>
      
      {error && (
        <div className="error-indicator">
          <p>Failed to load weather. Showing sample data.</p>
        </div>
      )}
      
      <div className="weather-scroll-container">
        {weatherData.map((day, index) => (
          <div key={day.id || index} className="weather-day">
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
  );
};

export default Weather;