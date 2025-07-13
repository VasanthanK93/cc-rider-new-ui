"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { User, Phone, Users, Calendar, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { getAccessTokenFromCookie } from '@/app/store';
import jwt from 'jsonwebtoken';
import { getRider, updateRider } from '@/app/helpers/data/riders';
import { ToastProvider } from '@/app/components/common/toastNotification';

export default function MyAccountForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    bloodGroup: '',
    emergencyName: '',
    emergencyNumber: '',
    alternateEmergencyName: '',
    alternateEmergencyNumber: '',
    dateOfBirth: ''
  });
  
  const [user_id, setUserId] = useState<string>('');
  type FormErrors = {
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    bloodGroup?: string;
    emergencyName?: string;
    emergencyNumber?: string;
    dateOfBirth?: string;
    [key: string]: string | undefined;
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [riderId] = useState('RID-' + Math.random().toString(36).substr(2, 9).toUpperCase());

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const accessToken = getAccessTokenFromCookie();
  const user = accessToken ? jwt.decode(accessToken) : null;

  const fetchUserData = useCallback(async (token: string, uid: string) => {
    const RiderDetail = await getRider(token, uid);
    if (RiderDetail) {
      setFormData({
        firstName: RiderDetail.firstName || '',
        lastName: RiderDetail.lastName || '',
        contactNumber: RiderDetail.contactNumber || '',
        bloodGroup: RiderDetail.bloodGroup || '',
        emergencyName: RiderDetail.emergencyName || '',
        emergencyNumber: RiderDetail.emergencyNumber || '',
        alternateEmergencyName: RiderDetail.alternateEmergencyName || '',
        alternateEmergencyNumber: RiderDetail.alternateEmergencyNumber || '',
        dateOfBirth: RiderDetail.dob || ''
      });
    }
  }, []);

  useEffect(() => {
    const uid =
      user && typeof user !== 'string' && 'user_id' in user
        ? user.user_id
        : 'CC000000';
    setUserId(uid);
    if (accessToken && uid) {
      fetchUserData(accessToken, uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    console.log('Validating form data:', formData);
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(String(formData.contactNumber).replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.emergencyName.trim()) {
      newErrors.emergencyName = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyNumber) {
      newErrors.emergencyNumber = 'Emergency contact number is required';
    } else if (!/^\d{10}$/.test(String(formData.emergencyNumber).replace(/\D/g, ''))) {
      newErrors.emergencyNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    const res = await updateRider(accessToken || '', { ...formData, riderId: user_id });
    if (!res) {
      setErrors({ firstName: 'Failed to update profile. Please try again.' });
      setIsSubmitting(false);
      return;
    }else {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Show toast notification on success
      const toastModule = await import('@/app/components/common/toastNotification');
      // Use the correct export, e.g. toastModule.default or toastModule.toastNotification
      const showToast = toastModule.addToast || toastModule.default || toastModule.toastNotification;
      if (typeof showToast === 'function') {
        showToast('Profile updated successfully!');
      }
    }
    
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <ToastProvider>
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <div className="bg-gray-800 rounded-lg p-4 inline-block">
            <span className="text-gray-300 text-sm">Rider ID: </span>
            <span className="text-blue-400 font-mono font-semibold">{user_id}</span>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-800 border border-green-600 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-200">Profile updated successfully!</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </div>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Number and Blood Group Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.contactNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.contactNumber && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.contactNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-300 mb-2">
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.bloodGroup ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  {bloodGroups.map(group => (
                    <option key={group} value={group} className="bg-gray-700">{group}</option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <div className="flex items-center mt-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.bloodGroup}
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emergency Name */}
              <div>
                <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-300 mb-2">
                  Emergency Name
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.emergencyName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Emergency contact name"
                  />
                  {errors.emergencyName && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.emergencyName}
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Number */}
              <div>
                <label htmlFor="emergencyNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Emergency Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="emergencyNumber"
                    name="emergencyNumber"
                    value={formData.emergencyNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.emergencyNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Emergency contact number"
                  />
                  {errors.emergencyNumber && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.emergencyNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Alternate Emergency Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alternate Emergency Name */}
              <div>
                <label htmlFor="alternateEmergencyName" className="block text-sm font-medium text-gray-300 mb-2">
                  Alternate Emergency Name
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="alternateEmergencyName"
                    name="alternateEmergencyName"
                    value={formData.alternateEmergencyName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Alternate emergency contact name"
                  />
                </div>
              </div>

              {/* Alternate Emergency Number */}
              <div>
                <label htmlFor="alternateEmergencyNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Alternate Emergency Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="alternateEmergencyNumber"
                    name="alternateEmergencyNumber"
                    value={formData.alternateEmergencyNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Alternate emergency contact number"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <div className="flex items-center mt-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 flex items-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 transform hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ToastProvider>
  );
}