import * as React from 'react';
import {Stack} from '@mui/material';
import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";

const FETCH_INTERVAL = 60 * 1000;

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        editable: false,
    },
    {
        field: "shortname",
        headerName: "Name",
        width: 100,
        editable: false,
    },
    {
        field: "ticker",
        headerName: "Ticker",
        width: 100,
        editable: false,
    },
    {
        field: "boardId",
        headerName: "Board Id",
        width: 100,
        editable: false,
    },
    {
        field: "open",
        headerName: "Open",
        width: 100,
        editable: false,
    },
    {
        field: "low",
        headerName: "low",
        width: 100,
        editable: false,
    },
    {
        field: "high",
        headerName: "High",
        width: 100,
        editable: false,
    },
    {
        field: "last",
        headerName: "last",
        width: 100,
        editable: false,
    },
]

export default function Stock({searchTerm}) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRows() {
            setLoading(true);

            try {
                const newRows = await fetchShares(controller.signal, {
                    query: searchTerm,
                    groupBy: "group",
                    groupByFilter: "stock_shares",
                });

                setRows(newRows);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching shares:', error);
            }
        }

        const fetchInterval = setInterval(fetchRows, FETCH_INTERVAL);

        fetchRows().then(r => {
        });

        return () => {
            controller.abort();
            clearInterval(fetchInterval);
        };
    }, [searchTerm])

    return (
        <Stack height={1}>
            {loading && <LinearProgress/>}
            <DataGrid
                autoHeight={true}
                rows={rows}
                columns={columns}
                onRowClick={(row) => {
                    navigate(`./${row.row.ticker}`)
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        }
                    }
                }}
                pageSizeOptions={[10]}
                disableColumnSelector
                disableRowSelectionOnClick
                disableColumnMenu
            />
        </Stack>
    )
}

async function fetchShares(signal, params) {
    const securities = await fetchSecurities(signal, params);
    const marketdata = await fetchMarketdata(signal);

    const idColumn = securities["columns"].indexOf("id");
    const tickerColumn = securities["columns"].indexOf("secid");
    const shortnameColumn = securities["columns"].indexOf("shortname");
    const boardIdColumn = securities["columns"].indexOf("marketprice_boardid");

    const marketdataTickerColumn = marketdata["columns"].indexOf("SECID");
    const marketdataOpenColumn = marketdata["columns"].indexOf("OPEN");
    const marketdataLowColumn = marketdata["columns"].indexOf("LOW");
    const marketdataHighColumn = marketdata["columns"].indexOf("HIGH");
    const marketdataLastColumn = marketdata["columns"].indexOf("LAST");

    const shares = [];
    for (let security of securities["data"]) {
        const id = security[idColumn];
        const ticker = security[tickerColumn];
        const shortname = security[shortnameColumn];
        const boardId = security[boardIdColumn];

        const securityMarketdata = marketdata["data"].find(item => item[marketdataTickerColumn] === ticker);

        const open = securityMarketdata !== undefined ? securityMarketdata[marketdataOpenColumn] : "";
        const low = securityMarketdata !== undefined ? securityMarketdata[marketdataLowColumn] : "";
        const high = securityMarketdata !== undefined ? securityMarketdata[marketdataHighColumn] : "";
        const last = securityMarketdata !== undefined ? securityMarketdata[marketdataLastColumn] : "";

        shares.push({
            id,
            ticker,
            shortname,
            boardId,
            open,
            low,
            high,
            last
        });
    }

    return shares;
}

async function fetchSecurities(signal, {query, groupBy, groupByFilter}) {
    const endPoint = `https://iss.moex.com/iss/securities.json?engine=stock&market=shares&group_by=${groupBy}&group_by_filter=${groupByFilter}&q=${query}`;
    const res = await fetch(endPoint, {signal});

    return (await res.json())["securities"];
}

async function fetchMarketdata(signal) {

    const endPoint = `https://iss.moex.com/iss/engines/stock/markets/shares/securities.json?limit=10&marketprice_board=1`;
    const res = await fetch(endPoint, {signal});

    return (await res.json())["marketdata"];
}