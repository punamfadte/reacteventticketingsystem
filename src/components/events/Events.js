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

function createData(id, name, date, location, tickets) {
    return { id, name, date, location, tickets };
}

const rows = [
    createData(1, 'Ganesh Festival Music and Dance concert with celebrities', "04/08/2020 12:34 AM", "Mumbai, India", 67),
    createData(2, 'Fireworks for christmas celebration', "04/08/2020 12:34 AM", "Mumbai, India", 51),
    createData(3, 'Evening party with celebrities', "04/08/2020 12:34 AM", "Mumbai, India", 24),
    createData(4, 'Evening celebration with celebrities and well known artists', "04/08/2020 12:34 AM", "Mumbai, India", 24),
    createData(5, 'Event5', "04/08/2020 12:34 AM", "Mumbai, India", 49),
    createData(6, 'Event6', "04/08/2020 12:34 AM", "Mumbai, India", 87),
    createData(7, 'Event7', "04/08/2020 12:34 AM", "Mumbai, India", 37),
    createData(8, 'Event8', "04/08/2020 12:34 AM", "Mumbai, India", 94),
    createData(9, 'Event9', "04/08/2020 12:34 AM", "Mumbai, India", 65),
    createData(10, 'Event10', "04/08/2020 12:34 AM", "Mumbai, India", 98),
    createData(11, 'Event11', "04/08/2020 12:34 AM", "Mumbai, India", 81),
    createData(12, 'Event12', "04/08/2020 12:34 AM", "Mumbai, India", 90),
    createData(13, 'Event13', "04/08/2020 12:34 AM", "Mumbai, India", 63),
];

const columns = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'tickets', numeric: true, disablePadding: false, label: 'Total Tickets' },
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

export default function Events() {
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
                    <EnhancedTableToolbar numSelected={selected.length} title="Events" />
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
