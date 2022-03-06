import React, { useState } from "react"
import { Card, CardHeader, CardContent } from "@mui/material"
import DropdownMenu from "../dropdown-menu"
import data from "../../data/frontend_developer_practice.json"
import "./index.css"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import { sectorToType } from "../../utils/sector-to-type"

export default function CalculationForm() {
    const [availableTypes, setAvailableTypes] = useState<any>([]);
    const [availableProducts, setAvailableProducts] = useState<any>([]);
    const [values, setValues] = useState<any>({
        sector: "",
        product: "",
        colour: "",
        type: ""
    })

    const validationSchema = yup.object().shape({
        sector: yup.object().required(),
        type: yup.object().required(),
        product: yup.object().required(),
        colour: yup.object().required(),
    })

    React.useEffect(() => {
        setAvailableTypes(sectorToType("Park"))
    }, [values.sector])

    return (
        <Card className="form-card mt-3">
            <CardHeader title="Calculation Form">Calculation Form</CardHeader>
            <CardContent>
                <Formik initialValues={{ sector: {}, product: {}, colour: {}, type: {} }}
                    validationSchema={validationSchema}
                    onSubmit={() => console.log("submitted")}
                >
                    {({ errors, touched, values, setFieldValue }) => {
                        return (
                            <Form className="d-flex flex-column">
                                <div className="d-flex justify-space-around">

                                    <Field name="sector">
                                        {(formProps: any) => (
                                            <DropdownMenu items={data.sectors}
                                                formProps={formProps}
                                                placeholder="sector" />
                                        )}
                                    </Field>
                                    <Field name="type">
                                        {(formProps: any) => (
                                            <DropdownMenu items={data.projectTypes}
                                                formProps={formProps}
                                                disabled={Object.keys(values.sector).length === 0}
                                                placeholder="project type" />
                                        )}
                                    </Field>
                                </div>
                            </Form>)
                    }}

                </Formik>

                {/* <div className="d-flex space-around m-2">
                        <DropdownMenu items={availableTypes} placeholder="Project Types" />
                        <DropdownMenu items={data.sectors} placeholder="Sectors" />

                    </div>
                    <div className="d-flex space-around m-2">
                        <DropdownMenu items={data.products} placeholder="Products" />
                        <DropdownMenu items={data.colour} placeholder="Colour" />
                    </div> */}
            </CardContent>
        </ Card >
    )
}