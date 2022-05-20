import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./styles.scss";

const OperationsTable = (props) => {
    const { rows, columns, height } = props;
    return (
        <div style={{ height, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
};
export default OperationsTable;
