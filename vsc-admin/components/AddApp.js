import { useMutation } from 'react-query';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyTextInput } from './MyInput';
import { addApp } from '../services/applicationService';
import FileUploader from './FileUploader';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  applicationName: 'applicationName',
}

const validationSchema = Yup.object({
  [paramMap.applicationName]: Yup.string().required(),
})

const initialValues = {
  applicationName: '',
}

export default function AddApp({ handleClose, refetch, setSubmissionStatus }) {
  const { mutate, error } = useMutation(addApp, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleClose()
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

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
                  placeholder="Basic Application"
                  required
                  className="mb-3"
                />

                <FileUploader/>
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
