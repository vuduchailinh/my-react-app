import {Box, Button, Checkbox, CheckboxGroup, Container, Dialog, Flex, Heading, Link} from '@radix-ui/themes'
import {useQueryString} from '../utils/http'
import {useNavigate} from 'react-router-dom'
import {getEmployees} from '../apis/employees.api'
import {useQuery} from '@tanstack/react-query'
import Deleting from "./Deleting.tsx";
import {Column, DynamicTable} from "../components/DynamicTable.tsx";
import {Address} from "../apis/types/employees.type.tsx";
import React, {useState} from "react";
import {Pagination} from "../components/Pagination.tsx";
import Detail from "./Detail.tsx";

const initialEmployeeColumns: Column[] = [
    {title: 'ID', key: 'id'},
    {title: 'Full name', key: 'name'},
    {title: 'Email', key: 'email'},
    {
        title: 'Address',
        key: 'address',
        converterFn: (address: Address) => `${address.street} ${address.town} ${address.postode}`
    },
    {title: 'Day of birth', key: 'dob'},
    {title: 'Telephone', key: 'telephone'},
    {title: 'Pets', key: 'pets', isHidden: true, converterFn: (pets: string[]) => pets.join(', ')},
    {title: 'Score', key: 'score', isHidden: true},
    {title: 'Url', key: 'url', isHidden: true},
    {title: 'Verified', key: 'verified', isHidden: true, converterFn: (verified: boolean) => verified ? 'Yes' : 'No'},
    {title: 'Salary', key: 'salary', isHidden: true},
]

function Listing() {

    const [employeeColumns, setEmployeeColumns] = useState<Column[]>(initialEmployeeColumns)
    const navigate = useNavigate()
    const queryString: { page?: string, limit?: string } = useQueryString()
    const page = Math.max(Number(queryString.page) || 1, 1)
    const limit = Math.max(Number(queryString.limit) || 10, 1)
    const [sort, setSort] = useState<string>('')
    const employeesQuery = useQuery({
        queryKey: [
            'employees',
            page,
            limit,
            sort
        ],
        queryFn: () => getEmployees(page, limit, sort),
        placeholderData: (previousData) => previousData
    })

    const totalPages = employeesQuery.data?.data?.pages || 0

    const onChangeEmployeeColumn = (_e: React.MouseEvent<HTMLButtonElement>, changedColumn: Column) => {
        const updatedColumns = employeeColumns.map(column => {
            if (column.key === changedColumn.key) {
                return {...column, isHidden: !column.isHidden};
            }
            return column;
        });
        setEmployeeColumns(updatedColumns);
    }

    const onColumnClick = (column: Column) => {
        if (sort.startsWith('-')) {
            setSort('+' + column.key)
        } else {
            setSort('-' + column.key)
        }
    }

    return (
        <Container>
            <Box pt={'8'} pb={'5'}>
                <Heading align={'center'}>Employee Management</Heading>
            </Box>
            <Flex gap={'2'}>
                <Button
                    onClick={() => {
                        navigate('/employees/upsert')
                    }}
                >
                    Add Employee
                </Button>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button>Update columns</Button>
                    </Dialog.Trigger>
                    <Dialog.Content maxWidth="450px">
                        <CheckboxGroup.Root defaultValue={['1']} name="employeeColumns">
                            {
                                employeeColumns.map((column, index) => {
                                    return (
                                        <Flex gap="2" key={index}>
                                            <Checkbox
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => onChangeEmployeeColumn(e, column)}
                                                checked={!column.isHidden}
                                            />
                                            {column.title}
                                        </Flex>
                                    )
                                })
                            }
                        </CheckboxGroup.Root>
                    </Dialog.Content>
                </Dialog.Root>
            </Flex>
            {
                !employeesQuery.isLoading
                && employeesQuery.isSuccess
                && employeesQuery.data?.data?.data &&
                <DynamicTable
                    data={employeesQuery.data?.data?.data}
                    columns={employeeColumns}
                    actionPerRow={(data) => {
                        return <Flex gap={'1'}>
                            <Link href='#' onClick={() => navigate(`/employees/upsert/${data.id}`)}>Update</Link>
                            <Deleting id={data.id}/>
                            <Detail id={data.id} />
                        </Flex>
                    }}
                    onColumnClick={onColumnClick}
                    pagination={<Pagination
                        page={page}
                        totalPages={totalPages}
                        onPreviousClick={() => navigate(`/employees?page=${page - 1}&limit=${limit}`)}
                        onNextClick={() => navigate(`/employees?page=${page + 1}&limit=${limit}`)}
                        onSpecificPageClick={(pageNumber) => {
                            return navigate(`/employees?page=${pageNumber}&limit=${limit}`)
                        }}
                    />}
                />
            }
        </Container>
    )
}

export default Listing