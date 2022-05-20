import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OperationsTable from "../../components/OperationsTable/OperationsTable";

import { getOperationsByType } from "../../utils/getDataFromServer";

const Operations = () => {
    const [inOperations, setInOperations] = useState([]);
    const [outOperations, setOutOperations] = useState([]);

    useEffect(() => {
        async function fetchOperationsByTypeIn() {
            const inOperations = await getOperationsByType(1);
            setInOperations(inOperations);
        }
        async function fetchOperationsByTypeOut() {
            const outOperations = await getOperationsByType(2);
            setOutOperations(outOperations);
        }

        fetchOperationsByTypeIn();
        fetchOperationsByTypeOut();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "concept", headerName: "Concepto", width: 200 },
        { field: "amount", headerName: "Monto", width: 200 },
        { field: "date", headerName: "Fecha", width: 200 },
        {
            field: "operation_type",
            headerName: "Tipo de operacion",
            width: 200,
        },
        {
            field: "operation_category",
            headerName: "Categoria de operacion",
            width: 200,
        },
    ];

    return (
        <Container>
            <Typography variant="h4" marginTop={3} marginBottom={3}>
                Ingresos
            </Typography>
            {inOperations.length !== 0 ? (
                <OperationsTable
                    columns={columns}
                    rows={inOperations}
                    height={450}
                ></OperationsTable>
            ) : (
                ""
            )}

            <Typography variant="h4" marginTop={3} marginBottom={3}>
                Egresos
            </Typography>
            {outOperations.length !== 0 ? (
                <OperationsTable
                    columns={columns}
                    rows={outOperations}
                    height={450}
                ></OperationsTable>
            ) : (
                ""
            )}
        </Container>
    );
};

export default Operations;
