import { Container, Grid, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import OperatiosTable from "../../components/OperationsTable/OperationsTable";
import {
    getBalance,
    getLastTenOperations,
} from "../../utils/getDataFromServer";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { auth } = useAuth();

    const [balance, setBalance] = useState(0);
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        async function fetchOperationsBalance() {
            const balance = await getBalance(auth);
            setBalance(balance);
        }
        async function fetchAllOperations() {
            const lastTen = await getLastTenOperations(auth);
            setOperations(lastTen);
        }

        fetchAllOperations();
        fetchOperationsBalance();
    }, [auth]);

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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        textAlign={"center"}
                        padding={3}
                        textTransform={"uppercase"}
                    >
                        Balance total:{" "}
                        <span style={{ color: "#1876d1" }}>$ {balance}</span>
                    </Typography>
                </Grid>
                {operations.length !== 0 ? (
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="p" fontWeight={"bold"}>
                                ??ltimas 10 operaciones:
                            </Typography>
                        </Grid>
                        <OperatiosTable
                            rows={operations}
                            columns={columns}
                            height={650}
                        ></OperatiosTable>
                    </Grid>
                ) : (
                    "No tienes operaciones cargadas"
                )}
            </Grid>
        </Container>
    );
};

export default Home;
