import { React } from "react";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const GenericForm = (props) => {
    const {
        title,
        fields,
        formValues,
        children,
        parentCallback,
        formErrors,
        checkErrors,
    } = props;

    const changeValues = (name, value) => {
        parentCallback(name, value);
    };

    const resetErrors = (value) => {
        checkErrors(value);
    };

    return (
        <Box className="box-form" component="form" autoComplete="off">
            <Typography variant="h4" textAlign={"center"} color="initial">
                {title}
            </Typography>
            {fields.map((field, i) => (
                <TextField
                    key={i}
                    error={formErrors[field.value]}
                    // helperText="No puede estar vacio"
                    type={field.value === "password" ? "password" : "text"}
                    required
                    fullWidth
                    label={field.fieldTitle}
                    name={field.value}
                    value={formValues[`${field.value}`]}
                    onChange={(evt) => {
                        const { name, value } = evt.target;
                        changeValues(name, value);
                        resetErrors(field.value);
                        // setFormErrors({ ...formErrors, concept: false });
                    }}
                />
            ))}

            {children}
        </Box>
    );
};

export default GenericForm;
