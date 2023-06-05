import Chart from "chart.js/auto";
import React, {useEffect, useRef, useState} from "react";

export default function Sopr() {
    const canvasEl = useRef(null);
    const [dataApi, setDataApi] = useState(null);
    const [period, setPeriod] = useState('month');
    const [currency, setCurrency] = useState('btc');
    const [interval, setInterval] = useState('24h');
    const date = new Date();
    let from = null;

    switch (period) {
        case 'day':
            from = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
            break;
        case 'month':
            from = Math.floor(new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000);
            break;
        case 'year':
            from = Math.floor(new Date(date.getFullYear(), 1, 1).getTime() / 1000);
            break;
    }

    useEffect(() => {
        fetch('/api/chart/sopr?' + new URLSearchParams({a: currency, s: from, i: interval}))
            .then((res) => res.json())
            .then((data) => setDataApi(data));
    }, [from, interval, currency]);
    useEffect(() => {
        if (!Array.isArray(dataApi)) return;

        const ctx = canvasEl.current.getContext("2d");
        // const ctx = document.getElementById("myChart");

        const weight = [];
        const labels = [];
        dataApi.forEach((v) => {
            labels.push(new Date(v['t'] * 1000).toLocaleDateString(undefined, {timeZone: 'UTC'}));
            weight.push(v['v']);
        });
        const myLineChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        // backgroundColor: gradient,
                        backgroundColor: 'rgba(8,186,8,0.38)',
                        label: currency,
                        data: weight,
                        fill: true,
                        borderWidth: 2,
                        borderColor: '#08ba08',
                        lineTension: 0.2,
                        pointBackgroundColor: '#08ba08',
                        pointRadius: 3
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });

        return function cleanup() {
            myLineChart.destroy();
        };
    });

    return (
        <div className="chart-block">
            <canvas ref={canvasEl}/>
            <div className="actions">
                <div>
                    <h4>Period:</h4>
                    <button className={period === 'day' ? 'active' : ''} onClick={() => setPeriod('day')}>day</button>
                    <button className={period === 'month' ? 'active' : ''} onClick={() => setPeriod('month')}>month</button>
                    <button className={period === 'year' ? 'active' : ''} onClick={() => setPeriod('year')}>year</button>
                </div>
                <div>
                    <h4>Interval:</h4>
                    <button className={interval === '1h' ? 'active' : ''} onClick={() => setInterval('1h')}>1h</button>
                    <button className={interval === '24h' ? 'active' : ''} onClick={() => setInterval('24h')}>24h</button>
                </div>
                <div>
                    <h4>Currency:</h4>
                    <button className={currency === 'btc' ? 'active' : ''} onClick={() => setCurrency('btc')}>btc</button>
                    <button className={currency === 'eth' ? 'active' : ''} onClick={() => setCurrency('eth')}>eth</button>
                    <button className={currency === 'ltc' ? 'active' : ''} onClick={() => setCurrency('ltc')}>ltc</button>
                </div>
            </div>
        </div>
    );
}
