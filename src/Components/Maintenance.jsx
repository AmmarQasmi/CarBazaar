import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Calendar, Clock, DollarSign, PenToolIcon as Tool, Clipboard, User, Mail, MapPin } from 'lucide-react';

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    service_date: "",
    service_description: "",
    cost: "80",
    service_center: "QuickLube Center",
    services_service_id: "1",
    vehicle_v_id: "",
    users_u_id: "",
    appointment_date: "",
    appointment_time: "",
    service_location: "123 Service St, New York, NY",
    additional_details: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const serviceCenters = [
    {
      name: "QuickLube Center",
      service_id: "1",
      location: "123 Service St, New York, NY",
      cost: "80",
    },
    {
      name: "Brake Masters",
      service_id: "2",
      location: "456 Repair Ave, Los Angeles, CA",
      cost: "100",
    },
    {
      name: "Car Care Center",
      service_id: "3",
      location: "789 Inspection Rd, Chicago, IL",
      cost: "200",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "service_center") {
      const selectedCenter = serviceCenters.find(center => center.name === value);
      setFormData(prevData => ({
        ...prevData,
        service_center: value,
        service_location: selectedCenter.location,
        services_service_id: selectedCenter.service_id,
        cost: selectedCenter.cost,
      }));
    } else if (name !== "cost") {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "additional_details") {
        setError(`Please provide a valid value for "${key.replace(/_/g, " ")}".`);
        setSuccess("");
        setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-500 mb-4">Vehicle Registration Required</h2>
            <p className="text-gray-300 text-lg mb-6">
              Please register your vehicle to receive the necessary IDs for booking a maintenance service.
            </p>
            <NavLink
              to="/register"
              className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
            >
              Register Vehicle
            </NavLink>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-extrabold text-red-500 text-center mb-8">
            Maintenance Request Form
          </h2>
          {error && <p className="text-red-500 text-center font-semibold mb-4 bg-red-100 border border-red-400 rounded p-3">{error}</p>}
          {success && <p className="text-green-500 text-center font-semibold mb-4 bg-green-100 border border-green-400 rounded p-3">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="service_date" className="block text-sm font-medium text-gray-300 mb-1">
                  <Calendar className="inline-block w-5 h-5 mr-1" /> Service Date
                </label>
                <input
                  type="date"
                  id="service_date"
                  name="service_date"
                  value={formData.service_date}
                  onChange={handleChange}
                  required
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-300 mb-1">
                  <Calendar className="inline-block w-5 h-5 mr-1" /> Appointment Date
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-300 mb-1">
                  <Clock className="inline-block w-5 h-5 mr-1" /> Appointment Time
                </label>
                <input
                  type="time"
                  id="appointment_time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-300 mb-1">
                  <DollarSign className="inline-block w-5 h-5 mr-1" /> Cost
                </label>
                <input
                  type="text"
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  readOnly
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service_description" className="block text-sm font-medium text-gray-300 mb-1">
                <Tool className="inline-block w-5 h-5 mr-1" /> Service Description
              </label>
              <textarea
                id="service_description"
                name="service_description"
                value={formData.service_description}
                onChange={handleChange}
                required
                rows={3}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="service_center" className="block text-sm font-medium text-gray-300 mb-1">
                <MapPin className="inline-block w-5 h-5 mr-1" /> Service Center
              </label>
              <select
                id="service_center"
                name="service_center"
                value={formData.service_center}
                onChange={handleChange}
                required
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              >
                {serviceCenters.map((center) => (
                  <option key={center.service_id} value={center.name}>
                    {center.name} - {center.location} (${center.cost})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="services_service_id" className="block text-sm font-medium text-gray-300 mb-1">
                  <Clipboard className="inline-block w-5 h-5 mr-1" /> Service ID
                </label>
                <input
                  type="number"
                  id="services_service_id"
                  name="services_service_id"
                  value={formData.services_service_id}
                  onChange={handleChange}
                  required
                  readOnly
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="vehicle_v_id" className="block text-sm font-medium text-gray-300 mb-1">
                  <User className="inline-block w-5 h-5 mr-1" /> Vehicle ID
                </label>
                <input
                  type="number"
                  id="vehicle_v_id"
                  name="vehicle_v_id"
                  value={formData.vehicle_v_id}
                  onChange={handleChange}
                  required
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="users_u_id" className="block text-sm font-medium text-gray-300 mb-1">
                  <User className="inline-block w-5 h-5 mr-1" /> User ID
                </label>
                <input
                  type="number"
                  id="users_u_id"
                  name="users_u_id"
                  value={formData.users_u_id}
                  onChange={handleChange}
                  required
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additional_details" className="block text-sm font-medium text-gray-300 mb-1">
                <Clipboard className="inline-block w-5 h-5 mr-1" /> Additional Details
              </label>
              <textarea
                id="additional_details"
                name="additional_details"
                value={formData.additional_details}
                onChange={handleChange}
                rows={3}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                <Mail className="inline-block w-5 h-5 mr-1" /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4
zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Maintenance Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceForm;

