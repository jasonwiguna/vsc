import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { fetchAllSubscriptions, subscribe } from '../../services/subscriptionService';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material';
import { Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyEmailInput, MyTextInput, MySelect } from '../../components/MyInput';
import { fetchPricing } from '../../services/pricingService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  firstname: 'firstname',
  lastname: 'lastname',
  company: 'company',
  email: 'email',
  phone: 'phone',
  country: 'country',
  updatePermission: 'updatePermission',
  pricingPackageId: 'pricingPackageId',
  monthly: 'monthly',
  subscriptionDate: 'subscriptionDate',
  expirationDate: 'expirationDate',
}

const validationSchema = Yup.object({
  [paramMap.firstname]: Yup.string().required(),
  [paramMap.lastname]: Yup.string().required(),
  [paramMap.company]: Yup.string().required(),
  [paramMap.email]: Yup.string().email().required(),
  [paramMap.phone]: Yup.string().required(),
  [paramMap.country]: Yup.string().required(),
  [paramMap.updatePermission]: Yup.boolean().required(),
  [paramMap.pricingPackageId]: Yup.string().required(),
  [paramMap.monthly]: Yup.boolean().required(),
  [paramMap.subscriptionDate]: Yup.string().required(),
  [paramMap.expirationDate]: Yup.string().required(),
})

const initialValues = {
  firstname: '',
  lastname: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  updatePermission: false,
  pricingPackageId: '',
  monthly: true,
  subscriptionDate: new Date(),
  expirationDate: new Date(new Date().setMonth(new Date().getMonth()+1)),
}

export default function Subscriptions() {
  const { status, data, refetch } = useQuery(
    ['allSubscriptions'], () => fetchAllSubscriptions()
  )
  const { status: statusPricing, data: dataPricing } = useQuery(
    ['pricing'], () => fetchPricing()
  )
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }
  function handleClose() {
    setIsOpen(false)
  }
  
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const { mutate, error } = useMutation(subscribe, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      refetch()
      handleClose()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className={styles.container}>
      <Head>
        <title>VSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align="right">License Key</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">Registered At</StyledTableCell>
              <StyledTableCell align="right">Plan</StyledTableCell>
              <StyledTableCell align="right">Subscription Date</StyledTableCell>
              <StyledTableCell align="right">Expiry Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.user.firstname} {row.user.lastname}
                </StyledTableCell>
                <StyledTableCell align="right">{row.key}</StyledTableCell>
                <StyledTableCell align="right">{row.user.email}</StyledTableCell>
                <StyledTableCell align="right">{row.user.phone}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.user.createdAt).toLocaleDateString("en-US", options)}</StyledTableCell>
                <StyledTableCell align="right">{row.pricingPackage.packageName}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.subscriptionDate).toLocaleDateString("en-US", options)}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.expirationDate).toLocaleDateString("en-US", options)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <a onClick={handleOpen} style={{ cursor: 'pointer' }}>Add</a>

      <Modal show={isOpen} onHide={handleClose} size='md' centered>
        <Modal.Body className={styles.modal}>
            <div className={styles.modalContainer}>
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
                    <Col md={6} className="pl-3">
                      {/* Firstname */}
                      <MyTextInput
                        label="Firstname"
                        id="firstname"
                        name={paramMap.firstname}
                        placeholder="John"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Lastname */}
                      <MyTextInput
                        label="Lastname"
                        id="lastname"
                        name={paramMap.lastname}
                        placeholder="Doe"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Company */}
                      <MyTextInput
                        label="Company"
                        id="company"
                        name={paramMap.company}
                        placeholder="VStream"
                        required
                        className="mb-3"
                      />
                    </Col>
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
                      {/* Phone */}
                      <MyTextInput
                        label="Phone"
                        id="phone"
                        name={paramMap.phone}
                        placeholder="81234567"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Country */}
                      <MyTextInput
                        label="Country"
                        id="country"
                        name={paramMap.country}
                        placeholder="Singapore"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Package */}
                      <MySelect
                        label="Pricing Package"
                        id="pricingPackageId"
                        name={paramMap.pricingPackageId}
                        disabled={statusPricing !== 'success'}
                        required
                        className="mb-3"
                      >
                        <option value="">
                          {statusPricing === 'loading' ? 'Loading…' : 'Select'}
                        </option>
                        {statusPricing === 'success' &&
                          dataPricing.map((pricing) => (
                            <option key={pricing.id} value={pricing.id}>
                              {pricing.packageName} for ${pricing.monthlyPrice} per month
                            </option>
                          ))}
                      </MySelect>
                    </Col>
                  </Form.Row>
                </div>
              </Row>

              <div className='d-flex flex-row my-3 justify-content-center'>
                <button className='mr-3' onClick={() => handleClose()}>Cancel</button>
                <button disabled={values.isSubmitting} type='submit'>Submit</button>
              </div>
            </FormikForm>}
            </Formik>
            </div>
        </Modal.Body>
      </Modal>

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
