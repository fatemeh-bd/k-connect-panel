import React, { useRef, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);

// Define types for props
interface InputHeader {
    ParameterName: string;
    Id: string;
}

interface QueryParameters {
    [key: string]: string | number | boolean;
}

interface CustomeDataTableProps {
    inputHeaders?: InputHeader[];
    queryParameters?: QueryParameters;
}

const CustomeDataTable: React.FC<CustomeDataTableProps> = ({
    inputHeaders = [],
    queryParameters = {},
}) => {
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const [, setSearchParams] = useState<QueryParameters>(queryParameters);
    const tableRef = useRef<any>(null);
    const columns = [
        { data: 'name', name: '', orderable: false, width: '', autoWidth: '', title: 'title', searchable: true, visible: true },
        { data: 'position', name: 'position', orderable: true, width: '', autoWidth: '', title: 'position', searchable: true, visible: true },
        { data: 'office', name: 'office', orderable: false, width: '', autoWidth: '', title: 'office', searchable: true, visible: true },
        { data: 'extn', name: 'extn', orderable: false, width: '', autoWidth: '', title: 'extn', searchable: true, visible: true },
        { data: 'start_date', name: 'start_date', orderable: false, width: '', autoWidth: '', title: 'start_date', searchable: true, visible: true },
        { data: 'salary', name: 'salary', orderable: false, width: '', autoWidth: '', title: 'salary', searchable: true, visible: true },
    ];

    const handleInputChange = (id: string, value: string) => {
        // Update search parameters
        setSearchParams((prev) => ({ ...prev, [id]: value }));
        let api = tableRef.current!.dt();
        // Trigger table redraw or reload
        if (tableRef.current) {
            api.draw();
        }
    };


    // DataTable options
    const tableOptions = {
        processing: true,
        serverSide: true,
        paging: true, // Enables pagination
        responsive: true,
        pagingType: 'full_numbers',
        language: {
            sProcessing: 'لطفا منتطر بمانید ...',
            sZeroRecords: 'دیتایی برای نمایش وجود ندارد',
            infoEmpty: 'دیتایی برای نمایش وجود ندارد',
            emptyTable: 'دیتایی برای نمایش وجود ندارد',
            info: 'نمایش _START_ از _END_ از _TOTAL_ رکورد',
            lengthMenu: 'نمایش _MENU_ رکورد',
            infoFiltered: ' - فیلتر از بین  _MAX_ رکورد',
            paginate: {
                last: 'آخرین',
                first: 'اولین',
                next: 'بعدی',
                previous: 'قبلی',
            },
            search: 'جستجو :  ',
            searchPlaceholder: 'جستجو',
        },
        lengthMenu: [10, 20, 50, 100, 150, 200, 300, 500, 700, 1000], // Pagination options
        pageLength: 10, // Default number of rows per page
    };

    const ajaxConfig = {
        url: "/tickets.json",
        type: "POST",
        contentType: "application/json",
        // beforeSend: (xhr: XMLHttpRequest) => {
        //     // Add JWT token to the Authorization header
        //     xhr.setRequestHeader("Authorization", `Bearer hwt`);
        // },
        data: (params: Record<string, any>) => {
            // Collect dynamic query parameters based on input field values
            const updatedParams = inputHeaders.reduce((acc, header) => {
                const inputRef = inputRefs.current[header.Id];
                if (inputRef && inputRef.value) {
                    // Add the input value directly to the query parameters
                    acc[header.ParameterName] = inputRef.value;
                }
                return acc;
            }, {} as Record<string, string>);

            // Return the updated params with the custom dynamic query parameters
            return JSON.stringify({
                ...params,
                ...updatedParams, // Merge the dynamically collected query params
            });
        },

    };

    return (

        <div>
            <style>

            </style>
            {/* Input fields for dynamic parameters */}
            {inputHeaders.map((header) => (
                <div key={header.Id}>
                    <label htmlFor={header.Id}>{header.ParameterName}</label>
                    <input
                        id={header.Id}
                        placeholder={header.ParameterName}
                        ref={(el) => (inputRefs.current[header.Id] = el)} // Proper ref assignment
                        onChange={(e) => handleInputChange(header.Id, e.target.value)} // Correct event handling
                    />
                </div>
            ))}

            <DataTable

                ref={tableRef} // Access to DataTable instance

                ajax={ajaxConfig}
                columns={columns}
                className="display"
                options={tableOptions}
            >
            </DataTable>
        </div>
    );
};

export default CustomeDataTable;
