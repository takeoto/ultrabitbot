import Chart from "chart.js/auto";
import React, {useEffect, useRef, useState} from "react";

export default function MVRVZScore() {
    const canvasEl = useRef(null);

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    const [dataApi, setDataApi] = useState(null);

    useEffect(() => {
        fetch('/api/chart/mvrv-z-score?' + new URLSearchParams({
            a: 'btc',
            s: 1683666000,
            i: '24h'
        }))
            .then((res) => res.json())
            .then((data) => setDataApi(data));
    }, []);
    useEffect(() => {
        if (!dataApi) return;

        const ctx = canvasEl.current.getContext("2d");
        // const ctx = document.getElementById("myChart");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const weight = [];
        const labels = [];
        dataApi.forEach((v) => {
            labels.push(new Date(v['t'] * 1000).toDateString());
            weight.push(v['v']);
        });
        const myLineChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        // backgroundColor: gradient,
                        backgroundColor: colors.purple.half,
                        label: "My First Dataset",
                        data: weight,
                        fill: true,
                        borderWidth: 2,
                        borderColor: colors.purple.default,
                        lineTension: 0.2,
                        pointBackgroundColor: colors.purple.default,
                        pointRadius: 3
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 20
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

    return <canvas ref={canvasEl}/>;
}