import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { fetchActiveSubscriptions, invalidateSubsciption } from '../services/subscriptionService';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { addPricing, fetchPricing } from '../services/pricingService';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyTextInput } from '../components/MyInput';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

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

const paramMap = {
  packageName: 'packageName',
  monthlyPrice: 'monthlyPrice',
  annualPrice: 'annualPrice',
}

const validationSchema = Yup.object({
  [paramMap.packageName]: Yup.string().required(),
  [paramMap.monthlyPrice]: Yup.number().required(),
  [paramMap.annualPrice]: Yup.number().required(),
})

const initialValues = {
  packageName: '',
  monthlyPrice: 0,
  annualPrice: 0,
}

export default function Packages() {
  const { status, data, refetch } = useQuery(
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

  const { mutate, error } = useMutation(addPricing, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleClose()
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

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
              <StyledTableCell>Package Name</StyledTableCell>
              <StyledTableCell align="right">Monthly Price</StyledTableCell>
              <StyledTableCell align="right">Yearly Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.packageName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.monthlyPrice}</StyledTableCell>
                <StyledTableCell align="right">{row.annualPrice}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <a onClick={handleOpen} style={{ cursor: 'pointer' }}>Add</a>

      <Modal show={isOpen} onHide={handleClose} size='sm' centered>
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
