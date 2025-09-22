//Define an interface for the Dashboard sidebar menu
interface SubItem {
  label: string;
  link?: string;
  subItems?: SubItem[];
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
}

interface MenuItem {
  id: number;
  label: string;
  icon?: string;
  link?: string;
  subItems?: SubItem[];
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
}

export interface SidebarCategory {
  id: number;
  category: string;
  items: MenuItem[];
}
