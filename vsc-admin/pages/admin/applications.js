import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { deleteApp, fetchApps } from '../../services/applicationService';
import AddApp from '../../components/AddApp';
import EditApp from '../../components/EditApp';

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

export default function Applications() {
  const { status, data, refetch } = useQuery(
    ['pricing'], () => fetchApps()
  )

  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }
  function handleClose() {
    setIsOpen(false)
  }

  const [app, setApp] = useState(null)
  const [action, setAction] = useState('ADD')
  
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const { mutate } = useMutation(deleteApp, {
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
              <StyledTableCell>App Name</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <a onClick={() => {
                    setAction('EDIT')
                    setApp(row)
                    handleOpen()
                  }} style={{ cursor: 'pointer' }}>{row.applicationName}</a>
                </StyledTableCell>
                {/* <StyledTableCell align="right"><a onClick={() => mutate({ id: row.id })} style={{ cursor: 'pointer' }}>Remove</a></StyledTableCell> */}
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
              <AddApp handleClose={handleClose} refetch={refetch} setSubmissionStatus={setSubmissionStatus} /> :
              <EditApp handleClose={handleClose} refetch={refetch} setSubmissionStatus={setSubmissionStatus} app={app} />
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
