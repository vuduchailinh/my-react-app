import type {Meta, StoryObj} from "@storybook/react";
import {DataTable, DynamicTable as DynamicTableComponent} from "../components/DynamicTable";
import {Pagination} from "../components/Pagination";
import {Flex, Link} from "@radix-ui/themes";

const meta: Meta<typeof DynamicTableComponent> = {
    title: 'UI-Kit/DynamicTable',
    component: DynamicTableComponent,
    parameters: {
        controls: {
            include: [
                'data',
                'columns',
                'actionPerRow',
                'pagination'
            ],
        },
    },
    args: {
        data: [],
        columns: [],
        actionPerRow: () => <></>,
        pagination: <></>
    },
    argTypes: {
        data: {
            description: 'Data to be displayed in the table, extends DataTable interface',
        },
        columns: {
            description: 'Columns to be displayed in the table, extends Column interface',
        },
        actionPerRow: {
            control: 'ReactNode',
            description: 'Action to be displayed per row',
        },
        pagination: {
            control: 'Pagination',
            description: 'Pagination component',
        }
    }
}

export interface ExampleDataTable extends DataTable {
    id: string
    name: string
    dob: string
    telephone: string
    email: string
}

export const Story: StoryObj<typeof DynamicTableComponent> = {
    argTypes: {
        data: {
            description: 'Data to be displayed in the table, extends DataTable interface',
        },
        columns: {
            description: 'Columns to be displayed in the table, extends Column interface',
        },
        actionPerRow: {
            control: 'ReactNode',
            description: 'Action to be displayed per row',
        },
        pagination: {
            control: 'Pagination',
            description: 'Pagination component',
        }
    },
    args: {
        data: [
            {
                id: '1',
                // @ts-expect-error - this is a hack to avoid type error
                name: 'John Doe',
                dob: '01/01/1990',
                telephone: '1234567890',
                email: 'email'
            },
            {
                id: '2',
                // @ts-expect-error - this is a hack to avoid type error
                name: 'Jane Doe',
                dob: '01/01/1990',
                telephone: '1234567890',
                email: 'email'
            }
        ],
        columns: [
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Date of Birth',
                key: 'dob'
            },
            {
                title: 'Telephone',
                key: 'telephone'
            },
            {
                title: 'Email',
                key: 'email'
            }
        ],
        actionPerRow: (data: DataTable) => <Flex gap={'1'}>
            <Link href='/' onClick={(e) => e.preventDefault()}>Update</Link>
            <Link href='/' id={data.id} onClick={(e) => e.preventDefault()}>Delete</Link>
        </Flex>,
        pagination: <Pagination
            page={1}
            totalPages={10}
            onPreviousClick={() => {
            }}
            onNextClick={() => {
            }}
            onSpecificPageClick={() => {
            }}
        />
    }
}

export default meta;