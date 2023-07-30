import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useMutation } from 'react-query';
import { fetchMe, useAuthenticate } from '../../services/auth';
import { Form as FormikForm, Formik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyEmailInput, MyPasswordInput } from '../../components/MyInput';
import { useState } from 'react';

const statusMap = {
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  email: 'email',
  password: 'password',
}

const validationSchema = Yup.object({
  [paramMap.email]: Yup.string().email().required(),
  [paramMap.password]: Yup.string().required(),
})

const initialValues = {
  email: '',
  password: '',
}

export default function Admin() {
  const { login } = useAuthenticate()
  const [submissionStatus, setSubmissionStatus] = useState(statusMap.IDLE)

  const mutate = useMutation(fetchMe, {
    onSuccess: (res) => {
      console.log(res)
      if (res && res.access_token) {
        login({ accessToken: res.access_token })
        setSubmissionStatus(statusMap.SUCCESS)
      } else {
        setSubmissionStatus(statusMap.ERROR)
      }
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>VSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setSubmissionStatus(statusMap.SUBMITTING)
          mutate.mutateAsync(values)
        }}
      >
        {(values) => <FormikForm>
          <Row className="mt-2">
            <div>
              <Form.Row>
                <Col md={6} className="pl-3">
                  {/* email */}
                  <MyEmailInput
                    label="Email"
                    id="email"
                    name={paramMap.email}
                    placeholder="example@email.com"
                    required
                    className="mb-3"
                  />
                </Col>
                <Col md={6} className="pl-3">
                  {/* Password */}
                  <MyPasswordInput
                    label="Password"
                    id="password"
                    name={paramMap.password}
                    placeholder="********"
                    required
                    className="mb-3"
                  />
                </Col>
              </Form.Row>
            </div>
          </Row>

          <div className='d-flex flex-row my-3 justify-content-center'>
            <button disabled={submissionStatus == statusMap.SUBMITTING} type='submit'>Login</button>
          </div>
        </FormikForm>}
      </Formik>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 40px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
