import React from "react"
import { MenuItem, TextField, FormControl } from "@mui/material";
import { FieldProps } from "formik"
import "./index.css"

interface IProps {
    items: any[];
    placeholder: string;
    disabled?: boolean;
    formProps: FieldProps;
}


export default function DropdownMenu({ items, placeholder, disabled = false, formProps }: IProps) {
    const fieldName = formProps.field.name;
    const { errors, values, setFieldValue, touched } = formProps.form;

    return (
        <FormControl className="w-100 m-2 align-items-center">
            <TextField
                className="w-75"
                label={placeholder}
                size="small"
                select
                id={`${placeholder}-menu`}
                value={values[fieldName]}
                onChange={(event) => setFieldValue(fieldName, event.target.value)}
                disabled={disabled}
                variant="outlined"
                error={!!errors[fieldName]}
                helperText={touched[fieldName] && errors[fieldName]}
            >
                {
                    items.map((currItem, index) => (
                        <MenuItem value={currItem} key={index}>
                            {currItem.name}
                        </ MenuItem>
                    ))
                }
            </TextField>

        </FormControl>
    )
}