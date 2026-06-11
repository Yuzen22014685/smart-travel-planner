import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
    preferences: "",
  });

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);

      const trip = res.data.trip;

      setForm({
        destination: trip.destination || "",
        startDate: trip.startDate
          ? trip.startDate.split("T")[0]
          : "",
        endDate: trip.endDate
          ? trip.endDate.split("T")[0]
          : "",
        notes: trip.notes || "",
        preferences:
          trip.preferences?.join(", ") || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/trips/${id}`, {
        ...form,
        preferences: form.preferences
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      alert("Trip updated successfully!");
      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed to update trip");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Edit Trip</h1>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Destination"
            value={form.destination}
            onChange={(e) =>
              setForm({
                ...form,
                destination: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm({
                ...form,
                startDate: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              setForm({
                ...form,
                endDate: e.target.value,
              })
            }
          />

          <textarea
            rows="4"
            placeholder="Trip Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Food, Beach, Shopping"
            value={form.preferences}
            onChange={(e) =>
              setForm({
                ...form,
                preferences: e.target.value,
              })
            }
          />

          <button className="btn">
            Update Trip
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/trips")}
            >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
