import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';

type Props = {
    data: { id: number, name: string, surname: string, profession: string, salary: number, location: string, available: boolean }[],
    config: {
        tableHeaders: { columnName: string, columnWidth: number, }[],
    },
}

type State = {
    currentSort: string,
};

const animationName = keyframes`
  0% { opacity: 0; }
  20% { opacity: 0; }
  40% { opacity: 0.3; }
  60% { opacity: 0.5; }
  80% { opacity: 0.9; }
  100% { opacity: 1; }
`

const TableHeader = styled.th<{width: number}>`
    cursor: pointer;
    width: ${props => props.width.toString()}px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    &:last-of-type {
        color: red;
    }
`;

const StyledTable = styled.table`
    overflow-x: scroll;
    color: white;
    border: 1px solid white;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td<{lastCell?: boolean}>`
    border: 1px solid white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: ${animationName} 0.3s;
`;

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

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

    render() {
        const {config, data} = this.props;
        const {currentSort} = this.state;
        return (
            <StyledTable>
                <TableRow>{config.tableHeaders.map(header => <TableHeader width={header.columnWidth} onClick={() => this.setSorting(header.columnName)}>{header.columnName}</TableHeader>)}</TableRow>
                {(data.sort((left, right): number => { if(hasKey(left, currentSort)) { if(left[currentSort] > right[currentSort]) return 1; if(left[currentSort] < right[currentSort]) return -1; } return 0; } )).map(tableRow => <TableRow>
                    <TableCell>{tableRow.id}</TableCell>
                    <TableCell>{tableRow.name}</TableCell>
                    <TableCell>{tableRow.surname}</TableCell>
                    <TableCell>{tableRow.profession}</TableCell>
                    <TableCell>{tableRow.salary}</TableCell>
                    <TableCell>{tableRow.location}</TableCell>
                    <TableCell lastCell>{tableRow.available ? '' : 'not'} available</TableCell>
                </TableRow>)}
            </StyledTable>
        )
    }
}

export default Table;
