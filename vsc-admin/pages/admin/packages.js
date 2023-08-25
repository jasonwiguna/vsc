import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { activatePricing, deletePricing, fetchPricing } from '../../services/pricingService';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddPricingPackage from '../../components/AddPricingPackage';
import EditPricingPackage from '../../components/EditPricingPackage';

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

  const [pricingPackage, setPricingPackage] = useState(null)
  const [action, setAction] = useState('ADD')
  
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const { mutate } = useMutation(deletePricing, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      refetch()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })

  const { mutate: activate } = useMutation(activatePricing, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
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
              <StyledTableCell align="right">Perpetual Price</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <a onClick={() => {
                    setAction('EDIT')
                    setPricingPackage(row)
                    handleOpen()
                  }} style={{ cursor: 'pointer' }}>{row.packageName}</a>
                </StyledTableCell>
                <StyledTableCell align="right">${row.monthlyPrice}</StyledTableCell>
                <StyledTableCell align="right">${row.annualPrice}</StyledTableCell>
                <StyledTableCell align="right">${row.perpetualPrice}</StyledTableCell>
                <StyledTableCell align="right">{row.active ? <a onClick={() => mutate({ id: row.id })} style={{ cursor: 'pointer' }}>Remove</a> : <a onClick={() => activate({ id: row.id })} style={{ cursor: 'pointer' }}>Activate</a>}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <a onClick={() => {
        setAction('ADD')
        handleOpen()
      }} style={{ cursor: 'pointer' }}>Add</a>

      <Modal show={isOpen} onHide={handleClose} size='sm' centered>
        <Modal.Body className={styles.modal}>
          <div className={styles.modalContainer}>
            {action == 'ADD' ?
              <AddPricingPackage handleClose={handleClose} refetch={refetch} setSubmissionStatus={setSubmissionStatus} /> :
              <EditPricingPackage handleClose={handleClose} refetch={refetch} setSubmissionStatus={setSubmissionStatus} pricingPackage={pricingPackage} />
            }
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
