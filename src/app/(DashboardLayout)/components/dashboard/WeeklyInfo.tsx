
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useEffect, useState } from "react";
import axios from "axios";

const WeeklyInfo = ({todayCount}: {todayCount: number}) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const warning = theme.palette.warning.main;
  const successlight = theme.palette.success.light;

  const [lastWeekCount, setLastWeekCount] = useState<number>(0);
  const [thisWeekCount, setThisWeekCount] = useState<number>(0);
  const [weekDir, setWeekDri] = useState<boolean>(false);
  const [weekPercent, setWeekPercent] = useState<number>(0);

  const [seriescolumnchart, setSeriesColumnChart] = useState<any>([38, 40]);

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, warning],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  

  useEffect(() => {
    const fetchAPI = async () => {
      const userId = 'lucas0524';
      let weekCountInfo = {
        thisCount: thisWeekCount,
        lastCount: lastWeekCount
      };

      const resWeek = await axios.get(`http://localhost:3001/bidInfo/lastWeek?userId=${userId}`);

      if (resWeek.data.length > 0) {
        let lastCount = 0;
        for (let i = 0; i < resWeek.data.length; i++) {
          lastCount += resWeek.data[i].count;
        }
        setLastWeekCount(lastCount);
        weekCountInfo.lastCount = lastCount;
      } 

      const res = await axios.get(`http://localhost:3001/bidInfo/thisWeek?userId=${userId}`);

      if (res.data.length > 0) {
        let thisCount = 0;
        for (let i = 0; i < res.data.length; i++) {
          thisCount += res.data[i].count;
        }
        setThisWeekCount(thisCount);
        weekCountInfo.thisCount = thisCount;
      } 

      setSeriesColumnChart([weekCountInfo.thisCount, weekCountInfo.lastCount]);
      setWeekPercent(Math.floor(Math.abs(weekCountInfo.thisCount - weekCountInfo.lastCount) * 100 / weekCountInfo.lastCount));    
      if (weekCountInfo.lastCount < weekCountInfo.thisCount) {
        setWeekDri(true);
      } else {
        setWeekDri(false);
      }
    }

    fetchAPI();
  }, [todayCount]);

  return (
    <DashboardCard title="Weekly Count">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {thisWeekCount}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {weekDir? '+' : '-'}{weekPercent}%
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Typography variant="h5" color="textSecondary">
                last week
            </Typography>
            <Typography variant="h4" fontWeight="700">
              {lastWeekCount}
            </Typography>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={150} width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default WeeklyInfo;
