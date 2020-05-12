import styled, {keyframes} from "styled-components";

const animationName = keyframes`
  0% { opacity: 0; }
  20% { opacity: 0; }
  40% { opacity: 0.3; }
  60% { opacity: 0.5; }
  80% { opacity: 0.9; }
  100% { opacity: 1; }
`

export const TableHeader = styled.th<{width: number}>`
    cursor: pointer;
    width: ${props => props.width.toString()}px;
    height: 100px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    &:last-of-type {
        position: absolute;
        right: 0;
        top: 1px;
        z-index: 3;
        border-left: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 2px;
    }
    background: #3d1e7a;
    font-weight: 700;
    font-size: 1.3rem;
`;

export const StyledTable = styled.table<{lastColumnWidth: number}>`
    overflow-x: scroll;
    color: white;
    border: 1px solid white;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    width: 1px;
    height: 100%;
    padding-right: ${props => props.lastColumnWidth + 2}px;
`;

export const TableRow = styled.tr`
    position: relative;
    width: 100%;
    height: auto;
`;

export const TableCell = styled.td<{lastCell?: boolean, lastColumnWidth?: number}>`
    border: 1px solid white;
    height: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: ${animationName} 0.3s;
    background: #151a67;
    ${props => props.lastCell && props.lastColumnWidth &&`
        right: 0;
        position: absolute;
        top: auto;
        width: ${props.lastColumnWidth}px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid white;
    `}
`;
