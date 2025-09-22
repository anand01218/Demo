import { SidebarCategory } from "@/interface";
import { PERMISSIONS } from "@/constants/permissions";

const sidebarData: SidebarCategory[] = [
  {
    id: 1,
    category: "Main",
    items: [
      {
        id: 1,
        label: "Dashboards",
        icon: "fa-solid fa-house",
        link: "/",
      },
      {
        id: 2,
        label: "Inbox",
        icon: "fa-solid fa-inbox",
        link: "/inbox",
      },
      {
        id: 3,
        label: "Recruitment",
        icon: "fa-solid fa-users",
        link: "/recruitment",
        permissions: [
          PERMISSIONS.ADMIN_MANAGE_ANY,
          PERMISSIONS.SUPERADMIN_MANAGE_ANY,
        ],
      },
      {
        id: 4,
        label: "Onboarding",
        icon: "fa-solid fa-user-plus",
        link: "/onboarding",
        permissions: [
          PERMISSIONS.EMPLOYEE_CREATE_ANY,
          PERMISSIONS.ADMIN_MANAGE_ANY,
        ],
      },
      {
        id: 5,
        label: "Employees",
        icon: "fa-solid fa-user",
        link: "/employees",
        permissions: [
          PERMISSIONS.EMPLOYEE_LIST_ANY,
          PERMISSIONS.EMPLOYEE_READ_SELF,
        ],
      },
      {
        id: 6,
        label: "Departments",
        icon: "fa-solid fa-building",
        link: "/department",
        permission: PERMISSIONS.DEPARTMENT_LIST_ANY,
      },
      // {
      //   id: 9,
      //   label: "Designations",
      //   icon: "fa-solid fa-briefcase",
      //   link: "/designations",
      // },
      {
        id: 7,
        label: "Attendance",
        icon: "fa-solid fa-calendar-check",
        link: "/attendance",
        permissions: [
          PERMISSIONS.ATTENDANCE_READ_ANY,
          PERMISSIONS.ATTENDANCE_READ_SELF,
        ],
      },
      {
        id: 8,
        label: "Shift",
        icon: "fa-solid fa-clock",
        link: "#",
        permissions: [
          PERMISSIONS.ADMIN_MANAGE_ANY,
          PERMISSIONS.ATTENDANCE_READ_ANY,
        ],
        subItems: [
          {
            label: "Shift List",
            link: "/shift",
            permission: PERMISSIONS.ATTENDANCE_READ_ANY,
          },
          {
            label: "Create Shift",
            link: "/shift/create",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
          {
            label: "Shift Assignments",
            link: "/shift/assignments",
            permissions: [
              PERMISSIONS.ADMIN_MANAGE_ANY,
              PERMISSIONS.ATTENDANCE_UPDATE_ANY,
            ],
          },
        ],
      },
      {
        id: 9,
        label: "Performance",
        icon: "fa-solid fa-chart-line",
        link: "#",
        permissions: [
          PERMISSIONS.ADMIN_MANAGE_ANY,
          PERMISSIONS.SUPERADMIN_MANAGE_ANY,
        ],
        subItems: [
          {
            label: "Dashboard",
            link: "/performance/dashboard",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
          {
            label: "Goals List",
            link: "/performance/goals",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
          {
            label: "Reviews",
            link: "/performance/reviews",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
        ],
      },
      {
        id: 10,
        label: "Leave",
        icon: "fa-solid fa-calendar-days",
        link: "/leave",
        permissions: [PERMISSIONS.LEAVE_READ_ANY, PERMISSIONS.LEAVE_READ_SELF],
      },
      // {
      //   id: 7,
      //   label: "Projects",
      //   icon: "fa-solid fa-folder",
      //   link: "/project",
      // },
      {
        id: 11,
        label: "Reports",
        icon: "fa-solid fa-chart-bar",
        link: "#",
        permissions: [
          PERMISSIONS.ADMIN_MANAGE_ANY,
          PERMISSIONS.SUPERADMIN_MANAGE_ANY,
        ],
        subItems: [
          {
            label: "User Report",
            link: "/reports/user-report",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
          {
            label: "Attendance Report",
            link: "/reports/attendance-report",
            permission: PERMISSIONS.ATTENDANCE_READ_ANY,
          },
        ],
      },
      {
        id: 12,
        label: "Profile",
        icon: "fa-solid fa-user-circle",
        link: "/profile",
        // No permission needed - all users can access their profile
      },
      {
        id: 13,
        label: "Settings",
        icon: "fa-solid fa-gear",
        link: "#",
        permissions: [
          PERMISSIONS.ADMIN_MANAGE_ANY,
          PERMISSIONS.SUPERADMIN_MANAGE_ANY,
        ],
        subItems: [
          {
            label: "Role Permissions",
            link: "/settings/role-permissions",
            permission: PERMISSIONS.SUPERADMIN_MANAGE_ANY,
          },
          {
            label: "Policy",
            link: "/settings/policy",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
          },
          {
            label: "Onboarding Settings",
            link: "#",
            permission: PERMISSIONS.ADMIN_MANAGE_ANY,
            subItems: [
              {
                label: "Onboarding Fields",
                link: "/settings/onboarding/onboarding-fields",
                permission: PERMISSIONS.ADMIN_MANAGE_ANY,
              },
              {
                label: "Onboarding Templates",
                link: "/settings/onboarding/onboarding-templates",
                permission: PERMISSIONS.ADMIN_MANAGE_ANY,
              },
              {
                label: "Welcome Package",
                link: "/settings/onboarding/welcome-package",
                permission: PERMISSIONS.ADMIN_MANAGE_ANY,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default sidebarData;
