import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import axios from 'axios';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const SalesOverview = ({todayCount}: {todayCount: number}) => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const monthIndex = new Date().getMonth() + 1;

    // select
    const [month, setMonth] = useState<number>(monthIndex)
    const [seriesChat, setSeriesChat] = useState<any>({
        name: 'Earnings this month',
        data: [],
    })
    const [optionsChat, setOptionsChat] = useState<any>({
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 7,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 10,
        },
        xaxis: {
            categories: [],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    })
    
    useEffect(() => {
        const newOption = [];
        const newSeries = [];
        const userId = 'lucas0524';

        for(let i = 0; i < days[month - 1]; i ++) {
            newOption.push(`${month}/${i + 1}`)
            newSeries.push(0)
        }

        const fetchAPI = async () => {
            const res = await axios.get(`http://localhost:3001/bidInfo?userId=${userId}&month=${month}`);

            for (let i = 0; i < res.data.length; i++) {
                const date = res.data[i].date;
                newSeries[date - 1] = res.data[i].count;
            }
        }

        fetchAPI();

        setOptionsChat({optionsChat,
            xaxis: {
                categories: newOption
            }
        })
        console.log('!!!', {...seriesChat,
            data: newSeries
        });
        setSeriesChat({...seriesChat,
            data: newSeries
        })
    }, [ month, todayCount ])

    useEffect(() => {
        console.log('<><><>', seriesChat);
    }, [seriesChat])

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    return (

        <DashboardCard title="Bid Count" action={
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
                    options={optionsChat}
                    series={[seriesChat]}
                    type="area"
                    height={370} width={"100%"}
                />
                {JSON.stringify(seriesChat)}
            </div>
        </DashboardCard>
    );
};

export default SalesOverview;
