import { useMemo } from "react";
import { getReviewsForTable } from "~/models/review.server";
import {
  useTable,
  useGlobalFilter,
  ColumnWithLooseAccessor,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  reduceHooks,
  loopHooks,
} from "react-table";
import GlobalFilter from "./GlobalFilter/GlobalFilter";
import ChevronRight from "../Icons/ChevronRight";
import ChevronDoubleRight from "../Icons/ChevronDoubleRight";
import ChevronLeft from "../Icons/ChevronLeft";
import ChevronDoubleLeft from "../Icons/ChevronDoubleLeft";
import Button from "./Button/Button";
import RatingPill from "./RatingPill/RatingPill";
import PageButton from "./PageButton/PageButton";
import ImageCell from "./ImageCell/ImageCell";
import SortDown from "../Icons/SortDown";
import SortUp from "../Icons/SortUp";
import Sort from "../Icons/Sort";
import LinkCell from "./LinkCell/LinkCell";
import useBreakpoint from "~/utils/useBreakpoint";

interface ITableProps {
  reviews: Awaited<ReturnType<typeof getReviewsForTable>>;
  userId: string;
}

export default function Table({ reviews, userId }: ITableProps) {
  const reviewList = reviews.map((review) => {
    if (
      typeof review === "undefined" ||
      !review ||
      !review.bottle ||
      typeof review.bottle === "undefined"
    ) {
      throw Error(`Reviews are not passed correctly`);
    }
    return {
      name: review.bottle.name,
      type: review.bottle.type,
      distillery: review.bottle.distiller,
      producer: review.bottle.producer,
      date: review.date,
      rating: review.overallRating,
      imageId: `http://res.cloudinary.com/jpeckiii/image/upload/${userId}/${review.imageId}`,
      reviewId: `${review.id}`,
    };
  });

  const breakpoint = useBreakpoint() as number;

  const data = useMemo(() => reviewList, []);

  const columns: ColumnWithLooseAccessor[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ImageCell,
        imgAccessor: "imageId",
        dateAccessor: "date",
      },
      {
        Header: "Distillery",
        accessor: "distillery",
        show: breakpoint >= 640 ? true : false,
      },
      {
        Header: "Producer",
        accessor: "producer",
        show: breakpoint >= 768 ? true : false,
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Rating",
        accessor: "rating",
        Cell: RatingPill,
      },
      {
        Header: "Link",
        accessor: "reviewId",
        Cell: LinkCell,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns
          .filter((col: any) => col.show === false)
          .map((col) => col.id || col.accessor) as any,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <div className="flex gap-x-2 self-start">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 shadow sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-[auto] table-auto divide-y divide-gray-200 md:w-full"
              >
                {/* TABLE HEADER */}
                <thead className="bg-gray-50 md:w-full">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="table-row md:mx-4"
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDown className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <SortUp className="h-4 w-4 text-gray-400" />
                                )
                              ) : (
                                <Sort className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* TABLE BODY */}
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200 bg-white"
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-gray-100">
                        {row.cells.map((cell) => {
                          return (
                            // TABLE DATA
                            <td
                              {...cell.getCellProps()}
                              className="relative p-[0.5rem] px-4 py-4"
                              role="cell"
                            >
                              {/* TABLE CELL */}
                              {/* @ts-ignore-next-line */}
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-gray-500 md:mx-8">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* PAGINATION */}
            <div className="flex items-center justify-between py-3">
              {/* NEXT / PREVIOUS BUTTONS */}
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                {/* PAGE SIZE SELECTOR */}
                <div className="flex gap-x-2">
                  <span className="text-md align-bottom text-gray-700">
                    Page{" "}
                    <span className="text-sm font-medium">
                      {state.pageIndex + 1}
                    </span>{" "}
                    of{" "}
                    <span className="text-sm font-medium">
                      {pageOptions.length}
                    </span>
                  </span>
                  <label htmlFor="itemsPerPage">
                    <span className="sr-only">Items Per Page</span>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={state.pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      {[5, 10, 20].map((pageSize) => (
                        <option
                          value={pageSize}
                          key={pageSize}
                          className="text-xs"
                        >
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* PAGE BUTTONS */}
                <div>
                  <nav
                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">First</span>
                      <ChevronDoubleLeft
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className=""
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      className=""
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Last</span>
                      <ChevronDoubleRight
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
