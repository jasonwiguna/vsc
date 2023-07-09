import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { fetchAllSubscriptions } from '../services/subscriptionService';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material';
import { useQuery } from 'react-query';

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

export default function Subscriptions() {
  const { status, data, refetch } = useQuery(
    ['allSubscriptions'], () => fetchAllSubscriptions()
  )

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
