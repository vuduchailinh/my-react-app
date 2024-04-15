import {ReactElement} from "react";
import {Container, Table} from "@radix-ui/themes";

export interface DataTable {
    id: string
}

export type DataConverter = (data: never) => string
export type ActionPerRow = <T extends DataTable>(data: T) => ReactElement

export type Column = {
    title: string
    key: string
    isHidden?: boolean
    converterFn?: DataConverter
}

export type TableProps<T extends DataTable> = {
    data: T[]
    columns: Column[],
    actionPerRow: ActionPerRow
    pagination?: ReactElement
}

export const DynamicTable = <T extends DataTable>({
                                               data,
                                               columns,
                                               actionPerRow,
                                               pagination
                                           }: TableProps<T>) => {

    return (
        <Container>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        {
                            columns.filter(column => !column.isHidden)
                                .map((column, index) => {
                                    return <Table.ColumnHeaderCell key={index}>{column.title}</Table.ColumnHeaderCell>
                                })
                        }
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data.map((row, rowIndex) =>
                            <Table.Row key={rowIndex}>
                                {
                                    columns.filter(column => !column.isHidden)
                                        .map((column, colIndex) => {
                                            return <Table.Cell
                                                key={colIndex + '-' + colIndex}>
                                                {
                                                    // @ts-expect-error - this is a hack to avoid type error
                                                    column.converterFn ? column.converterFn(row[column.key]) : row[column.key]
                                                }
                                            </Table.Cell>
                                        })
                                }
                                <Table.Cell key={rowIndex}>
                                    {
                                        actionPerRow(row)
                                    }
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table.Root>
            {
                pagination
            }
        </Container>
    )
}