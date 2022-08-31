import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "position", headerName: "Position", width: 75 },
  { field: "age", headerName: "Age", type: "number", width: 50 },
  { field: "yearsRemaining", headerName: "Contract", width: 75 },
  { field: "capHit", headerName: "Cap Hit", type: "number", width: 125 },
  { field: "capPercentage", headerName: "Cap Percentage", type: "float" },
  { field: "clauses", headerName: "Clauses" },
  { field: "status", headerName: "Method Aquired" },
];

function PlayerTable(props) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.name}
        rows={props.players}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}

export default PlayerTable;
