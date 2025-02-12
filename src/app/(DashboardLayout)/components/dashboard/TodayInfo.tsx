"use client"; 
import { Stack, Typography, Avatar, Fab, Button } from '@mui/material';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCookie } from '@/services/api';

interface TodayInfoProps {
  standardInfo: {
    count: number,
    dir: boolean,
    percent: number
  },
  todayCount: number;
  setTodayCount: (count: number) => void;
}

const TodayInfo = ({ standardInfo, todayCount, setTodayCount }: TodayInfoProps) => {
  const theme = useTheme();
  const errorlight = theme.palette.error.light;
  const successlight = theme.palette.success.light;

  const [ lastCount, setLastCount ] = useState<number>(0);
  const [ lastDir, setLastDir ] = useState<boolean>(false);
  const [ lastPercent, setLastPercent ] = useState<number>(0);
  const {user} = useSelector((state : RootState) => state.auth);

  useEffect(() => {
    const fetchAPI = async () => {
      
      const resLast = await axios.get(`http://localhost:3001/bidInfo/lastInfo/?userId=${user?.id}`);

      if (resLast.data.length > 0) {
        setLastCount(resLast.data[0].count);
      } 
    }

    fetchAPI();
  }, [setTodayCount]);

  useEffect(() => {
    setLastPercent(lastCount ? Math.floor(Math.abs(todayCount - lastCount) * 100 / lastCount) : 0);    
    if (lastCount < todayCount) {
      setLastDir(true);
    } else {
      setLastDir(false);
    }
  }, [ lastCount, todayCount ]);

  const handleCount = async () => {
    const newCount = todayCount + 1;
    setTodayCount(todayCount + 1);

    await axios.post("http://localhost:3001/bidInfo/update/", {
      userId: user?.id,
      count: newCount
    });
  }

  return (
    <DashboardCard
      title="Today's Count">
      <>
        <Stack direction="row" spacing={10}>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            {todayCount}
          </Typography>
          <Button onClick={handleCount} variant="contained" disableElevation color="secondary" >
            Bid
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: lastDir ? successlight : errorlight, 
              width: 27, 
              height: 27 
            }}
          >
            {lastDir ? <IconArrowUp width={20} color="#39B69A" /> : <IconArrowDown width={20} color="#FA896B" />}
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {lastDir ? '+': '-'}{lastPercent}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Last Day
          </Typography>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            {lastCount}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: standardInfo.dir ? successlight : errorlight, 
              width: 27, 
              height: 27 
            }}
          >
            {standardInfo.dir ? <IconArrowUp width={20} color="#39B69A" /> : <IconArrowDown width={20} color="#FA896B" />}
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {standardInfo.dir ? '+': '-'}{standardInfo.percent}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Standard
          </Typography>
          <Typography variant="h3" fontWeight="700" mt="-20px">
            {standardInfo.count}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TodayInfo;
