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
import { useState, useEffect , useMemo} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Dashboard = () => {

  const standard = 160;
  const [standardUpdown, setStandardUpDown] = useState<boolean>(false); // Up: true, Down: false

  const [ todayCount, setTodayCount ] = useState<number>(0);
  const {user} = useSelector((state : RootState) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try{
        const resToday = await axios.get(`http://localhost:3001/bidInfo/todayInfo/?userId=${user?.id}`);
 
        if (resToday.data.length > 0) {
          setTodayCount(resToday.data[0].count);
        } 
      } catch (error) {
        console.error("error occur");
      } finally {
        setLoading(false);
      }
    }
    fetchAPI();
  }, []);
  const standardPercent = useMemo(() => 
    Math.floor(Math.abs(todayCount - standard) * 100 / standard), 
    [todayCount, standard]
  );
  useEffect(() => {
    // Standard Part
    if (standard < todayCount) {
      setStandardUpDown(true);
    } else {
      setStandardUpDown(false);
    }
    //console.log('Today count has changed:', todayCount);
  }, [todayCount]); 

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
                <WeeklyInfo todayCount={todayCount} />
              </Grid>
              <Grid item xs={12}>
                <TodayInfo 
                  standardInfo={
                    {count: standard,
                    dir: standardUpdown,
                    percent: standardPercent
                  }} 
                  todayCount={todayCount} 
                  setTodayCount={setTodayCount}
                />
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
