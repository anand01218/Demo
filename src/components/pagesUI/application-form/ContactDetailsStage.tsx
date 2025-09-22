"use client";
import React from "react";
import { ContactDetails } from "@/interface/applicationForm.interface";

interface ContactDetailsStageProps {
  data: ContactDetails;
  // eslint-disable-next-line no-unused-vars -- Function signature requires parameter name
  onChange: (data: ContactDetails) => void;
  errors: any;
}

// eslint-disable-next-line no-unused-vars -- data parameter is extensively used throughout component, ESLint false positive
const ContactDetailsStage: React.FC<ContactDetailsStageProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleChange = (
    field: keyof ContactDetails,
    value: string | boolean
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddressChange = (
    addressType: "currentAddress" | "permanentAddress",
    field: string,
    value: string
  ) => {
    onChange({
      ...data,
      [addressType]: {
        ...data[addressType],
        [field]: value,
      },
    });
  };

  const handleSameAsCurrentChange = (checked: boolean) => {
    if (checked) {
      onChange({
        ...data,
        sameAsCurrent: true,
        permanentAddress: { ...data.currentAddress },
      });
    } else {
      onChange({
        ...data,
        sameAsCurrent: false,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alternate Phone
            </label>
            <input
              type="tel"
              value={data.alternatePhone}
              onChange={(e) => handleChange("alternatePhone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              placeholder="+1 (555) 987-6543"
            />
          </div>
        </div>
      </div>

      {/* Current Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Current Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={data.currentAddress.street}
              onChange={(e) =>
                handleAddressChange("currentAddress", "street", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.currentAddress?.street
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.currentAddress?.street && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentAddress.street}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City *
            </label>
            <input
              type="text"
              value={data.currentAddress.city}
              onChange={(e) =>
                handleAddressChange("currentAddress", "city", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.currentAddress?.city
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="City"
            />
            {errors.currentAddress?.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentAddress.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State *
            </label>
            <input
              type="text"
              value={data.currentAddress.state}
              onChange={(e) =>
                handleAddressChange("currentAddress", "state", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.currentAddress?.state
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="State"
            />
            {errors.currentAddress?.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentAddress.state}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              value={data.currentAddress.zipCode}
              onChange={(e) =>
                handleAddressChange("currentAddress", "zipCode", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.currentAddress?.zipCode
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="12345"
            />
            {errors.currentAddress?.zipCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentAddress.zipCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country *
            </label>
            <input
              type="text"
              value={data.currentAddress.country}
              onChange={(e) =>
                handleAddressChange("currentAddress", "country", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.currentAddress?.country
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Country"
            />
            {errors.currentAddress?.country && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentAddress.country}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Permanent Address
          </h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.sameAsCurrent}
              onChange={(e) => handleSameAsCurrentChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Same as current address
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={data.permanentAddress.street}
              onChange={(e) =>
                handleAddressChange(
                  "permanentAddress",
                  "street",
                  e.target.value
                )
              }
              disabled={data.sameAsCurrent}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                data.sameAsCurrent ? "bg-gray-100 dark:bg-gray-600" : ""
              } ${
                errors.permanentAddress?.street
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.permanentAddress?.street && (
              <p className="mt-1 text-sm text-red-600">
                {errors.permanentAddress.street}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City *
            </label>
            <input
              type="text"
              value={data.permanentAddress.city}
              onChange={(e) =>
                handleAddressChange("permanentAddress", "city", e.target.value)
              }
              disabled={data.sameAsCurrent}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                data.sameAsCurrent ? "bg-gray-100 dark:bg-gray-600" : ""
              } ${
                errors.permanentAddress?.city
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="City"
            />
            {errors.permanentAddress?.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.permanentAddress.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State *
            </label>
            <input
              type="text"
              value={data.permanentAddress.state}
              onChange={(e) =>
                handleAddressChange("permanentAddress", "state", e.target.value)
              }
              disabled={data.sameAsCurrent}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                data.sameAsCurrent ? "bg-gray-100 dark:bg-gray-600" : ""
              } ${
                errors.permanentAddress?.state
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="State"
            />
            {errors.permanentAddress?.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.permanentAddress.state}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              value={data.permanentAddress.zipCode}
              onChange={(e) =>
                handleAddressChange(
                  "permanentAddress",
                  "zipCode",
                  e.target.value
                )
              }
              disabled={data.sameAsCurrent}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                data.sameAsCurrent ? "bg-gray-100 dark:bg-gray-600" : ""
              } ${
                errors.permanentAddress?.zipCode
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="12345"
            />
            {errors.permanentAddress?.zipCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.permanentAddress.zipCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country *
            </label>
            <input
              type="text"
              value={data.permanentAddress.country}
              onChange={(e) =>
                handleAddressChange(
                  "permanentAddress",
                  "country",
                  e.target.value
                )
              }
              disabled={data.sameAsCurrent}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                data.sameAsCurrent ? "bg-gray-100 dark:bg-gray-600" : ""
              } ${
                errors.permanentAddress?.country
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Country"
            />
            {errors.permanentAddress?.country && (
              <p className="mt-1 text-sm text-red-600">
                {errors.permanentAddress.country}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsStage;
