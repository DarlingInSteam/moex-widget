import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Stock({searchTerm}) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchShares("group", "stock_shares");
                setRows(response);
            } catch (error) {
                console.error('Error fetching shares:', error);
            }
        }

        fetchData();
    }, []);

    async function fetchShares(groupBy, groupByFilter) {
        const endPoint = `https://iss.moex.com/iss/securities.json?engine=stock&market=shares&group_by=${groupBy}&group_by_filter=${groupByFilter}&q=${searchTerm}`;
        const response = (await fetch(endPoint)).json();

        const securities = response["securities"];

        return securities["data"].map(async (item) => {
            const ticker = item[securities["columns"].indexOf("secid")];
            const shortname = item[securities["columns"].indexOf("shortname")];
            const board = item[securities["columns"].indexOf("marketprice_boardid")];

            const endPoint = `https://iss.moex.com/iss/engines/stock/markets/shares/boards/${board}/securities/${ticker}.json`
            const marketData = (((await fetch(endPoint)).json()).then(r => r))["marketdata"];

            console.log(marketData);
            const columns = marketData["columns"];

            return createShare(ticker, shortname, board,
                marketData[columns.indexOf("OPEN")], marketData[columns.indexOf("LOW")],
                marketData[columns.indexOf("HIGH")], marketData[columns.indexOf("LAST")]);
        });
    }

    function createShare(ticker, shortname, board, open, low, high, last) {
        return {ticker, shortname, board, open, low, high, last};
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Ticker</TableCell>
                        <TableCell align="right">Board</TableCell>
                        <TableCell align="right">Open</TableCell>
                        <TableCell align="right">Low</TableCell>
                        <TableCell align="right">High</TableCell>
                        <TableCell align="right">Last</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.shortname}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.shortname}
                            </TableCell>
                            <TableCell align="right">{row.ticker}</TableCell>
                            <TableCell align="right">{row.board}</TableCell>
                            <TableCell align="right">{row.open}</TableCell>
                            <TableCell align="right">{row.low}</TableCell>
                            <TableCell align="right">{row.high}</TableCell>
                            <TableCell align="right">{row.last}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

