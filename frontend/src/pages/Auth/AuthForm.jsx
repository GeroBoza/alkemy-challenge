import {
    Container,
    TextField,
    Typography,
    Button,
    Grid,
    Alert,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AuthForm = () => {
    const navigate = useNavigate();

    const [auth, setAuth] = useContext(AuthContext);

    const [mode, setMode] = useState("signIn");
    const [showLoader, setShowLoader] = useState(false);
    const [showAlertFail, setShowAlertFail] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);

    const [signUpFormValues, setSignUpFormValues] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    const [signInFormValues, setSignInFormValues] = useState({
        email: "",
        password: "",
    });

    const [signUpFormErrors, setSingUpFormErrors] = useState({
        name: false,
        phone: false,
        email: false,
        password: false,
    });
    const [signInFormErrors, setSingInFormErrors] = useState({
        email: false,
        password: false,
    });

    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [repeatedPasswordError, setRepeatedPasswordError] = useState(false);
    const [equalPasswordError, setEqualPasswordError] = useState(false);

    const signUpFields = [
        { fieldTitle: "Nombre", value: "name" },
        { fieldTitle: "Teléfono", value: "phone" },
        { fieldTitle: "Email", value: "email" },
        { fieldTitle: "Contraseña", value: "password" },
    ];
    const signInFields = [
        { fieldTitle: "Email", value: "email" },
        { fieldTitle: "Contraseña", value: "password" },
    ];

    const handleSignUpValues = (name, value) => {
        setSignUpFormValues({
            ...signUpFormValues,
            [name]: value,
        });
    };
    const handleSignInValues = (name, value) => {
        setSignInFormValues({
            ...signInFormValues,
            [name]: value,
        });
    };

    const validateSignUpForm = (evt) => {
        evt.preventDefault();
        if (!signUpFormValues["name"]) {
            setSingUpFormErrors({
                ...signUpFormErrors,
                name: true,
            });
            return;
        }
        if (!signUpFormValues["phone"]) {
            setSingUpFormErrors({
                ...signUpFormErrors,
                phone: true,
            });
            return;
        }
        if (!signUpFormValues["email"]) {
            setSingUpFormErrors({
                ...signUpFormErrors,
                email: true,
            });
            return;
        }
        if (!signUpFormValues["password"]) {
            setSingUpFormErrors({
                ...signUpFormErrors,
                password: true,
            });
            return;
        }
        if (!repeatedPassword) {
            setRepeatedPasswordError(true);
            return;
        }
        if (repeatedPassword !== signUpFormValues["password"]) {
            setEqualPasswordError(true);
            return;
        }

        signUp();
    };
    const validateSignInForm = (evt) => {
        evt.preventDefault();
        if (!signInFormValues["email"]) {
            setSingInFormErrors({
                ...signInFormErrors,
                email: true,
            });
            return;
        }
        if (!signInFormValues["password"]) {
            setSingInFormErrors({
                ...signInFormErrors,
                password: true,
            });
            return;
        }
        signIn();
    };

    const signUp = async () => {
        try {
            setShowLoader(true);
            const res = await axios.post(
                "http://localhost:3000/users/register",
                signUpFormValues
            );
            setShowLoader(false);
            if (res.data.register === true) {
                setShowAlertOk(true);
                setTimeout(() => {
                    setShowAlertOk(false);
                    setMode("signIn");
                }, 3000);
            } else {
                setShowAlertFail(true);
                setTimeout(() => {
                    setShowAlertFail(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const signIn = async () => {
        try {
            setShowLoader(true);
            const res = await axios.post(
                "http://localhost:3000/users/login",
                signInFormValues
            );
            setShowLoader(false);

            if (res.data.auth === true) {
                localStorage.setItem("jwt-token", res.data.token);
                setAuth(res.data.token);
                navigate("/");
            } else {
                setShowAlertFail(true);
                setTimeout(() => {
                    setShowAlertFail(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkErrors = (value) => {
        setSingUpFormErrors(!signUpFormErrors[value]);
        setSingInFormErrors(!signInFormErrors[value]);
    };

    return (
        <Container sx={{ marginTop: "7%", width: "45%" }}>
            {mode === "signUp" ? (
                <>
                    <GenericForm
                        title={"Registrarse"}
                        fields={signUpFields}
                        formValues={signUpFormValues}
                        parentCallback={handleSignUpValues}
                        formErrors={signUpFormErrors}
                        checkErrors={checkErrors}
                    >
                        <TextField
                            error={repeatedPasswordError || equalPasswordError}
                            helperText={
                                equalPasswordError === true
                                    ? "Las contraseñas no coinciden"
                                    : ""
                            }
                            type="password"
                            required
                            fullWidth
                            label="Repetir contraseña"
                            value={repeatedPassword}
                            onChange={(evt) => {
                                setRepeatedPassword(evt.target.value);
                                setEqualPasswordError(false);
                                setRepeatedPasswordError(false);
                            }}
                        />
                    </GenericForm>
                </>
            ) : mode === "signIn" ? (
                <GenericForm
                    title={"Iniciar sesión"}
                    fields={signInFields}
                    formValues={signInFormValues}
                    parentCallback={handleSignInValues}
                    formErrors={signInFormErrors}
                    checkErrors={checkErrors}
                />
            ) : (
                ""
            )}

            <Grid container>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={"center"}
                    marginBottom={2}
                >
                    <Button
                        variant="contained"
                        onClick={(evt) =>
                            mode === "signUp"
                                ? validateSignUpForm(evt)
                                : validateSignInForm(evt)
                        }
                    >
                        {mode === "signUp" ? "Registrarse" : "Iniciar sesión"}
                    </Button>
                </Grid>

                <Grid item xs={12} textAlign="center">
                    {mode === "signUp" ? (
                        <Typography variant="p" color="initial">
                            Ya tienes cuenta?
                            <Button onClick={() => setMode("signIn")}>
                                Inicia sesión
                            </Button>
                        </Typography>
                    ) : (
                        <Typography variant="p" color="initial">
                            No tienes cuenta?
                            <Button onClick={() => setMode("signUp")}>
                                Registrate
                            </Button>
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={12}>
                    {showAlertOk === true ? (
                        <Alert severity="success">
                            Operación creada con éxito!
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
            </Grid>
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

export default AuthForm;
