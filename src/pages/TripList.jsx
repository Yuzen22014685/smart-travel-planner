import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const loadTrips = async () => {
    const res = await API.get("/trips");
    setTrips(res.data.trips || []);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    await API.delete(`/trips/${id}`);
    loadTrips();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Smart Travel Planner</h1>

        <div>
          <Link className="btn" to="/add-trip">
            Add Trip
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="trip-grid">
        {trips.map((trip) => (
          <div className="trip-card" key={trip._id}>
            <h2>{trip.destination}</h2>

            <p>
              {new Date(
                trip.startDate
              ).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>

            <p>{trip.notes}</p>

            <div className="card-buttons">
              <Link
                className="btn"
                to={`/trip/${trip._id}`}
              >
                View
              </Link>

              <Link
                className="btn"
                to={`/edit/${trip._id}`}
              >
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteTrip(trip._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
