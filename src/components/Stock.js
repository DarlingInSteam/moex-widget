import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from "react";

async function getShares(groupBy, groupByFilter, meta, date, start, limit) {
    const endPoint = `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?history.columns=SHORTNAME, SECID, OPEN, CLOSe, HIGH, LOW, MARKETPRICE2&group_by=${groupBy}&group_by_filter=${groupByFilter}&iss.meta=${meta}&start=${start}&limit=${limit}&date=${date}`;
    const response = (await fetch(endPoint)).json();
    console.log(response);
    const rows = response["history"]["data"].map(createShare(function (item) {
        return createShare(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
    }));
    console.log(rows);
    return rows;
}

function createShare(name, ticker, open, close, high, low, marketprice) {
    return { name, ticker, open, close, high, low, marketprice };
}

export default async function Stock() {
    const [rows, setRows] = useState(await getShares("group", "stock_shares", "off", "2024-02.13", "0", "100"));

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Ticker</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Open</TableCell>
                        <TableCell align="right">High</TableCell>
                        <TableCell align="right">Low</TableCell>
                        <TableCell align="right">Close</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.ticker}</TableCell>
                            <TableCell align="right">{row.marketprice}</TableCell>
                            <TableCell align="right">{row.open}</TableCell>
                            <TableCell align="right">{row.high}</TableCell>
                            <TableCell align="right">{row.low}</TableCell>
                            <TableCell align="right">{row.close}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}