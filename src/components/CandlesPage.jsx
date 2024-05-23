import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts"
import {IconButton, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

export default function CandlesPage() {
    const navigate = useNavigate();

    const {ticker} = useParams();
    const [candles, setCandles] = useState([]);

    const options = {
        chart: {
            type: "candlestick",
        },
        title: {
            text: ticker,
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function loadCandles() {
            try {
                const newCandles = await fetchCandles(controller.signal, ticker);

                setCandles(newCandles);
            } catch (error) {
                console.error('Error fetching shares:', error);
            }
        }

        loadCandles()

        return () => {
            // controller.abort();
        };
    }, [])

    return (
        <div className="candles">
            <div className="candles-inner">
                <IconButton className="candles-back" area-label="back" size="large" onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                </IconButton>
                <div className="candles-chart">
                    <Chart series={[{data: candles}]} options={options} type="candlestick" height="100%"/>
                </div>
            </div>
        </div>
    )
}

async function fetchCandles(signal, ticker) {
    const endPoint = `http://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?interval=60&iss.reverse=true`;
    const res = await fetch(endPoint, {signal});
    const response = await res.json();

    const candles = response["candles"]["data"].map(item => {
        const open = item[0];
        const close = item[1];
        const high = item[2];
        const low = item[3];
        const begin = item[6];
        const end = item[7];

        return {
            x: getMiddleDate(end, begin),
            y: [open, high, low, close]
        };
    });

    return candles;
}

function getMiddleDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const timestamp1 = d1.getTime();
    const timestamp2 = d2.getTime();

    const middleTimestamp = (timestamp1 + timestamp2) / 2;

    return new Date(middleTimestamp);
}