import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Container,
    MenuItem,
    Typography,
} from "@mui/material";
import axios from "axios";

import "./styles.scss";

import {
    getOperationCategories,
    getOperationTypes,
} from "../../utils/getDataFromServer";
import { useNavigate } from "react-router-dom";

const NewOperation = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        concept: "",
        amount: "",
        date: "",
        user_id: 1,
        operation_type_id: "",
        operation_category_id: "",
    });

    const [formErrors, setFormErrors] = useState({
        concept: false,
        amount: false,
        date: false,
        operation_type_id: false,
        operation_category_id: false,
    });

    const [operationTypes, setOperationTypes] = useState([]);
    const [operationCategories, setOperationCategories] = useState([]);

    const [showLoader, setShowLoader] = useState(false);
    const [showAlertFail, setShowAlertFail] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);

    useEffect(() => {
        async function fetchOperationsTypes() {
            const types = await getOperationTypes();
            setOperationTypes(types);
        }
        async function fetchOperationsCategories() {
            const categories = await getOperationCategories();
            setOperationCategories(categories);
        }

        fetchOperationsTypes();
        fetchOperationsCategories();
    }, []);

    const handleValidations = (evt) => {
        evt.preventDefault();
        if (!formValues["concept"]) {
            setFormErrors({ ...formErrors, concept: true });
            return;
        } else {
            setFormErrors({ ...formErrors, concept: false });
        }

        if (!formValues["amount"]) {
            setFormErrors({ ...formErrors, amount: true });
            return;
        } else {
            setFormErrors({ ...formErrors, amount: false });
        }

        if (!formValues["date"]) {
            setFormErrors({ ...formErrors, date: true });
            return;
        } else {
            setFormErrors({ ...formErrors, date: false });
        }

        if (!formValues["operation_type_id"]) {
            setFormErrors({ ...formErrors, operation_type_id: true });
            return;
        } else {
            setFormErrors({ ...formErrors, operation_type_id: false });
        }
        console.log(formValues);

        saveData();
    };
    const saveData = async () => {
        setShowLoader(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/operations/new",
                formValues
            );
            console.log(res);
            if (res.status === 200) {
                setShowAlertOk(true);
                setShowLoader(false);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setShowLoader(false);
            setShowAlertFail(true);
            setTimeout(() => {
                setShowAlertFail(false);
            }, 3000);
        }
    };
    return (
        <Container sx={{ marginTop: "5%", width: "45%" }}>
            <Box
                className="box-form"
                component="form"
                autoComplete="off"
                onSubmit={handleValidations}
            >
                <Typography variant="h4" textAlign={"center"} color="initial">
                    Nueva operación
                </Typography>
                <TextField
                    error={formErrors.concept}
                    // helperText="No puede estar vacio"
                    required
                    fullWidth
                    label="Concepto"
                    value={formValues.concept}
                    onChange={(evt) => {
                        setFormValues({
                            ...formValues,
                            concept: evt.target.value,
                        });
                        setFormErrors({ ...formErrors, concept: false });
                    }}
                />
                <TextField
                    error={formErrors.amount}
                    required
                    fullWidth
                    label="Monto"
                    type={"number"}
                    value={formValues.amount}
                    onChange={(evt) => {
                        setFormValues({
                            ...formValues,
                            amount: evt.target.value,
                        });
                        setFormErrors({ ...formErrors, amount: false });
                    }}
                />
                <TextField
                    error={formErrors.date}
                    required
                    fullWidth
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    label="Fecha"
                    value={formValues.date}
                    onChange={(evt) => {
                        setFormValues({
                            ...formValues,
                            date: evt.target.value,
                        });
                        setFormErrors({ ...formErrors, date: false });
                    }}
                />
                <TextField
                    error={formErrors.operation_type_id}
                    required
                    fullWidth
                    select
                    label="Tipo"
                    value={formValues.operation_type_id}
                    onChange={(evt) => {
                        setFormValues({
                            ...formValues,
                            operation_type_id: evt.target.value,
                        });
                        setFormErrors({
                            ...formErrors,
                            operation_type_id: false,
                        });
                    }}
                >
                    {operationTypes.length !== 0 ? (
                        operationTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem></MenuItem>
                    )}
                </TextField>
                <TextField
                    error={formErrors.operation_category_id}
                    required
                    fullWidth
                    select
                    label="Categoria"
                    value={formValues.operation_category_id}
                    onChange={(evt) => {
                        setFormValues({
                            ...formValues,
                            operation_category_id: evt.target.value,
                        });
                        setFormErrors({
                            ...formErrors,
                            operation_category_id: false,
                        });
                    }}
                >
                    {operationCategories.length !== 0 ? (
                        operationCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem></MenuItem>
                    )}
                </TextField>
                <Box display={"flex"} justifyContent={"center"}>
                    <Button variant="contained" onClick={handleValidations}>
                        Guardar
                    </Button>
                </Box>
            </Box>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={showLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {showAlertOk === true ? (
                <Alert severity="success">Operación creada con éxito!</Alert>
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
        </Container>
    );
};

export default NewOperation;
