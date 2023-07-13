
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
        field: 'headline',
        headerName: 'Headline',
        width: 700,
        renderCell: (params: GridValueGetterParams) => (
            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginLeft: '20px' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'symbol',
        headerName: 'Symbol',
        width: 200,
        renderCell: (params: GridValueGetterParams) => (
            <div style={{ marginLeft: '20px' }}>{params.value}</div>
        ),
    },
];



const DataTable = () => {
    const [stockData, setStockData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-company-outlook',
                    {
                        params: {
                            symbol: 'AMRN',
                            region: 'US',
                            lang: 'en-US',
                        },
                        headers: {
                            'X-RapidAPI-Key': '3638c1b634msh3e57b9d4671dcb2p1c3010jsn776cd725dd88',
                            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                        },
                    }
                );
                const significantDevelopments = response.data.finance.result.significantDevelopments;
                const formattedData = significantDevelopments.map((dev, index) => ({
                    id: dev.id,
                    date: dev.date,
                    headline: dev.headline,
                    symbol: dev.symbol,
                }));
                setStockData(formattedData);
                setFilteredData(formattedData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (params) => {
        setCurrentPage(params.page);
        setPageSize(params.pageSize);
    };

    const handlePageSizeChange = (params) => {
        setPageSize(params.pageSize);
        setCurrentPage(1);
    };

    const handleRowSelection = (params) => {
        setSelectedRows(params.selection);
    };

    const handleSearch = (value) => {
        const newData = stockData.filter(
            (row) =>
                row.id.toString().includes(value) ||
                row.date.includes(value) ||
                row.headline.includes(value) ||
                row.symbol.includes(value)
        );
        setFilteredData(newData);
    };

    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="justify-content-center mt-5 ms-5 me-5" style={{ textAlign: 'center' }}>
            <Box sx={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: '200px' }}
                />

            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={paginatedData}
                    columns={columns}
                    pageSize={pageSize}
                    checkboxSelection
                    onSelectionModelChange={handleRowSelection}
                    onPageChange={handlePageChange}
                    rowCount={filteredData.length}
                    pagination
                />
            </Box>

        </div>
    );
};

export default DataTable;
