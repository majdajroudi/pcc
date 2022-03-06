import React, { useState, useMemo } from "react"
import { Card, CardHeader, CardContent, TextField, Button, CardActionArea, FormControl } from "@mui/material"
import DropdownMenu from "../dropdown-menu"
import data from "../../data/frontend_developer_practice.json"
import "./index.css"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import { sectorToType } from "../../utils/sector-to-type"
import { sectorToProduct } from "../../utils/sector-to-products"
import { roundNumber } from "../../utils/round-number"

/** Redecoration is required for the period of *REDECORATION_SPAN* years */
const REDECORATION_SPAN = 30

export default function CalculationForm() {
    const [result, setResult] = useState<any>({
        submitted: false
    })
    const initialValues: any = { sector: {}, product: {}, colour: {}, type: {}, area: 0 }

    const validationSchema = yup.object().shape({
        sector: yup.object().required(),
        type: yup.object().required(),
        product: yup.object().required(),
        colour: yup.object().required(),
        area: yup.number().required()
    })

    const handleSubmit: any = (values: any, { ...rest }) => {
        console.log("rest", values)
        const requiredRedecorations = Math.floor(REDECORATION_SPAN / values.product.redecorationCycle);
        const cycleCost = roundNumber(values.area * values.product.price * values.sector.costMultiplier)
        const totalCost = roundNumber(cycleCost * requiredRedecorations)

        setResult({ submitted: true, cycleCost, totalCost })
    }

    return (
        <div className="w-50">
            <Card className=" mt-3">
                <CardHeader title="Calculation Form">Calculation Form</CardHeader>
                <CardContent>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, values, setFieldValue, isValid, handleReset, dirty }) => {
                            return (
                                <Form className="w-100">
                                    <div className="d-flex flex-row w-100 justify-content-center">
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

                    <CardContent>
                        <p>cycle cost: {result.cycleCost}</p>
                        <p>total cost over {REDECORATION_SPAN} years: {result.totalCost}</p>
                    </CardContent>
                </Card>
            )}

        </div>
    )
}