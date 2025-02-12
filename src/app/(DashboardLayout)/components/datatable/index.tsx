"use client";
// ** React and MUI Imports
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Types
interface DataGridTableProps<T> {
  data: T[]
  columnsConfig: GridColDef[]
  onShowMail: (mail: any) => void
}

const DataGridTable = <T extends { id: number; Subject: any; Body: any; Datetime: string; From: string; To: string }>({
  data,
  columnsConfig,
  onShowMail
}: DataGridTableProps<T>) => {
  return (
    <DataGrid className="rounded-lg shadow-lg bg-white"
      autoHeight
      rows={data}
      columns={columnsConfig}
      rowSelection={false}
      isRowSelectable={() => true}
      sx={{
        "& .MuiGrid-container": { backgroundColor: "#000000" , borderRadius: "10px" },
        "& .MuiDataGrid-main": { backgroundColor: "#f0f0f0", borderRadius: "10px" },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: "black", color: "black" },
        "& .MuiDataGrid-cell": { color: "black" },
        cursor: "pointer",
      }}
      onRowClick={(row) => onShowMail(row)}
    />
  )
}

export default DataGridTable
