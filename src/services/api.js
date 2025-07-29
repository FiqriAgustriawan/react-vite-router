const API_BASE_URL = './module_mobile_api.php';

class ApiService {
  // Base method untuk API calls
  async request(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Events API
  async getEvents(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.beginning_date) {
      queryParams.append('beginning_date', params.beginning_date);
    }
    if (params.ending_date) {
      queryParams.append('ending_date', params.ending_date);
    }
    if (params.page) {
      queryParams.append('page', params.page);
    }

    const endpoint = `/events.json${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request(endpoint);
  }

  // Carparks API
  async getCarparks(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.latitude) {
      queryParams.append('latitude', params.latitude);
    }
    if (params.longitude) {
      queryParams.append('longitude', params.longitude);
    }

    const endpoint = `/carparks.json${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request(endpoint);
  }

  // Weather API
  async getWeather() {
    return this.request('/weather.json');
  }
}

export default new ApiService();