/**
 * https://formik.org/docs/tutorial
 * These input controls are wired to Formik
 * They need to be under a Formik component tree
 */
import React from 'react'
import { Form } from 'react-bootstrap'
import { useField } from 'formik'

export function MyBaseInput({ label, helpText, description, required, ...props }) {
  const [field, meta] = useField(props)

  return (
    <>
      {/* Optional label (e.g. FieldArray) */}
      {label ? (
        <Form.Label htmlFor={props.id || props.name} className={description ? 'mb-0' : null}>
          {label} {required && <abbr title="required">*</abbr>}
        </Form.Label>
      ) : null}

      {/* Optional description */}
      {description ? (
        <Form.Text htmlFor={props.id || props.name} className='text-muted mt-0 mb-2'>
          {description}
        </Form.Text>
      ) : null}

      <Form.Control
        // Show all the Bootstrap error goodies
        isInvalid={meta.touched && meta.error}
        {...field}
        {...props}
      />
      {helpText ? <Form.Text>{helpText}</Form.Text> : null}
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      {/* <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback> */}
    </>
  )
}

export function MyEmailInput(props) {
  return <MyBaseInput type="email" {...props} />
}

export function MyTextInput(props) {
  return <MyBaseInput type="text" {...props} />
}

export function MySelect(props) {
  return <MyBaseInput as="select" custom {...props} />
}

export function MyCheckbox({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <>
      <Form.Check
        custom
        isInvalid={meta.touched && meta.error}
        feedback={meta.touched && meta.error}
        label={label}
        {...field}
        {...props}
      />
    </>
  )
}