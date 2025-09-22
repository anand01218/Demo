# TableComponent Component

A reusable, responsive table component with built-in pagination and search functionality for the HRMS application.

## Features

- **Responsive Design**: Adapts to all screen sizes without overflow
- **Search Functionality**: Real-time search across all data fields
- **Pagination**: Configurable page sizes with navigation controls
- **Sorting**: Click column headers to sort data (ascending/descending)
- **Custom Rendering**: Flexible cell rendering with custom components
- **Loading States**: Built-in loading indicator
- **Empty States**: Customizable empty data message
- **TypeScript Support**: Full type safety with generic interfaces

## Usage

### Basic Implementation

```tsx
import TableComponent from "@/components/ui/TableComponent";
import { TableColumn } from "@/interface/TableComponent.interface";

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

const columns: TableColumn<User>[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`px-2 py-1 rounded ${
          value === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

const data: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "Active" },
];

export default function UserTable() {
  return (
    <TableComponent
      data={data}
      columns={columns}
      searchPlaceholder="Search users..."
      pageSize={10}
    />
  );
}
```

### Advanced Usage with Custom Rendering

```tsx
const columns: TableColumn<Employee>[] = [
  {
    key: "name",
    label: "Employee",
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center">
        <img src={row.avatar} className="w-8 h-8 rounded-full mr-3" />
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.position}</div>
        </div>
      </div>
    ),
  },
  {
    key: "salary",
    label: "Salary",
    sortable: true,
    render: (value) => `$${value.toLocaleString()}`,
  },
];
```

## Props

| Prop                | Type               | Default               | Description                         |
| ------------------- | ------------------ | --------------------- | ----------------------------------- |
| `data`              | `T[]`              | Required              | Array of data objects to display    |
| `columns`           | `TableColumn<T>[]` | Required              | Column configuration array          |
| `searchable`        | `boolean`          | `true`                | Enable/disable search functionality |
| `searchPlaceholder` | `string`           | `"Search..."`         | Placeholder text for search input   |
| `pageSize`          | `number`           | `10`                  | Number of rows per page             |
| `className`         | `string`           | `""`                  | Additional CSS classes              |
| `emptyMessage`      | `string`           | `"No data available"` | Message when no data                |
| `loading`           | `boolean`          | `false`               | Show loading state                  |

## Column Configuration

| Property   | Type                        | Description               |
| ---------- | --------------------------- | ------------------------- |
| `key`      | `keyof T \| string`         | Data property key         |
| `label`    | `string`                    | Column header text        |
| `sortable` | `boolean`                   | Enable sorting for column |
| `render`   | `(value, row) => ReactNode` | Custom cell renderer      |
| `width`    | `string`                    | CSS width class           |

## Styling

The component uses Tailwind CSS classes and follows a clean, professional design:

- Clean borders and subtle shadows
- Hover effects for better UX
- Responsive breakpoints
- Consistent spacing and typography
- Professional color scheme (grays, blues)

## Examples

See `src/components/examples/TableExample.tsx` for a complete implementation example.
