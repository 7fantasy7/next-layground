"use client";

import React, {Fragment, useEffect, useState} from 'react';

import type {ColumnDef, PaginationState, Row, Table as ReactTable,} from '@tanstack/react-table';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';

import classNames from 'clsx';
// import IconButton from '~/core/ui/IconButton';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {Button} from "@/components/ui/button";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  renderSubComponent?: (props: {
    row: Row<T>
  }) => React.ReactElement;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  className?: string;
}

// export default function Board
export default function Table /*<T>*/
({
   data,
   columns,
   renderSubComponent,
   pageIndex,
   pageSize,
   pageCount,
   onPaginationChange,
   className,
 }: ReactTableProps</*T*/any>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, onPaginationChange]);

  return (
    // <div className="flex flex-col">
    //   <div className="overflow-x-auto">
    //     <div className="inline-block min-w-full py-1">
    //       <div className="overflow-hidden p-1">
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className={classNames(`Table min-w-full divide-y divide-gray-200`, className)}>
              <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}
                        className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr
                    className={classNames({
                      'bg-gray-50 transition-colors dark:bg-black-300':
                        row.getIsExpanded(),
                    })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        style={{
                          width: cell.column.getSize(),
                        }}
                        className="px-6 py-2 whitespace-nowrap"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>

                  {renderSubComponent ? (
                    <tr key={row.id + '-expanded'}>
                      <td colSpan={columns.length}>
                        {renderSubComponent({row})}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
              </tbody>
            </table>
          </div>

          <Pagination table={table}/>
        </div>
      </div>
    </div>
  );
};

function Pagination<T>({
                         table,
                       }: React.PropsWithChildren<{
  table: ReactTable<T>;
}>) {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronDoubleLeftIcon className={'h-5'}/>
      </Button>

      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className={'h-5'}/>
      </Button>

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className={'h-5'}/>
      </Button>

      <Button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronDoubleRightIcon className={'h-5'}/>
      </Button>

      <span className="flex items-center gap-1 text-sm">
        <div>Page</div>

        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
    </div>
  );
}

// export default Table;