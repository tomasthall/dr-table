import React, {Component} from 'react';
import hasKey from './../utils';
import {StyledTable, TableCell, TableHeader, TableRow} from './style';

interface TableData {
    id: number, name: string, surname: string, profession: string, salary: number, location: string, available: boolean,
}

interface TableHeaders {
    columnName: string, columnWidth: number,
}

type Props = {
    data: TableData[]
    config: {
        tableHeaders: TableHeaders[],
    },
}

type State = {
    currentSort: string,
};

class Table extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentSort: 'name',
        }
    }
    setSorting = (columnName: string) => {
        this.setState({
            currentSort: columnName
        } as State)
    }

    renderTableHeaders = (tableHeaders: TableHeaders[]) => {
        return (
            <TableRow>{tableHeaders.map(header => <TableHeader width={header.columnWidth} onClick={() => this.setSorting(header.columnName)}>{header.columnName}</TableHeader>)}</TableRow>
        )
    }

    renderTableCells = (tableRow: TableData, lastColumnWidth: number) => {
        return (
            <>
                <TableCell>{tableRow.id}</TableCell>
                <TableCell>{tableRow.name}</TableCell>
                <TableCell>{tableRow.surname}</TableCell>
                <TableCell>{tableRow.profession}</TableCell>
                <TableCell>{tableRow.salary}</TableCell>
                <TableCell>{tableRow.location}</TableCell>
                <TableCell lastCell lastColumnWidth={lastColumnWidth}>{tableRow.available ? '' : 'not'} available</TableCell>
            </>
        )
    }

    compareRowElements = (left: TableData, right: TableData, currentSort: string): number => {
        if(hasKey(left, currentSort)) {
            if(left[currentSort] > right[currentSort]) return 1;
            if(left[currentSort] < right[currentSort]) return -1;
        }
        return 0;
    };

    render() {
        const {config, data} = this.props;
        const {currentSort} = this.state;
        const lastColumnWidth: number = config.tableHeaders[config.tableHeaders.length - 1].columnWidth;
        return (
            <StyledTable lastColumnWidth={lastColumnWidth}>
                {this.renderTableHeaders(config.tableHeaders)}
                {(data.sort((left, right) => this.compareRowElements(left, right, currentSort))).map(tableRow => <TableRow>
                    {this.renderTableCells(tableRow, lastColumnWidth)}
                </TableRow>)}
            </StyledTable>
        )
    }
}

export default Table;
