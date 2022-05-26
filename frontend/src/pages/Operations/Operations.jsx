import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import OperationsTable from "../../components/OperationsTable/OperationsTable";

import {
    getOperationsByType,
    getOperationCategories,
    getOperationsByCategory,
} from "../../utils/getDataFromServer";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

const Operations = () => {
    const navigate = useNavigate();

    const { auth } = useAuth();

    const [inOperations, setInOperations] = useState([]);
    const [outOperations, setOutOperations] = useState([]);
    const [categoryOperations, setCategoryOperations] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");

    const [selectedValue, setSelectedValue] = useState("type");

    const [open, setOpen] = useState(false);
    const [selectedOperationToDelete, setSelectedOperationToDelete] =
        useState("");

    const [showLoader, setShowLoader] = useState(false);
    const [showAlertFail, setShowAlertFail] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedOperationToDelete(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function fetchOperationsByTypeIn() {
        const inOperations = await getOperationsByType(1, auth);
        setInOperations(inOperations);
    }
    async function fetchOperationsByTypeOut() {
        const outOperations = await getOperationsByType(2, auth);
        setOutOperations(outOperations);
    }
    useEffect(() => {
        async function fetchAllCategories() {
            const categories = await getOperationCategories(auth);
            categories.push({ id: "null", name: "Sin categoría" });
            setCategories(categories);
        }

        fetchOperationsByTypeIn();
        fetchOperationsByTypeOut();
        fetchAllCategories();
    }, []);

    const fetchOperationsByCategory = async (id) => {
        const fetchCategoryOperations = await getOperationsByCategory(id, auth);
        setCategoryOperations(fetchCategoryOperations);

        if (id === "null") {
            setCategoryTitle("Sin categoría");
            return;
        }
        const catTitle = categories.find((category) => category.id === id);
        setCategoryTitle(catTitle.name);
    };

    const handleDelete = async (id) => {
        setShowLoader(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/operations/delete",
                { id },
                {
                    headers: {
                        Authorization: auth,
                    },
                }
            );

            if (res.status === 200) {
                setShowAlertOk(true);
                setShowLoader(false);
                setTimeout(() => {
                    setShowAlertOk(false);
                }, 3000);
                if (selectedValue === "type") {
                    fetchOperationsByTypeIn();
                    fetchOperationsByTypeOut();
                } else if (selectedValue === "category") {
                    fetchOperationsByCategory(selectedCategory);
                }
            }
        } catch (error) {
            setShowLoader(false);
            setShowAlertFail(true);
            setTimeout(() => {
                setShowAlertFail(false);
            }, 3000);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "concept", headerName: "Concepto", width: 150 },
        { field: "amount", headerName: "Monto", width: 150 },
        { field: "date", headerName: "Fecha", width: 150 },
        {
            field: "operation_type",
            headerName: "Tipo de operacion",
            width: 150,
        },
        {
            field: "operation_category",
            headerName: "Categoria de operacion",
            width: 180,
        },
        {
            field: "actions",
            headerName: "Acciones",
            width: 250,
            renderCell: (params) => {
                return (
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                                navigate(`/operations/edit/${params.id}`)
                            }
                        >
                            Editar
                        </Button>

                        <Button
                            sx={{ marginLeft: "15px" }}
                            variant="contained"
                            color="error"
                            onClick={() => handleClickOpen(params.id)}
                        >
                            Eliminar
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Container>
            <Grid container marginTop={5}>
                <Grid item xs={12} marginBottom={3}>
                    {showAlertOk === true ? (
                        <Alert severity="success">
                            Operación eliminada con éxito!
                        </Alert>
                    ) : (
                        ""
                    )}
                    {showAlertFail === true ? (
                        <Alert severity="error">
                            Ocurrió un error, intente nuevamente!
                        </Alert>
                    ) : (
                        ""
                    )}
                </Grid>
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
                            {categories.length !== 0 ? (
                                categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    No hay categorias para seleccionar
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                ) : (
                    ""
                )}

                {selectedValue === "type" ? (
                    <Grid item xs={12} paddingBottom={5}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Está seguro que quiere eliminar la operación?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        No podrá revertir esta acción
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            handleDelete(selectedOperationToDelete);
                        }}
                        autoFocus
                    >
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={showLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};

export default Operations;
