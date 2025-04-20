    'use client';

    import {
        ColumnDef,
        ColumnFiltersState,
        SortingState,
        VisibilityState,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        useReactTable,
    } from '@tanstack/react-table';
    import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SearchIcon } from 'lucide-react';
    import * as React from 'react';

    import { Button } from '@/components/ui/button';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { formatText } from '@/lib/utils';

    interface CustomDataTableProps<T> {
        columns: ColumnDef<T>[];
        data: T[];
        filterColumn: string;
        searchPlaceHolder?: string;
        renderSheet: (trigger: React.ReactNode, row: any) => React.ReactNode;
        onRowClick?: (row: T) => void;
    }

    export function CustomDataTable<T>({ data, columns, filterColumn, searchPlaceHolder, renderSheet, onRowClick }: CustomDataTableProps<T>) {
        const [sorting, setSorting] = React.useState<SortingState>([]);
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
        const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
        const [rowSelection, setRowSelection] = React.useState({});
        const [pagination, setPagination] = React.useState({
            pageIndex: 0,
            pageSize: 10,
        });

        const safeColumns = Array.isArray(columns) ? columns : [];

        const table = useReactTable({
            data,
            columns: safeColumns,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
            onPaginationChange: setPagination,

            state: {
                sorting,
                columnFilters,
                columnVisibility,
                rowSelection,
                pagination,
            },
        });

        if (!safeColumns.length) {
            return <div>No columns defined for the table.</div>;
        }
        return (
            <div className="w-full">
                {/* Search button and Adjustable columns */}
                <div className="flex items-center pb-6">
                    <Input
                        placeholder={searchPlaceHolder}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
                        className="max-w-sm py-5 shadow-sm"
                        icon={<SearchIcon className="h-5" />}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto py-5 shadow-sm">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {formatText(column.id)}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Table */}
                <div className="rounded-md border shadow-sm">
                    <Table>
                        <TableHeader className="h-14 bg-[#F1F4F9]">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) =>
                                    renderSheet(
                                        <TableRow onClick={() => onRowClick?.(row.original)} key={row.id} data-state={row.getIsSelected() && 'selected'} className="cursor-pointer">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="h-14">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>,
                                        row.id,
                                    ),
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns?.length ?? 1} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-20" id="rows-per-page">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft />
                            </Button>
                            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft />
                            </Button>
                            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
