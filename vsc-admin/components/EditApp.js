import { useMutation } from 'react-query';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyTextInput } from './MyInput';
import { editApp } from '../services/applicationService';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  id: 'id',
  applicationName: 'applicationName',
}

const validationSchema = Yup.object({
  [paramMap.id]: Yup.string().required(),
  [paramMap.applicationName]: Yup.string().required(),
})

export default function EditApp({ handleClose, refetch, setSubmissionStatus, app }) {
  const { mutate, error } = useMutation(editApp, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleClose()
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  const initialValues = {
    id: app.id,
    applicationName: app.applicationName,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      {(values) => <FormikForm>
        <Row className="mt-2">
          <div>
            <Form.Row>
              <Col className="pl-3">
                {/* Package Name */}
                <MyTextInput
                  label="Application Name"
                  id="applicationName"
                  name={paramMap.applicationName}
                  placeholder="Basic App"
                  required
                  className="mb-3"
                />
              </Col>
            </Form.Row>
          </div>
        </Row>

        <div className='d-flex flex-row mb-3'>
          <button onClick={() => handleClose()}>Cancel</button>
          <button disabled={values.isSubmitting} type='submit'>Submit</button>
        </div>
      </FormikForm>}
    </Formik>
  )
}
