import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const SalesOverview = () => {

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // select
    const [month, setMonth] = React.useState<number>(1)
    const [seriesChat, setSeriesChat] = useState<any>({
        name: 'Eanings this month',
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
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
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
        const newOption = []
        const newSeries = []
        for(let i = 0; i < days[month - 1]; i ++) {
            newOption.push(`${month}/${i + 1}`)
            const ran_number = Math.random() * 500
            newSeries.push(ran_number.toFixed(0))
        }

        setOptionsChat({optionsChat,
            xaxis: {
                categories: newOption
            }
        })
        setSeriesChat({seriesChat,
            data: newSeries
        })
    }, [ month ])

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    const seriescolumnchart: any = [
        {
            name: 'Eanings this month',
            data: [355, 390, 300, 350, 390, 180, 355, 390, 355, 390, 300, 350, 390, 180, 355, 390, 355, 390, 300, 350, 390, 180, 355, 390],
        },
    ];

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
            <Chart
                options={optionsChat}
                series={[seriesChat]}
                type="area"
                height={370} width={"100%"}
            />
        </DashboardCard>
    );
};

export default SalesOverview;
