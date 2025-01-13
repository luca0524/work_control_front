'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import BidOverview from '@/app/(DashboardLayout)/components/dashboard/BidOverview';
import WeeklyInfo from '@/app/(DashboardLayout)/components/dashboard/WeeklyInfo';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import TodayInfo from '@/app/(DashboardLayout)/components/dashboard/TodayInfo';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [ todayCount, setTodayCount ] = useState<number>(0);
  useEffect(() => {

  }, [ TodayInfo ]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <BidOverview todayCount={todayCount}/>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <WeeklyInfo />
              </Grid>
              <Grid item xs={12}>
                <TodayInfo todayCount={todayCount} setTodayCount={setTodayCount}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
