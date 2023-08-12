import { useMutation } from 'react-query';
import { addPricing } from '../services/pricingService';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyTextInput } from './MyInput';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  packageName: 'packageName',
  monthlyPrice: 'monthlyPrice',
  annualPrice: 'annualPrice',
  perpetualPrice: 'perpetualPrice',
}

const validationSchema = Yup.object({
  [paramMap.packageName]: Yup.string().required(),
  [paramMap.monthlyPrice]: Yup.number().required(),
  [paramMap.annualPrice]: Yup.number().required(),
  [paramMap.perpetualPrice]: Yup.number().required(),
})

const initialValues = {
  packageName: '',
  monthlyPrice: 0,
  annualPrice: 0,
  perpetualPrice: 0,
}

export default function AddPricingPackage({ handleClose, refetch, setSubmissionStatus }) {
  const { mutate, error } = useMutation(addPricing, {
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
