import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

export default function TripDetail() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currency, setCurrency] = useState(null); // Added state for the 2nd API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    try {
      const tripRes = await API.get(`/trips/${id}`);
      const tripData = tripRes.data.trip;
      setTrip(tripData);

      // Fetch weather data
      const weatherRes = await API.get(`/weather/${tripData.destination}`);
      setWeather(weatherRes.data);

      // Fetch live currency exchange rates from our brand new route
      const currencyRes = await API.get('/currency');
      setCurrency(currencyRes.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Smart helper to auto-detect currency code based on destination text
  const detectCurrency = (destination) => {
    const dest = destination?.toLowerCase() || '';
    if (dest.includes('japan')) return { code: 'JPY', symbol: '¥', name: 'Japanese Yen' };
    if (dest.includes('singapore')) return { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' };
    if (dest.includes('thai')) return { code: 'THB', symbol: '฿', name: 'Thai Baht' };
    if (dest.includes('usa') || dest.includes('state') || dest.includes('america')) return { code: 'USD', symbol: '$', name: 'US Dollar' };
    if (dest.includes('euro') || dest.includes('france') || dest.includes('germany') || dest.includes('italy')) return { code: 'EUR', symbol: '€', name: 'Euro' };
    if (dest.includes('uk') || dest.includes('britain') || dest.includes('london')) return { code: 'GBP', symbol: '£', name: 'British Pound' };
    if (dest.includes('korea')) return { code: 'KRW', symbol: '₩', name: 'South Korean Won' };
    if (dest.includes('australia')) return { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' };
    return null; // Fallback dashboard mode
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="detail-card">
        <h1>{trip.destination}</h1>

        <p>
          <strong>Start:</strong>{" "}
          {new Date(trip.startDate).toLocaleDateString()}
        </p>

        <p>
          <strong>End:</strong>{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Notes:</strong> {trip.notes}
        </p>

        <div className="tag-container">
          {trip.preferences?.map((pref, index) => (
            <span className="tag" key={index}>
              {pref}
            </span>
          ))}
        </div>

        {weather && (
          <div className="weather-card">
            <h2>🌤 Current Weather</h2>
            <h1>{weather.temperature}°C</h1>
            <p>{weather.condition}</p>
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>🌬 Wind: {weather.windSpeed} m/s</p>
          </div>
        )}

        {/* MANDATORY 2ND API: LIVE CURRENCY EXCHANGE RATE WIDGET */}
        {currency && (
          <div style={{
            marginTop: '20px',
            padding: '25px',
            backgroundColor: '#f0fdf4', // Premium light green money theme
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
              💱 Financial Planner (Live Rates)
            </h3>
            
            {detectCurrency(trip.destination) ? (
              // Targeted Mode: Explicitly shows the specific country currency matching the destination
              <div>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#15803d' }}>
                  Local Currency: <strong>{detectCurrency(trip.destination).name} ({detectCurrency(trip.destination).code})</strong>
                </p>
                <h2 style={{ margin: '12px 0 6px 0', color: '#14532d', fontSize: '28px', fontWeight: 'bold' }}>
                  1 MYR = {detectCurrency(trip.destination).symbol}{(currency.rates[detectCurrency(trip.destination).code])?.toFixed(2)}
                </h2>
                <small style={{ color: '#166534', fontSize: '11px', opacity: 0.8 }}>Rates base updated: {currency.date}</small>
              </div>
            ) : (
              // Fallback Mode: Displays a neat travel exchange rate matrix if country text isn't explicit
              <div>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#15803d' }}>
                  Base Unit: <strong>1 Malaysian Ringgit (MYR)</strong>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center' }}>
                    <small style={{ color: '#555', display: 'block', marginBottom: '4px' }}>💵 USD</small>
                    <div style={{ fontWeight: 'bold', color: '#14532d' }}>${currency.rates.USD?.toFixed(2)}</div>
                  </div>
                  <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center' }}>
                    <small style={{ color: '#555', display: 'block', marginBottom: '4px' }}>&#128181; JPY</small>
                    <div style={{ fontWeight: 'bold', color: '#14532d' }}>¥{currency.rates.JPY?.toFixed(2)}</div>
                  </div>
                  <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center' }}>
                    <small style={{ color: '#555', display: 'block', marginBottom: '4px' }}>💲 SGD</small>
                    <div style={{ fontWeight: 'bold', color: '#14532d' }}>S${currency.rates.SGD?.toFixed(2)}</div>
                  </div>
                  <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center' }}>
                    <small style={{ color: '#555', display: 'block', marginBottom: '4px' }}>🇹🇭 THB</small>
                    <div style={{ fontWeight: 'bold', color: '#14532d' }}>฿{currency.rates.THB?.toFixed(2)}</div>
                  </div>
                </div>
                <small style={{ color: '#166534', display: 'block', marginTop: '12px', fontSize: '11px', opacity: 0.8 }}>Rates base updated: {currency.date}</small>
              </div>
            )}
          </div>
        )}

        <Link className="btn" style={{ marginTop: '20px', display: 'inline-block' }} to="/trips">
          Back
        </Link>
      </div>
    </div>
  );
}