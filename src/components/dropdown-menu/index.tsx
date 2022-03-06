import React, { useState } from "react"
import { Select, MenuItem, InputLabel, ListItemText, FormControl } from "@mui/material"

interface IProps {
    items: any[];
    placeholder: string;
    disabled?: boolean;
    formProps?: any;
}


export default function DropdownMenu({ items, placeholder, disabled = false, formProps }: IProps) {
    const fieldName = formProps.field.name;
    const { errors, values, setFieldValue, touched } = formProps.form;

    return (
        <FormControl className="w-100 m-2" size="small">
            <InputLabel className="bg-white" id={placeholder}>{placeholder}</InputLabel>
            <Select
                className="w-75"
                label="sector"
                labelId={placeholder}
                id={`${placeholder}-menu`}
                value={values[fieldName]}
                onChange={(event) => setFieldValue(fieldName, event.target.value)}
                disabled={disabled}
                variant="outlined"
                error={touched[fieldName] || errors[fieldName]}
            >
                {
                    items.map((currItem, index) => (
                        <MenuItem value={currItem} key={index}>
                            {currItem.name}
                        </ MenuItem>
                    ))
                }
            </Select>

        </FormControl>
    )
}