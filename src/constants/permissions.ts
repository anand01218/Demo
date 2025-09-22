// Permission constants that match your backend permission strings
export const PERMISSIONS = {
  // Super Admin Permissions
  SUPERADMIN_MANAGE_ANY: "superadmin:manage:any",
  SUPERADMIN_READ_ANY: "superadmin:read:any",
  SUPERADMIN_ASSIGN_ROLE_ANY: "superadmin:assign_role:any",
  SUPERADMIN_READ_TEAM: "superadmin:read:team",
  SUPERADMIN_UPDATE_TEAM: "superadmin:update:team",
  SUPERADMIN_READ_SELF: "superadmin:read:self",
  SUPERADMIN_UPDATE_SELF: "superadmin:update:self",

  // Admin Permissions
  ADMIN_MANAGE_ANY: "admin:manage:any",
  ADMIN_READ_ANY: "admin:read:any",

  // Department Management
  DEPARTMENT_CREATE_ANY: "department:create:any",
  DEPARTMENT_READ_ANY: "department:read:any",
  DEPARTMENT_UPDATE_ANY: "department:update:any",
  DEPARTMENT_DELETE_ANY: "department:delete:any",
  DEPARTMENT_LIST_ANY: "department:list:any",

  // Employee Management
  EMPLOYEE_CREATE_ANY: "employee:create:any",
  EMPLOYEE_READ_ANY: "employee:read:any",
  EMPLOYEE_UPDATE_ANY: "employee:update:any",
  EMPLOYEE_DELETE_ANY: "employee:delete:any",
  EMPLOYEE_LIST_ANY: "employee:list:any",
  EMPLOYEE_READ_TEAM: "employee:read:team",
  EMPLOYEE_UPDATE_TEAM: "employee:update:team",
  EMPLOYEE_READ_SELF: "employee:read:self",
  EMPLOYEE_UPDATE_SELF: "employee:update:self",
  EMPLOYEE_EXPORT_ANY: "employee:export:any",
  EMPLOYEE_APPROVE_ANY: "employee:approve:any",

  // Attendance Management
  ATTENDANCE_CREATE_ANY: "attendance:create:any",
  ATTENDANCE_READ_ANY: "attendance:read:any",
  ATTENDANCE_UPDATE_ANY: "attendance:update:any",
  ATTENDANCE_DELETE_ANY: "attendance:delete:any",
  ATTENDANCE_APPROVE_ANY: "attendance:approve:any",
  ATTENDANCE_READ_TEAM: "attendance:read:team",
  ATTENDANCE_UPDATE_TEAM: "attendance:update:team",
  ATTENDANCE_READ_SELF: "attendance:read:self",
  ATTENDANCE_UPDATE_SELF: "attendance:update:self",

  // Leave Management
  LEAVE_CREATE_ANY: "leave:create:any",
  LEAVE_READ_ANY: "leave:read:any",
  LEAVE_UPDATE_ANY: "leave:update:any",
  LEAVE_DELETE_ANY: "leave:delete:any",
  LEAVE_APPROVE_ANY: "leave:approve:any",
  LEAVE_READ_TEAM: "leave:read:team",
  LEAVE_UPDATE_TEAM: "leave:update:team",
  LEAVE_READ_SELF: "leave:read:self",
  LEAVE_UPDATE_SELF: "leave:update:self",
  LEAVE_APPROVE_TEAM: "leave:approve:team",
  LEAVE_CREATE_SELF: "leave:create:self",

  // Authentication & Authorization
  AUTH_LOGIN_SELF: "auth:login:self",
  AUTH_REFRESH_SELF: "auth:refresh:self",
  AUTH_CHANGE_PASSWORD_SELF: "auth:change_password:self",
  AUTH_INVITE_ANY: "auth:invite:any",
  AUTH_ASSIGN_ROLE_ANY: "auth:assign_role:any",
  AUTH_RESET_PASSWORD_ANY: "auth:reset_password:any",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[PermissionKey];
