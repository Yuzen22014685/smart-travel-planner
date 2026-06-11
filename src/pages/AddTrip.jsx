import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
    preferences: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/trips", {
        ...form,
        preferences: form.preferences
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      alert("Trip added successfully!");
      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed to add trip");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Add Trip</h1>

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
            required
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
            required
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
            required
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
            Save Trip
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
