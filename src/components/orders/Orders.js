import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import EnhancedTableToolbar from '../table/EnhancedTableToolbar';
import EnhancedTableHead from '../table/EnhancedTableHead';
import EnhancedTableContent from '../table/EnhancedTableContent';

function createData(id, order_id, cust_name, cust_addr, cust_phone, cust_email, cust_event, total_tickets, total_amount) {
    return { id, order_id, cust_name, cust_addr, cust_phone, cust_email, cust_event, total_tickets, total_amount };
}
const rows = [
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening celebration with celebrities and well known artists", 4, 900),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening celebration with celebrities and well known artists", 2, 788),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Ganesh Festival Music and Dance concert with celebrities", 3, 700),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Ganesh Festival Music and Dance concert with celebrities", 4, 1000),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Ganesh Festival Music and Dance concert with celebrities", 3, 799),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Ganesh Festival Music and Dance concert with celebrities", 3, 988),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Ganesh Festival Music and Dance concert with celebrities", 6, 900),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening party with celebrities", 4, 1000),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening party with celebrities", 4, 2000),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening party with celebrities", 4, 150),
    createData(1, '#1234', "Alex Spider", "Near city auditorium, Bangalore", "9090909090", "alex@test.com", "Evening party with celebrities", 5, 566),
];
const columns = [
    { id: 'order_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'cust_name', numeric: false, disablePadding: false, label: 'Customer Name' },
    { id: 'cust_addr', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'cust_phone', numeric: false, disablePadding: false, label: 'Phone' },
    { id: 'cust_email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'cust_event', numeric: false, disablePadding: false, label: 'Event' },
    { id: 'total_tickets', numeric: true, disablePadding: false, label: 'Total tickets' },
    { id: 'total_amount', numeric: true, disablePadding: false, label: 'Total amount ($)' },
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '50px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function Orders() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const isSelected = (id) => selected.indexOf(id) !== -1;  

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };  

    return (
        <div className={classes.root}>
            <Container maxWidth="xl">
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} title="Orders" />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                columns={columns}
                            />
                            <EnhancedTableContent
                                order={order}
                                orderBy={orderBy}
                                page={page}
                                columns={columns}
                                rows={rows}
                                rowsPerPage={rowsPerPage}
                                isSelected={isSelected}
                                handleClick={handleClick}
                            />
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    );
}
