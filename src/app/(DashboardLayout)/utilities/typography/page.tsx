'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import DataGridTable from '@/app/(DashboardLayout)/components/datatable';
import IconifyIcon from '@/app/(DashboardLayout)/icons/page';
import MailModal from '../../components/modal/MailModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const rows = [
  { id: 1, Subject: "Alice", Body: "Hello", Datetime: "2023-01-01 12:00:00", From: "Alice", To: "Bob" },
  { id: 2, Subject: "Alice", Body: "Hello", Datetime: "2023-01-01 12:00:00", From: "Alice", To: "Bob" },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Subject', headerName: 'Subject', width: 210 },
  { field: 'Body', headerName: 'Body', width: 230 },
  { field: 'Datetime', headerName: 'Datetime', width: 220 },
  { field: 'From', headerName: 'From', width: 210 },
  { field: 'To', headerName: 'To', width: 210 }, 
]

const TypographyPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [mails, setMails] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [mail, setMail] = useState<any>(null);

  const onShowMail = (mail: any) => {
    setMail(mails.find((m: any) => m.id === mail.id));
    setShow(true);
  }
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try{
        const res = await axios.get(`http://localhost:3001/messages/`);
        setMails(res.data.Emails);
      } catch (error) {
        console.error("error occur");
      } finally {
        setLoading(false);
      }
    }
    fetchAPI();
  }, []);
  const renderCell = (params: GridRenderCellParams) => (
    <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.value || 0} {/* Default to 0 if value is falsy */}
    </Typography>
  )
  // const columns: GridColDef[] = [
  //   {
  //     flex: 0.1,
  //     minWidth: 200,
  //     field: 'Subject',
  //     headerAlign: 'center',
  //     headerName: 'Subject',
  //     renderCell
  //   },
  //   {
  //     flex: 0.1,
  //     minWidth: 100,
  //     field: 'Datetime',
  //     headerName: 'DateTime',
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell
  //   },
  //   {
  //     flex: 0.2,
  //     minWidth: 100,
  //     field: 'Body',
  //     headerName: 'Content',
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 100,
  //     field: 'From',
  //     headerName: 'From',
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 100,
  //     field: 'To',
  //     headerName: 'To',
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell
  //   },
  //   {
  //     flex: 0.1,
  //     minWidth: 100,
  //     field: 'state',
  //     headerName: 'State',
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell: () => (
  //           <IconifyIcon
  //             icon='tabler:edit'
  //           />
  //         )
  //   }
  // ]
  return (
    <PageContainer title="Typography" description="this is Typography">

      <Grid container spacing={3} >
        <DataGridTable data={mails} columnsConfig={columns} onShowMail={onShowMail}/>
      </Grid >  
      <MailModal show={show} setShow={setShow} mail={mail}/>
    </PageContainer>
  );
};

export default TypographyPage;
