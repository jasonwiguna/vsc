import { useMutation, useQuery } from 'react-query';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MySelect, MyTextInput } from './MyInput';
import { fetchApps } from '../services/applicationService';
import { editResource } from '../services/resourceService';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  id: 'id',
  resourceName: 'resourceName',
  priority: 'priority',
  applicationId: 'applicationId',
  section: 'section',
}

const validationSchema = Yup.object({
  [paramMap.id]: Yup.string().required(),
  [paramMap.resourceName]: Yup.string().required(),
  [paramMap.priority]: Yup.number().nullable(),
  [paramMap.applicationId]: Yup.string().required(),
  [paramMap.section]: Yup.string().required(),
})

export default function EditResource({ handleClose, refetch, setSubmissionStatus, resource }) {
  const { status, data } = useQuery(
    ['apps'], () => fetchApps()
  )

  const { mutate, error } = useMutation(editResource, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleClose()
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  const initialValues = {
    id: resource.id,
    resourceName: resource.resourceName,
    priority: resource.priority,
    applicationId: resource.applicationId,
    section: resource.section,
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
              <Col md={8} className="pl-3">
                {/* Resource Name */}
                <MyTextInput
                  label="Resource Name"
                  id="resourceName"
                  name={paramMap.resourceName}
                  placeholder="Basic"
                  required
                  className="mb-3"
                />

                {/* Section */}
                <MySelect
                  label="Section"
                  id="section"
                  name={paramMap.section}
                  className="mb-3"
                >
                  <option value={'FREE'}>
                    FREE
                  </option>
                  <option value={'PAID'}>
                    PAID
                  </option>
                </MySelect>

                {/* Priority */}
                <MyTextInput
                  label="Priority"
                  id="priority"
                  name={paramMap.priority}
                  placeholder="1"
                  className="mb-3"
                />

                {/* Package */}
                <MySelect
                  label="Application"
                  id="applicationId"
                  name={paramMap.applicationId}
                  disabled={status !== 'success'}
                  className="mb-3"
                >
                  <option value={null}>
                    {status === 'loading' ? 'Loading…' : 'Select'}
                  </option>
                  {status === 'success' &&
                    data.map((apps) => (
                      <option key={apps.id} value={apps.id}>
                        {apps.applicationName}
                      </option>
                    ))}
                </MySelect>
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
