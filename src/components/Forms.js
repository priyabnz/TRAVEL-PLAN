import React, { useState, useRef, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { addDays, addMonths } from 'date-fns';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import Select from './Common/Select';
import MultiSelect from './Common/MultiSelect';
import { FORM_VALIDATION_SCHEME, INITIAL_FORM_VALUES } from '../libs/constant';
import { getCity, paramsFormData } from '../libs/helper';
import { getCitiesDistance } from '../api';
import * as Yup from 'yup';

const Forms = () => {
  const { search, href } = window.location;
  const history = useHistory();
  const ref = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM_VALUES);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function queryParams() {
      const params = new URLSearchParams(search);
      const stateData = paramsFormData(params);
      setFormData(stateData);
    }
    queryParams();
  }, []);

  const copyFormData = () => {
    const queryString = Object.entries(ref.current.values ?? {}).reduce((acc, current) => {
      return acc += `${current[0]}=${current[1]}&`
    }, "?");
    copy(`${href}${queryString}`);
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <div className='row'>
      <div className='col-md-8'>
      <h2>Travel Plan</h2>
        <Formik
          innerRef={ref}
          initialValues={formData}
          enableReinitialize={true}
          validationSchema={FORM_VALIDATION_SCHEME}
          onSubmit={async (values) => {
            const { distances, destinationToMap } = await getCitiesDistance(values);
            history.push({
              pathname: '/result', state: {
                distances, formData,
                destination: destinationToMap
              }
            });
          }}
        >
          {({ setFieldValue, values }) => {
            return <>
              <Form onKeyDown={onKeyDown} data-testid="form">
                <div className='form-group'>
                  <label htmlFor="startCity"> Start City </label>
                  <Field id="startCity" name="startCity">
                    {(field) => (
                      <div>
                        <Select
                          {...field}
                          name="startCity"
                          value={getCity(values.startCity)}
                          onChange={(e) => setFieldValue("startCity", e.value)} />
                        <ErrorMessage name="startCity" data-testid="startCityError" component="div" />
                      </div>
                    )}
                  </Field>
                </div>
                {
                  values.showIntermediateCity && <div className='form-group'>
                    <label htmlFor="intermediateCity">Intermediate City</label>
                    <Field id="intermediateCity" name="intermediateCity">
                      {({ field }) => (
                        <>
                          <MultiSelect
                            {...field}
                            name="intermediateCity"
                            value={values.intermediateCity ? getCity(values.intermediateCity.split(","), "intermediateCity") : ""}
                            onChange={(e) => {
                              const selectedValues = e.map((selected) => selected.value).join(", ");
                              setFieldValue("intermediateCity", selectedValues);
                            }} />
                          <ErrorMessage name="intermediateCity" data-testid="intermediateCityError" component="div" />
                        </>
                      )}
                    </Field></div>
                }
                <div className='form-group'>
                  <label htmlFor="endCity">End City</label>
                  <Field id="endCity" name="endCity">
                    {({ field }) => (
                      <div>
                        <Select
                          {...field}
                          value={getCity(values.endCity)}
                          name="endCity"
                          onChange={(e) => setFieldValue("endCity", e.value)} />
                        <ErrorMessage name="endCity" data-testid="endCityError" component="div" />
                      </div>
                    )}
                  </Field>
                </div>

                <label htmlFor="addIntermediateCity">Add Intermediate City</label> &nbsp;
                <Field name="addIntermediateCity">
                  {({
                    field
                  }) => (
                    <>
                      <input {...field}
                        checked={values.showIntermediateCity}
                        onChange={(e) => {
                          setFieldValue("showIntermediateCity", e.target.checked)
                        }}
                        type="checkbox" />
                      <ErrorMessage name="addIntermediateCity" data-testid="addIntermediateCityError" component="div" />
                    </>
                  )}
                </Field>

                <div className='form-group'>
                  <label htmlFor="dateRange">Select Date</label>
                  <Field id="dateRange" name="dateRange">
                    {({ field }) => (
                      <>
                        <DatePicker
                          {...field}
                          selectsRange={true}
                          startDate={values.startDate}
                          endDate={values.endDate}
                          className="form-control"
                          minDate={new Date()}
                          maxDate={addMonths(new Date(), 2)}
                          onChange={(date) => {
                            const [startDate = null, endDate = null] = date;
                            setFieldValue("startDate", startDate)
                            setFieldValue("endDate", endDate)
                          }}
                          isClearable={true}
                        />
                        <ErrorMessage name="startDate" data-testid="startDateError" component="div" />
                        <ErrorMessage name="endDate" data-testid="endDateError" component="div" />
                      </>
                    )}
                  </Field>
                </div>

                <div className='form-group'>
                  <label htmlFor="passengers">Passengers</label>
                  <Field name="passengers">
                    {({
                      field
                    }) => (
                      <>
                        <input {...field} className="form-control" type="number" placeholder="Enter Passengers" />
                        <ErrorMessage name="passengers" data-testid="passengersError" component="div" />
                      </>
                    )}
                  </Field>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
              </Form>
            </>
          }}
        </Formik>
      </div>
      <div className='col-md-4'>
        <button className='btn btn-primary share-link' onClick={() => copyFormData()}>Share Link</button>
      </div>
    </div>
  )
}

export default Forms;