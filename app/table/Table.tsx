// components/Table.js

import React, {useMemo, useState} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";
import {DebouncedInput} from "./DebouncedInput";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table = ({
                        data: tableData,
                        columns: tableColumns,
                        title,
                        searchable = true,
                        searchPlaceholder = "Search",
                        isLoading = false,
                      }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const rowsPerPage = table.getRowModel().rows.length;

  // Calculate the current range of records being displayed
  const startIndex = useMemo(() => pageIndex * pageSize, [pageIndex, pageSize]);
  const endIndex = useMemo(
    () => startIndex + (rowsPerPage || 1 - 1),
    [startIndex, rowsPerPage]
  );

  return (
    <div className="flex flex-col">
      <div
        className={`overflow-hidden sm:-mx-6 lg:-mx-8  ${
          !searchable && "mt-6"
        }`}
      >
        <div className="align-middle inline-block w-full sm:px-6 lg:px-8">
          {searchable && (
            <div className="py-5">
              {isLoading && (
                <div className="w-full py-3">
                  <div className="relative animate-pulse flex items-center justify-between">
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              )}
              {!isLoading && (
                <div className="w-full">
                  <div className="relative rounded-md">
                    <DebouncedInput
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(String(value))}
                      placeholder={searchPlaceholder}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            className={`bg-white border-[#D4D4D8] border px-6 py-4 whitespace-nowrap flex  ${
              title ? "justify-between" : "justify-end"
            }`}
          >
            <div>{title && <h3 className="text-sm font-bold">{title}</h3>}</div>

            {!isLoading && table.getPageCount() > 0 && (
              <div className="text-xs text-gray-500 flex gap-8 items-center justify-between">
                <span className="flex items-center gap-1">
                  <div>Showing</div>
                  {startIndex + 1} - {endIndex} of {table.getPageCount()}{" "}
                  {table.getPageCount() > 1 ? "pages" : "page"}
                </span>

                {(table.getCanPreviousPage() || table.getCanNextPage()) && (
                  <div>
                    <button
                      className={` ${
                        table.getCanPreviousPage()
                          ? "text-black"
                          : "text-[#9CA3AF]"
                      } `}
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        viewBox="0 0 17 17"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g></g>
                        <path
                          d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
                      </svg>
                    </button>
                    <button
                      className={`ml-4 ${
                        table.getCanNextPage() ? "text-black" : "text-[#9CA3AF]"
                      } `}
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        viewBox="0 0 17 17"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g></g>
                        <path
                          d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="overflow-auto w-full border border-[#D4D4D8] border-t-0">
            <table className="w-full divide-y divide-[#D4D4D8]">
              <thead className="bg-white bg-white divide-y divide-[#D2E1EF] border-t-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick:
                                header.column.getToggleSortingHandler(),
                            }}
                          >
                            <div className="flex items-center">
                                <span className="ml-2">
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </span>

                              {/* sort icons  */}
                              {header.column.getCanSort() && (
                                <div className="flex flex-col ml-3">
                                  {{
                                    asc: (
                                      <svg
                                        className="w-2 h-2 "
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 15l7-7 7 7"
                                        ></path>
                                      </svg>
                                    ),
                                    desc: (
                                      <svg
                                        className="w-2 h-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 9l-7 7-7-7"
                                        ></path>
                                      </svg>
                                    ),
                                  }[header.column.getIsSorted()] ?? (
                                    <>
                                      {" "}
                                      <svg
                                        className="w-2 h-2 "
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 15l7-7 7 7"
                                        ></path>
                                      </svg>
                                      <svg
                                        className="w-2 h-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 9l-7 7-7-7"
                                        ></path>
                                      </svg>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
              </thead>
              <tbody className="bg-white divide-y divide-[#D2E1EF]">
              {/* if isLoading, use skeleton rows  */}
              {isLoading &&
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    {table.getHeaderGroups()[0].headers.map((header) => {
                      return (
                        <td
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <div className="flex items-center w-full">
                            <div className="text-sm text-gray-900 w-full">
                              <TdSkeleton/>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              {!isLoading &&
                table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id} className="hover:bg-gray-100">
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TdSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-5 bg-gray-200 animate-pulse"></div>
    </div>
  );
};