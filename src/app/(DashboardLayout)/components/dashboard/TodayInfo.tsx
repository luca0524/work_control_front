
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Button } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState } from "react";
import axios from 'axios';

const TodayInfo = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  //
  const [ todayCount, setTodayCount ] = useState(0)

  const handleCount = async () => {
    setTodayCount(todayCount + 1);
    const res = await axios.post("http://localhost:8080/bidCount", {
      first_name : "lucas",
      last_name : "morgan",
      bid_count : todayCount + 1
    });
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
