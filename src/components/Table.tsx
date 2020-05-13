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
    animateCells: boolean,
};

class Table extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentSort: 'name',
            animateCells: false,
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State): void {
        if (prevState.currentSort !== this.state.currentSort) {

        }
    }

    setSorting = (columnName: string) => {
        this.setState({
            currentSort: columnName,
            animateCells: true
        } as State, () => {
            setTimeout(() => {
                this.setState({ animateCells: false })
            },300)
        });
    }

    renderTableHeaders = (tableHeaders: TableHeaders[]) => {
        return (
            <TableRow>{tableHeaders.map(header => (
                <TableHeader key={header.columnName} width={header.columnWidth}
                             onClick={() => this.setSorting(header.columnName)}>{header.columnName}</TableHeader>
            ))
            })}</TableRow>
        )
    }

    renderTableCells = (tableRow: TableData, lastColumnWidth: number) => {
        const {animateCells} = this.state;
        return (
            <>
                <TableCell animated={animateCells}>{tableRow.id}</TableCell>
                <TableCell animated={animateCells}>{tableRow.name}</TableCell>
                <TableCell animated={animateCells}>{tableRow.surname}</TableCell>
                <TableCell animated={animateCells}>{tableRow.profession}</TableCell>
                <TableCell animated={animateCells}>{tableRow.salary}</TableCell>
                <TableCell animated={animateCells}>{tableRow.location}</TableCell>
                <TableCell animated={animateCells} lastCell lastColumnWidth={lastColumnWidth}>{tableRow.available ? '' : 'not'} available</TableCell>
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
                <thead>
                    {this.renderTableHeaders(config.tableHeaders)}
                </thead>
                <tbody>
                    {(data.sort((left, right) => this.compareRowElements(left, right, currentSort))).map((tableRow, idx) => <TableRow key={idx}>
                        {this.renderTableCells(tableRow, lastColumnWidth)}
                    </TableRow>)}
                </tbody>
            </StyledTable>
        )
    }
}

export default Table;
