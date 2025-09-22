"use client";
import DefaultWrapper from "@/components/layouts/DefaultWrapper";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import {
  useGetRolesQuery,
  useGetAllPermissionsQuery,
  useAssignPermissionsToRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdatePermissionMutation,
} from "@/redux/slices/RoleAction";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const RolePermissionsPage = () => {
  const {
    data: roles,
    isLoading,
    refetch: refetchRoles,
  } = useGetRolesQuery({});
  const { data: allPermissions, isLoading: permissionsLoading } =
    useGetAllPermissionsQuery({});
  const [assignPermissions] = useAssignPermissionsToRoleMutation();
  const [createRole, { isLoading: createLoading }] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [updatePermission] = useUpdatePermissionMutation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);
  const [createdRoleId, setCreatedRoleId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);

  const selectedRoleData = roles?.find((role: any) => role.id === selectedRole);

  useEffect(() => {
    if (selectedRoleData?.permissions) {
      setSelectedPermissions(
        selectedRoleData.permissions.map((p: any) => p.permission.id)
      );
    } else {
      setSelectedPermissions([]);
    }
  }, [selectedRoleData]);

  const groupPermissionsByResource = (permissions: any[]) => {
    return permissions.reduce((acc: any, perm: any) => {
      const resource = perm.resource || perm.permission?.resource;
      if (!acc[resource]) acc[resource] = [];
      acc[resource].push(perm.permission || perm);
      return acc;
    }, {});
  };

  const handlePermissionToggle = (permissionId: string) => {
    setNewRolePermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;

    try {
      await assignPermissions({
        id: selectedRole,
        permissionIds: selectedPermissions,
      }).unwrap();

      // Update each selected permission
      for (const permissionId of selectedPermissions) {
        await handleUpdatePermission(permissionId, { isActive: true });
      }

      toast.success("Permissions updated successfully!");
    } catch (error) {
      toast.error("Failed to update permissions");
    }
  };

  const handleUpdatePermission = async (permissionId: string, data: any) => {
    try {
      await updatePermission({ id: permissionId, ...data }).unwrap();
      toast.success("Permission updated successfully!");
    } catch (error) {
      toast.error("Failed to update permission");
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createRole(formData).unwrap();
      setCreatedRoleId(result.id);
      setActiveTab(1);
      toast.success("Role created! Now assign permissions.");
    } catch (error) {
      toast.error("Failed to create role");
    }
  };

  const handleAssignPermissions = async () => {
    if (!createdRoleId) return;
    try {
      await assignPermissions({
        id: createdRoleId,
        permissionIds: newRolePermissions,
      }).unwrap();
      await refetchRoles();
      setSelectedRole(createdRoleId);
      toast.success("Role and permissions created successfully!");
      setShowCreateModal(false);
      setFormData({ name: "", description: "", isActive: true });
      setNewRolePermissions([]);
      setCreatedRoleId(null);
      setActiveTab(0);
    } catch (error) {
      toast.error("Failed to assign permissions");
    }
  };

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    try {
      await deleteRole(roleToDelete.id).unwrap();
      toast.success("Role deleted successfully!");
      setShowDeleteModal(false);
      setRoleToDelete(null);
    } catch (error) {
      toast.error("Failed to delete role");
    }
  };

  if (isLoading || permissionsLoading) {
    return (
      <DefaultWrapper>
        <Breadcrumb breadTitle="Role Permissions" subTitle="Home" />
        <div className="container mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper>
      <div className="flex items-center justify-between mb-2">
        <div>
          <Breadcrumb breadTitle="Role Permissions" subTitle="Home" />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
        >
          <i className="fas fa-plus mr-3" />
          <span>Add New Role</span>
        </button>
      </div>
      <div className="mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 ">
              <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Role Permissions Management
              </h2>
            </div>
            {selectedRole && (
              <button
                onClick={handleSavePermissions}
                className="bg-white hover:bg-green-600 hover:text-white text-green-600 border border-green-600 px-4 py-2 rounded-md font-medium shadow-md flex items-center space-x-2"
              >
                <i className="fas fa-save" />
                <span>Save Changes</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600/50 rounded-lg shadow-sm">
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 justify-between py-4 px-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Roles
                </h2>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {roles?.length || 0}
                </span>
              </div>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {roles?.map((role: any) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 mx-2 rounded-md cursor-pointer ${
                      selectedRole === role.id
                        ? "bg-blue-50 dark:bg-blue-900 border-2 border-blue-400 shadow-sm"
                        : "bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500 shadow-sm "
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {role.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {role.description}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRoleToDelete(role);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {role.permissions?.length || 0} permissions
                      </span>
                      {selectedRole === role.id && (
                        <i className="fas fa-check-circle text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 justify-between px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedRoleData
                      ? `${selectedRoleData.name} Permissions`
                      : "Select a Role"}
                  </h2>
                </div>
              </div>

              {selectedRole && allPermissions ? (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                  {Object.entries(
                    groupPermissionsByResource(allPermissions)
                  ).map(([resource, permissions]: [string, any]) => (
                    <div
                      key={resource}
                      className="bg-white/70 dark:bg-gray-800/70 dark:bg-gray-600/70 border border-gray-200/50 dark:border-gray-500 p-4 rounded-lg shadow-sm my-2 mx-2"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                        <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 capitalize">
                          {resource}
                        </h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission: any) => (
                          <label
                            key={permission.id}
                            className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg text-sm cursor-pointer hover:bg-gray-100 dark:hover:from-gray-600 dark:hover:to-gray-700 border border-gray-200 dark:border-gray-600/50 shadow-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(
                                permission.id
                              )}
                              onChange={() =>
                                setSelectedPermissions((prev) =>
                                  prev.includes(permission.id)
                                    ? prev.filter((id) => id !== permission.id)
                                    : [...prev, permission.id]
                                )
                              }
                              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded-md transition-all duration-200"
                            />
                            <div className="flex-1">
                              <span className="font-mono text-sm text-gray-800 dark:text-gray-400 block">
                                {permission.action}:{permission.scope}
                              </span>
                              {permission.description && (
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {permission.description}
                                </span>
                              )}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ml-2 ${
                                permission.isActive
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-200"
                                  : "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900 dark:to-pink-900 dark:text-red-200"
                              }`}
                            >
                              {permission.isActive ? "Active" : "Inactive"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-36">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-user-shield text-6xl text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Select a role to manage permissions
                  </h3>
                  <p className="text-gray-400">
                    Choose a role from the left panel to configure its
                    permissions
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-8 w-full max-w-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center flex items-center space-x-3 mb-6">
              <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Create New Role
              </h2>
            </div>

            <div className="flex border-b border-blue-200/50 dark:border-gray-600/50 mb-6">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-200 ${activeTab === 0 ? "bg-blue-600 transition-colors text-white shadow-lg" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >
                <i className="fas fa-info-circle mr-2" />
                Role Info
              </button>
              <button
                onClick={() => setActiveTab(1)}
                disabled={!createdRoleId}
                className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === 1 ? "bg-blue-500 transition-colors text-white shadow-lg" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"} ${!createdRoleId ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <i className="fas fa-shield-alt mr-2" />
                Permissions
              </button>
            </div>

            {activeTab === 0 && (
              <form onSubmit={handleCreateRole} className="space-y-4">
                <div>
                  <label className="block text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Role Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter role name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                    rows={3}
                    placeholder="Describe the role's purpose and responsibilities"
                  />
                </div>

                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded-md transition-all duration-200"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Role
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createLoading}
                    className="bg-blue-600 transition-colors text-white hover:bg-blue-700 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                  >
                    {createLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <span>Next</span>
                        <i className="fas fa-arrow-right" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 1 && allPermissions && (
              <div>
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  {Object.entries(
                    groupPermissionsByResource(allPermissions)
                  ).map(([resource, permissions]: [string, any]) => (
                    <div
                      key={resource}
                      className="bg-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3" />
                        <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 capitalize">
                          {resource}
                        </h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission: any) => (
                          <label
                            key={permission.id}
                            className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-lg text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-500 transition-all duration-200 border border-gray-300 dark:border-gray-500/50 shadow-sm hover:shadow-sm"
                          >
                            <input
                              type="checkbox"
                              checked={newRolePermissions.includes(
                                permission.id
                              )}
                              onChange={() =>
                                handlePermissionToggle(permission.id)
                              }
                              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded-md transition-all duration-200"
                            />
                            <div className="flex-1">
                              <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
                                {permission.action}:{permission.scope}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignPermissions}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-check" />
                    <span>Create Role</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Role
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the role{" "}
              <strong>&quot;{roleToDelete?.name}&quot;</strong>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setRoleToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRole}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultWrapper>
  );
};

export default RolePermissionsPage;
