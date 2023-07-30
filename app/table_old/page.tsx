"use client";

import Table from "./Table";
import React from "react";

export default function TablePage() {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: ''
    },
    {
      id: 2,
      name: 'John MacGuer',
      email: ''
    },
    {
      id: 3,
      name: 'Dwayne Johnson',
      email: 'dj@dj.com'
    },
    {
      id: 4,
      name: 'Jo Dua',
      email: 'dj@dj2.com'
    },
    {
      id: 5,
      name: 'Maryna Ada',
      email: 'adamovichmv@google.com'
    }, {
      id: 6,
      name: 'Lili Allen',
      email: 'lallen@gmail.com'
    }, {
      id: 7,
      name: 'Kisa Sasisa',
      email: 'kisa@sasisa.com'
    }, {
      id: 8,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    }, {
      id: 9,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    }, {
      id: 10,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    }, {
      id: 11,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    }, {
      id: 12,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    }, {
      id: 13,
      name: 'Duda Ramira',
      email: 'ramira@dadada.com'
    },
  ];

  const columns = [
    {
      id: 'id',
      header: 'Id',
      accessorKey: 'id',
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: 'email',
      header: 'Email',
      cell: (ctx) => {
        const {email} = ctx.row.original;

        return <span className='font-bold'>{email}</span>
      },
    },
  ];

  return (
    <div className="h-screen w-screen items-center justify-center">
      <h1 className="text-red-400 text-4xl font-mono mb-10">Table</h1>
      <div className="p-1"></div>
      <Table data={data} columns={columns}/>
    </div>
  )
}