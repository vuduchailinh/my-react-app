import {DataTable, DynamicTable} from "../components/DynamicTable.tsx";
import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';

interface Data extends DataTable {
    id: string
    name: string
    email: string
}

const data: Data[] = [
    {
        id: '1',
        name: 'John',
        email: 'john@gmail.com'
    },
    {
        id: '2',
        name: 'Jane',
        email: 'jane@gmail.com'
    }
]

// Test rendering DynamicTable component
test('renders DynamicTable component with correct props', () => {
    const {getByText, getAllByText} = render(
        <DynamicTable
            columns={[
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                }
            ]}
            data={data}
            actionPerRow={() => <p>Action Per Row</p>}
            pagination={<p>Pagination</p>}
        />
    );
    expect(getByText('Name')).toBeDefined();
    expect(getByText('Age')).toBeDefined();
    expect(getByText('John')).toBeDefined();
    expect(getByText('Jane')).toBeDefined();
    expect(getAllByText('Action Per Row')).toBeDefined();
    expect(getAllByText('Action Per Row')).toHaveLength(2);
    expect(getByText('Pagination')).toBeDefined();
})

// Test behavior of actionPerRow
test('calls actionPerRow when actionPerRow is clicked', () => {
    const actionPerRow = jest.fn();
    const {getAllByText} = render(
        <DynamicTable
            columns={[
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                }
            ]}
            data={data}
            actionPerRow={() => <p onClick={actionPerRow}>Action Per Row</p>}
            pagination={<p>Pagination</p>}
        />
    );
    expect(actionPerRow).not.toHaveBeenCalled();
    getAllByText('Action Per Row').forEach((element) => {
        fireEvent.click(element);
    });
    expect(actionPerRow).toHaveBeenCalled();
})

// Test behavior of pagination
test('calls pagination when pagination is clicked', () => {
    const pagination = jest.fn();
    const {getByText} = render(
        <DynamicTable
            columns={[
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                }
            ]}
            data={data}
            actionPerRow={() => <p>Action Per Row</p>}
            pagination={<p onClick={pagination}>Pagination</p>}
        />
    );
    expect(pagination).not.toHaveBeenCalled();
    fireEvent.click(getByText('Pagination'));
    expect(pagination).toHaveBeenCalled();
})