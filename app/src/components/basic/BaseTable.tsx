import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type BaseTableHeader = {[key: string|number]: React.ReactNode}
export type BaseTableRow = {[key in keyof BaseTableHeader]: React.ReactNode}

interface Props {
    header: BaseTableHeader
    rows: BaseTableRow[]
}

export const BaseTable = (props: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(props.header).map((key: string|number, index: number) => (
                            <TableCell key={index}>
                                {props.header[key]}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row: BaseTableRow, index: number) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.keys(props.header).map((key: string|number, index: number) => (
                                <TableCell key={index}>
                                    {row[key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}