import {DataTable} from "../../components/DynamicTable.tsx";

export interface Employee extends DataTable {
    id: string
    name: string
    dob: string
    address: Address
    telephone: string
    pets: string[]
    score: number
    email: string
    url: string
    description: string
    verified: boolean
    salary: number
}

export type Address = {
    street: string
    town: string
    postode: string
}