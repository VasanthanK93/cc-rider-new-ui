'use client';

import { useState } from 'react';

interface EventData {
  name: string;
  registration: {
    registrationOptions: Array<{ id: string; title: string }>;
  };
  // Add other properties of eventData here if needed
}

export default function EventForm({ eventData }: { eventData: EventData }) {
  console.log('Event Data:', eventData);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    emergencyName: '',
    emergencyContact: '',
    category: '',
    participationType: 'In-person',
    agreeToTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      participationType: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      dateOfBirth: '',
      gender: '',
      emergencyName: '',
      emergencyContact: '',
      category: '',
      participationType: 'In-person',
      agreeToTerms: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center sm:text-left">
          {eventData.name} Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium mb-2"
                >
                  Mobile number*
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium mb-2"
                >
                  Date of birth*
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium mb-2"
                >
                  Gender*
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact Information Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-6">
              Emergency contact information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Emergency Contact Name */}
              <div>
                <label
                  htmlFor="emergencyName"
                  className="block text-sm font-medium mb-2"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="emergencyName"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Emergency Contact Number */}
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium mb-2"
                >
                  Contact number*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-6">
              Event
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2"
                >
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  {eventData.registration.registrationOptions.map(
                    (option: { id: string; title: string }) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Participation Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Participation type*
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="participationType"
                      value="In-person"
                      checked={formData.participationType === 'In-person'}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2">In-person</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="participationType"
                      value="Virtual"
                      checked={formData.participationType === 'Virtual'}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2">Virtual</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
              className="w-4 h-4 mt-1 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-sm">
              Agree to terms and conditions*
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              REGISTER NOW
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-gray-800 text-green-400 font-semibold rounded-md border border-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Reset all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
