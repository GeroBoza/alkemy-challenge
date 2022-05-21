import {
    Container,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OperationsTable from "../../components/OperationsTable/OperationsTable";

import {
    getOperationsByType,
    getOperationCategories,
    getOperationsByCategory,
} from "../../utils/getDataFromServer";

const Operations = () => {
    const [inOperations, setInOperations] = useState([]);
    const [outOperations, setOutOperations] = useState([]);
    const [categoryOperations, setCategoryOperations] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");

    const [selectedValue, setSelectedValue] = useState("type");

    useEffect(() => {
        async function fetchOperationsByTypeIn() {
            const inOperations = await getOperationsByType(1);
            setInOperations(inOperations);
        }
        async function fetchOperationsByTypeOut() {
            const outOperations = await getOperationsByType(2);
            setOutOperations(outOperations);
        }

        async function fetchAllCategories() {
            const categories = await getOperationCategories();
            setCategories(categories);
        }

        fetchOperationsByTypeIn();
        fetchOperationsByTypeOut();
        fetchAllCategories();
    }, []);

    const fetchOperationsByCategory = async (id) => {
        const fetchCategoryOperations = await getOperationsByCategory(id);
        setCategoryOperations(fetchCategoryOperations);

        if (id === "null") {
            setCategoryTitle("Sin categoría");
            return;
        }
        const catTitle = categories.find((category) => category.id === id);
        setCategoryTitle(catTitle.name);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "concept", headerName: "Concepto", width: 180 },
        { field: "amount", headerName: "Monto", width: 180 },
        { field: "date", headerName: "Fecha", width: 180 },
        {
            field: "operation_type",
            headerName: "Tipo de operacion",
            width: 180,
        },
        {
            field: "operation_category",
            headerName: "Categoria de operacion",
            width: 180,
        },
    ];

    return (
        <Container>
            <Grid container marginTop={5}>
                <Grid item xs={4}>
                    <TextField
                        select
                        fullWidth
                        label="Mostrar por:"
                        value={selectedValue}
                        onChange={(evt) => {
                            setSelectedValue(evt.target.value);
                        }}
                    >
                        <MenuItem value="type">Tipo</MenuItem>
                        <MenuItem value="category">Categoria</MenuItem>
                    </TextField>
                </Grid>
                {selectedValue === "category" ? (
                    <Grid item xs={4} marginLeft={2}>
                        <TextField
                            select
                            fullWidth
                            label="Categoría:"
                            value={selectedCategory}
                            onChange={(evt) => {
                                setSelectedCategory(evt.target.value);
                                fetchOperationsByCategory(evt.target.value);
                            }}
                        >
                            {categories.length !== 0
                                ? categories.map((category) => (
                                      <MenuItem
                                          key={category.id}
                                          value={category.id}
                                      >
                                          {category.name}
                                      </MenuItem>
                                  ))
                                : ""}
                            <MenuItem value="null">Sin categoría</MenuItem>
                        </TextField>
                    </Grid>
                ) : (
                    ""
                )}

                {selectedValue === "type" ? (
                    <Grid item xs={12}>
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
                            "No hay operaciones"
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
                            "No hay operaciones"
                        )}
                    </Grid>
                ) : (
                    ""
                )}

                {selectedValue === "category" ? (
                    <Grid item xs={12}>
                        <Typography variant="h4" marginTop={3} marginBottom={3}>
                            {categoryTitle}
                        </Typography>
                        {categoryOperations.length !== 0 ? (
                            <OperationsTable
                                columns={columns}
                                rows={categoryOperations}
                                height={450}
                            ></OperationsTable>
                        ) : (
                            "No hay operaciones"
                        )}
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </Container>
    );
};

export default Operations;
