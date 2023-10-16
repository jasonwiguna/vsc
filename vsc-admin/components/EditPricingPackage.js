import { useMutation, useQuery } from 'react-query';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MySelect, MyTextInput } from './MyInput';
import { editPricing } from '../services/pricingService';
import { fetchApps } from '../services/applicationService';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  id: 'id',
  packageName: 'packageName',
  monthlyPrice: 'monthlyPrice',
  annualPrice: 'annualPrice',
  perpetualPrice: 'perpetualPrice',
  applicationId: 'applicationId',
}

const validationSchema = Yup.object({
  [paramMap.id]: Yup.string().required(),
  [paramMap.packageName]: Yup.string().required(),
  [paramMap.monthlyPrice]: Yup.number().required(),
  [paramMap.annualPrice]: Yup.number().required(),
  [paramMap.perpetualPrice]: Yup.number().required(),
  [paramMap.applicationId]: Yup.string().nullable(),
})

export default function EditPricingPackage({ handleClose, refetch, setSubmissionStatus, pricingPackage }) {
  const { status, data } = useQuery(
    ['apps'], () => fetchApps()
  )

  const { mutate, error } = useMutation(editPricing, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleClose()
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  const initialValues = {
    id: pricingPackage.id,
    packageName: pricingPackage.packageName,
    monthlyPrice: pricingPackage.monthlyPrice,
    annualPrice: pricingPackage.annualPrice,
    perpetualPrice: pricingPackage.perpetualPrice,
    applicationId: pricingPackage.applicationId,
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
                {/* Package Name */}
                <MyTextInput
                  label="Package Name"
                  id="packageName"
                  name={paramMap.packageName}
                  placeholder="Basic"
                  required
                  className="mb-3"
                />

                {/* Monthly Price */}
                <MyTextInput
                  label="Monthly Price"
                  id="monthlyPrice"
                  name={paramMap.monthlyPrice}
                  placeholder="5"
                  required
                  className="mb-3"
                />

                {/* Annual Price */}
                <MyTextInput
                  label="Annual Price"
                  id="annualPrice"
                  name={paramMap.annualPrice}
                  placeholder="50"
                  required
                  className="mb-3"
                />

                {/* Perpetual Price */}
                <MyTextInput
                  label="Perpetual Price"
                  id="perpetualPrice"
                  name={paramMap.perpetualPrice}
                  placeholder="50"
                  required
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
