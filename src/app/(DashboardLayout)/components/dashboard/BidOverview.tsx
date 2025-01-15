import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import axios from 'axios';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const BidOverview = ({todayCount}: {todayCount: number}) => {
    const monthIndex = new Date().getMonth() + 1;

    const [month, setMonth] = useState<number>(monthIndex);
    const [chartInfo, setChartInfo] = useState({
        series: [{
            name: "This Day's Bid Count",
            data: []
        }],
        options: {
            chart: {
                type: 'line',
                fontFamily: "'Plus Jakarta Sans', sans-serif;",
                foreColor: '#adb0bb',
                zoom: {
                    enabled: false
                },
                height: 350,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: [],
            },
        }
    });

    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const newOption: string[] = [];
        const newSeries: number[] = [];
        const userId = 'lucas0524';

        for(let i = 0; i < days[month - 1]; i ++) {
            newOption.push(`${i + 1}`)
            newSeries.push(0)
        }

        const fetchAPI = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3001/bidInfo?userId=${userId}&month=${month}`);
                for (let i = 0; i < res.data.length; i++) {
                    const date = res.data[i].date;
                    newSeries[date - 1] = res.data[i].count;
                }
        
                setChartInfo({
                    series: [{
                        name: "This Day's Bid Count",
                        data: newSeries
                    }],
                    options: {
                        chart: {
                            type: 'line',
                            fontFamily: "'Plus Jakarta Sans', sans-serif;",
                            foreColor: '#adb0bb',
                            zoom: {
                                enabled: false
                            },
                            height: 350,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'],
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: newOption,
                        },
                    }
                });
            } catch (error) {
                console.error("Error fetching month data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAPI();
    }, [ month, todayCount ])

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    return (
        <DashboardCard 
            title="Bid Count" 
            action={
                <Select
                    labelId="month-dd"
                    id="month-dd"
                    value={month}
                    size="small"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Jan 2025</MenuItem>
                    <MenuItem value={2}>Feb 2025</MenuItem>
                    <MenuItem value={3}>Mar 2025</MenuItem>
                    <MenuItem value={4}>Apr 2025</MenuItem>
                    <MenuItem value={5}>May 2025</MenuItem>
                    <MenuItem value={6}>Jun 2025</MenuItem>
                    <MenuItem value={7}>Jul 2025</MenuItem>
                    <MenuItem value={8}>Agu 2025</MenuItem>
                    <MenuItem value={9}>Sep 2025</MenuItem>
                    <MenuItem value={10}>Oct 2025</MenuItem>
                    <MenuItem value={11}>Nov 2025</MenuItem>
                    <MenuItem value={12}>Dec 2025</MenuItem>
                </Select>
            }>
            <div>
                <Chart
                    options={chartInfo.options}
                    series={chartInfo.series}
                    type="line"
                    height={370} width={"100%"}
                />
            </div>
        </DashboardCard>
    );
};

export default BidOverview;
