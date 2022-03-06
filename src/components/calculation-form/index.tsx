import React from "react"
import { Card, CardHeader, CardContent, TextField, Button, CardActionArea, FormControl } from "@mui/material"
import DropdownMenu from "../dropdown-menu"
import data from "../../data/frontend_developer_practice.json"
import "./index.css"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import { sectorToType } from "../../utils/sector-to-type"
import { sectorToProduct } from "../../utils/sector-to-products"

export default function CalculationForm() {

    const initialValues: any = { sector: {}, product: {}, colour: {}, type: {}, area: null }

    const validationSchema = yup.object().shape({
        sector: yup.object().required(),
        type: yup.object().required(),
        product: yup.object().required(),
        colour: yup.object().required(),
        area: yup.number().required()
    })

    return (
        <Card className="form-card mt-3">
            <CardHeader title="Calculation Form">Calculation Form</CardHeader>
            <CardContent>
                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={() => console.log("submitted")}
                >
                    {({ errors, values, setFieldValue }) => {
                        return (
                            <Form >
                                <div className="d-flex flex-row w-100">
                                    <div className="w-75 d-flex justify-space-around flex-column">
                                        <Field name="sector">
                                            {(formProps: any) => (
                                                <DropdownMenu items={data.sectors}
                                                    formProps={formProps}
                                                    placeholder="Sectors" />
                                            )}
                                        </Field>
                                        <Field name="colour">
                                            {(formProps: any) => (
                                                <DropdownMenu items={data.colour}
                                                    formProps={formProps}
                                                    placeholder="Colours" />
                                            )}
                                        </Field>
                                    </div>

                                    <div className="w-75 d-flex justify-space-around flex-column">
                                        <Field name="product">
                                            {(formProps: any) => (
                                                <DropdownMenu items={sectorToProduct(values.sector?.name) || []}
                                                    formProps={formProps}
                                                    disabled={Object.keys(values.sector).length === 0}
                                                    placeholder="Products" />
                                            )}
                                        </Field>
                                        <Field name="type">
                                            {(formProps: any) => (
                                                <DropdownMenu items={sectorToType(values.sector?.name) || []}
                                                    formProps={formProps}
                                                    disabled={Object.keys(values.sector).length === 0}
                                                    placeholder="Project types" />
                                            )}
                                        </Field>

                                        <Field name="area" >
                                            {() => (
                                                <FormControl className="w-100 m-2">
                                                    <TextField
                                                        className="w-75"
                                                        label="Painting area"
                                                        placeholder="Painting area"
                                                        size="small"
                                                        type="number"
                                                        value={values.area}
                                                        onChange={e => setFieldValue("area", e.target.value)}

                                                    />
                                                </FormControl>

                                            )}
                                        </Field>
                                    </div>

                                </div>

                                <div className="w-100 d-flex justify-content-end m-2 px-5">
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </div>

                            </Form>)
                    }}

                </Formik>
            </CardContent>
        </ Card >
    )
}