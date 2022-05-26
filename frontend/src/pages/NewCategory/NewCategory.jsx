import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import axios from "axios";

import { getOperationCategories } from "../../utils/getDataFromServer";
import { useAuth } from "../../context/AuthContext";

const NewCategory = () => {
    const { auth } = useAuth();

    const [categoryName, setCategoryName] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: false,
    });

    const [categories, setCategories] = useState([]);

    const [showLoader, setShowLoader] = useState(false);
    const [showAlertFail, setShowAlertFail] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);

    async function fetchOperationsCategories() {
        const actualCategories = await getOperationCategories(auth);
        setCategories(actualCategories);
    }

    useEffect(() => {
        fetchOperationsCategories();
    }, []);

    const handleValidations = (evt) => {
        evt.preventDefault();
        if (!categoryName) {
            setFormErrors({ ...formErrors, name: true });
            return;
        } else {
            setFormErrors({ ...formErrors, name: false });
        }

        saveData();
    };
    const saveData = async () => {
        setShowLoader(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/categories/new",
                { name: categoryName },
                {
                    headers: {
                        Authorization: auth,
                    },
                }
            );

            if (res.status === 200) {
                setShowAlertOk(true);
                setShowLoader(false);
                fetchOperationsCategories();
                setTimeout(() => {
                    setShowAlertOk(false);
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
                    Nueva categoría
                </Typography>
                <TextField
                    error={formErrors.name}
                    required
                    fullWidth
                    label="Nombre de categoría"
                    value={categoryName}
                    onChange={(evt) => {
                        setCategoryName(evt.target.value);
                        setFormErrors({ ...formErrors, name: false });
                    }}
                />
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
            <hr style={{ marginTop: "50px" }}></hr>
            <Grid container spacing={2} marginTop={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="initial">
                        Categorias
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewCategory;
