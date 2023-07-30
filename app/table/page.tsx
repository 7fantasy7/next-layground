"use client";

import {Table} from "./Table";
// import "./styles.css";
import {createColumnHelper} from "@tanstack/react-table";

const users = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    visits: 100,
    status: "Active",
    progress: 50
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    visits: 40,
    status: "Inactive",
    progress: 80
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Active",
    progress: 10
  }

  // you can add more
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <span
        className={`py-1 px-3 rounded-full text-sm ${info.getValue().toLowerCase() === "active" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}>
          {info.getValue()}{" "}
        </span>
    ),
    header: "Status",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
  }),
];

export default function App() {
  return (
    <div className="px-10">
      <Table data={users} columns={columns} title="User List"/>
    </div>
  );
}
