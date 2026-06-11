import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

export default function TripDetail() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    try {
      const tripRes = await API.get(`/trips/${id}`);

      const tripData = tripRes.data.trip;
      setTrip(tripData);

      const weatherRes = await API.get(
        `/weather/${tripData.destination}`
      );

      setWeather(weatherRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

        <Link className="btn" to="/trips">
          Back
        </Link>
      </div>
    </div>
  );
}
