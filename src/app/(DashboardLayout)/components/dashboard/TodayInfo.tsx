
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Button } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Props } from "react-apexcharts";

interface TodayInfoPropsType {
  todayCount: number;
  setTodayCount: (todayCount: number) => void;
}

const TodayInfo = ({todayCount, setTodayCount}: TodayInfoPropsType) => {
  // chart color
  const theme = useTheme();
  const errorlight = '#fdede8';

  useEffect(() => {
    const fetchAPI = async () => {

      const userId = 'lucas0524';
      //console.log(`http://localhost:3001/bidInfo?userId=${userId}`);
      const res = await axios.get(`http://localhost:3001/bidInfo?userId=${userId}`);

      if (res.data.length > 0) {
        setTodayCount(res.data[0].count);
      } else {
        setTodayCount(0);
      }
      //console.log(res.data);
    }

    fetchAPI();
  }, [ ])

  const handleCount = async () => {
    setTodayCount(todayCount + 1);
    if(todayCount == 0) {
      const res = await axios.post("http://localhost:3001/bidInfo", {
        userId: 'lucas0524',
        count: 1
      });

      //console.log(res);
    } else if (todayCount > 0) {
      const res = await axios.put("http://localhost:3001/bidInfo", {
        userId: 'lucas0524',
        count: todayCount + 1
      });

      //console.log(res);
    }
  }

  return (
    <DashboardCard
      title="Today's Count"
      // action={
      //   <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
      //     <IconCurrencyDollar width={24} />
      //   </Fab>
      // }
      // footer={
      //   <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
      // }
    >
      <>
        <Stack direction="row" spacing={10}>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            {todayCount}
          </Typography>
          <Button onClick={handleCount} variant="contained"  disableElevation color="secondary" >
            Bid
          </Button>
        </Stack>        
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last day
          </Typography>
          <Typography variant="h3" fontWeight="700" mt="-20px">
          133
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            standard
          </Typography>
          <Typography variant="h3" fontWeight="700" mt="-20px">
          120
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TodayInfo;
