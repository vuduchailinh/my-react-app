import { Pagination as PaginationComponent, PaginationProps} from "../components/Pagination.tsx";
import { type Meta, type StoryObj } from "@storybook/react";

export const Pagination: StoryObj<PaginationProps> = {
    args: {
        page: 1,
        totalPages: 10,
        onPreviousClick: () => {},
        onNextClick: () => {},
        onSpecificPageClick: () => {}
    },
    argTypes: {
        page: {
            type: "number"
        },
        totalPages: {
            type: "number"
        },
        onSpecificPageClick: {
            type: "function"
        },
        onPreviousClick: {
            type: "function"
        },
        onNextClick: {
            type: "function"
        }
    },
    parameters: {
        controls: {
            include: [
                'page',
                'totalPages',
                'onSpecificPageClick',
                'onPreviousClick',
                'onNextClick'
            ]
        }
    }
}

const meta: Meta<PaginationProps> = {
    title: 'UI-Kit/Pagination',
    component: PaginationComponent,
    parameters: {
        controls: {
            include: [
                'page',
                'totalPages',
                'onSpecificPageClick',
                'onPreviousClick',
                'onNextClick',
            ],
        },
    },
    args: {
        page: 1,
        totalPages: 10,
    }
}

export default meta