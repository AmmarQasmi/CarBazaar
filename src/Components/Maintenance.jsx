import React, { useState } from "react";
import axios from "axios";

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    service_date: "",
    service_description: "",
    cost: "",
    service_center: "",
    services_service_id: "",
    vehicle_v_id: "",
    users_u_id: "",
    appointment_date: "",
    appointment_time: "",
    service_location: "",
    additional_details: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "additional_details") {
        setError(`Please provide a valid value for "${key.replace(/_/g, " ")}".`);
        setSuccess("");
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/api/maintenance", {
        ...formData,
        cost: parseFloat(formData.cost),
      });

      console.log("Success:", response.data);
      setSuccess("Maintenance request submitted successfully!");
      setError("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to submit the form. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-red-500 text-center mt-5 mb-8">
          Maintenance Request Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          {success && <p className="text-green-500 text-center font-semibold">{success}</p>}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="service_date" className="block text-sm font-medium text-gray-300">
                Service Date
              </label>
              <input
                type="date"
                id="service_date"
                name="service_date"
                value={formData.service_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-300">
                Appointment Date
              </label>
              <input
                type="date"
                id="appointment_date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-300">
                Appointment Time
              </label>
              <input
                type="time"
                id="appointment_time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-300">
                Cost
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                step="0.01"
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service_description" className="block text-sm font-medium text-gray-300">
              Service Description
            </label>
            <textarea
              id="service_description"
              name="service_description"
              value={formData.service_description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="service_center" className="block text-sm font-medium text-gray-300">
              Service Center
            </label>
            <input
              type="text"
              id="service_center"
              name="service_center"
              value={formData.service_center}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="services_service_id" className="block text-sm font-medium text-gray-300">
                Service ID
              </label>
              <input
                type="number"
                id="services_service_id"
                name="services_service_id"
                value={formData.services_service_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="vehicle_v_id" className="block text-sm font-medium text-gray-300">
                Vehicle ID
              </label>
              <input
                type="number"
                id="vehicle_v_id"
                name="vehicle_v_id"
                value={formData.vehicle_v_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="users_u_id" className="block text-sm font-medium text-gray-300">
                User ID
              </label>
              <input
                type="number"
                id="users_u_id"
                name="users_u_id"
                value={formData.users_u_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service_location" className="block text-sm font-medium text-gray-300">
              Service Location
            </label>
            <input
              type="text"
              id="service_location"
              name="service_location"
              value={formData.service_location}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="additional_details" className="block text-sm font-medium text-gray-300">
              Additional Details
            </label>
            <textarea
              id="additional_details"
              name="additional_details"
              value={formData.additional_details}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Submit Maintenance Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;