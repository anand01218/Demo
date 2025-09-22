"use client";
import DefaultWrapper from "@/components/layouts/DefaultWrapper";
import Link from "next/link";
import React from "react";

const SettingsPage = () => {
  return (
    <DefaultWrapper>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Settings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/settings/role-permissions"
              className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <i className="fa-solid fa-user-shield text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Role Permissions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Manage user roles and permissions
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

export default SettingsPage;
