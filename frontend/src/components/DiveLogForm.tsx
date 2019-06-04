import React, { useState } from "react";
import { sortBy } from "lodash-es";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DiveSiteSelect from './DiveSiteSelect'
import { IDiveSite, APIResults, createDiveLog } from '../api'

interface Props {
  getDiveSites: (q?: any) => Promise<APIResults<IDiveSite>>;
  onSubmitted?: Function,
  onCanceled?: () => void
}

const DiveLogForm = (props: Props) => {
  const { 
    getDiveSites,
    onSubmitted,
    onCanceled
  } = props;
  return (
    <Formik
      initialValues={{
        date: new Date().toISOString().substring(0, 10),
        divesite_id: 1,
        meta: undefined,
        rating: undefined,
        notes: undefined
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        // if (values.divesite_id == null) return;
        // values.divesite_id = Number(values.divesite_id)
        const result = await createDiveLog(values);
        if (result.errors) {
          setErrors(result.errors);
        } else {
          if (onSubmitted != null) onSubmitted()
        }
      }}
    >
      {(props: any) => {
        const { errors, handleChange } = props;
        return (
          <Form>

            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <Field
                  name="date"
                  type="date"
                  data-display-mode="inline"
                  data-is-range="true"
                  data-close-on-select="false"
                />
              </div>
              <ErrorMessage name="date" />
            </div>
            <div className="field">
              <label className="label" htmlFor="">
                Time
              </label>
              <div className="control">
                <Field
                  type="time"
                  data-display-mode="inline"
                  data-is-range="true"
                  data-close-on-select="false"
                />
                <ErrorMessage name="time" />
              </div>
            </div>

            <div className="field">
              <label className="label">Dive Site</label>
              <div className="control">
                <DiveSiteSelect
                  name={'divesite_id'}
                  getDiveSites={getDiveSites}
                  handleChange={handleChange}
                />
                <ErrorMessage name="divesite_id" />
              </div>
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <div className="control">
                <textarea className="textarea" name="notes" />
                <ErrorMessage name="notes" />
              </div>
            </div>

            <div className="field">
              <label className="label">Meta</label>
              <div className="control">
                <textarea className="textarea" name="meta" />
                {errors.meta}
              </div>
            </div>

            <div className="field">
              <label className="label">Rating</label>
              <div className="control">
                <Field type="number" name="rating" />
                <ErrorMessage name="rating" />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Create</button>
              </div>
              <div className="control">
                <button className="button is-text" onClick={(e) => {
                  e.preventDefault()
                  if (onCanceled != null) onCanceled()
                }}>Cancel</button>
              </div>
            </div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DiveLogForm;
