import React, { useState } from "react"
import { Card, CardHeader, CardContent, TextField, Button, FormControl } from "@mui/material"
import DropdownMenu from "../dropdown-menu"
import data from "../../data/frontend_developer_practice.json"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import { sectorToType } from "../../utils/sector-to-type"
import { sectorToProduct } from "../../utils/sector-to-products"
import { roundNumber } from "../../utils/round-number"
import { ISector, IProduct, IColour, IProjectType } from "../../models"
import "./index.css"

/** Redecoration is required for the period of *REDECORATION_SPAN* years */
const REDECORATION_SPAN = 30

interface IValues {
    sector: ISector;
    product: IProduct;
    colour: IColour;
    type: IProjectType;
    area: number;
}

export default function CalculationForm() {
    const [result, setResult] = useState<any>({
        submitted: false
    })
    const initialValues: IValues = { sector: {}, product: {}, colour: {}, type: {}, area: 0 }

    const validationSchema = yup.object().shape({
        sector: yup.object().required("Required"),
        type: yup.object().required("Required"),
        product: yup.object().required("Required"),
        colour: yup.object().required("Required"),
        area: yup.number().required("Required")
    })

    const handleSubmit: any = (values: any) => {
        const requiredRedecorations = Math.floor(REDECORATION_SPAN / values.product.redecorationCycle);
        const cycleCost = roundNumber(values.area * values.product.price * values.sector.costMultiplier)
        const totalCost = roundNumber(cycleCost * requiredRedecorations)

        setResult({ submitted: true, cycleCost, totalCost })
    }

    return (
        <div className="col-md-8 col-sm-12">
            <Card className="mt-3">
                <CardHeader title="Calculation Form">Calculation Form</CardHeader>
                <CardContent>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, values, setFieldValue, handleReset, dirty, touched }) => {
                            return (
                                <Form className="w-100">
                                    <div className="d-flex flex-column  w-100 justify-content-center">
                                        <div className="w-75 d-flex justify-space-around align-items-center flex-column">
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
                                                    <FormControl className="w-100 m-2 d-flex align-items-center">
                                                        <TextField
                                                            className="w-75"
                                                            label="Painting area"
                                                            placeholder="Painting area"
                                                            size="small"
                                                            type="number"
                                                            value={values.area}
                                                            onChange={e => setFieldValue("area", e.target.value)}
                                                            error={!!errors?.area}
                                                            helperText={touched?.area && errors?.area}
                                                        />
                                                    </FormControl>

                                                )}
                                            </Field>
                                        </div>

                                    </div>

                                    <div className="w-100 d-flex justify-content-end m-2 px-5">
                                        <Button className="me-2" variant="outlined" color="primary" onClick={handleReset} >
                                            Clear
                                        </Button>
                                        <Button className="ms-2" type="submit" variant="contained" color="primary" disabled={!dirty}>
                                            Submit
                                        </Button>
                                    </div>

                                </Form>)
                        }}

                    </Formik>
                </CardContent>
            </ Card >

            {result.submitted && (
                <Card className="mt-3">
                    <CardHeader title="Cost" />

                    <CardContent className="d-flex flex-column align-items-start ms-4">
                        <p>
                            <strong>Cost of one cycle:</strong> {result.cycleCost}
                        </p>
                        <p>
                            <strong>Total cost over {REDECORATION_SPAN} years:</strong> {result.totalCost}
                        </p>
                    </CardContent>
                </Card>
            )}

        </div>
    )
}