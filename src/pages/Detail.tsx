import {Badge, DataList, Dialog, Link} from '@radix-ui/themes'
import {useQuery} from '@tanstack/react-query'
import {getEmployee} from "../apis/employees.api.tsx";
import {useState} from "react";
import {toast} from "react-toastify";

type Props = {
    id: string
}

const Detail = ({id}: Props) => {

    const [isOpen, setIsOpen] = useState(false)

    const employeeQuery = useQuery({
        queryKey: ['employee', id],
        queryFn: () => getEmployee(id)
    })

    const onOpenChange = () => {
        if (employeeQuery.data?.data) {
            setIsOpen(!isOpen)
        } else {
            toast.error('Failed to fetch employee detail')
        }
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Trigger>
                <Link href="#">Detail</Link>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="90%">
                <Dialog.Title>Employee detail</Dialog.Title>
                <DataList.Root>
                    {
                        Object.entries(employeeQuery.data?.data || {}).map(([key, value], index) => {
                            return (
                                <DataList.Item align="center" key={index}>
                                    <DataList.Label minWidth="88px">{key}</DataList.Label>
                                    <DataList.Value>
                                        <Badge color="jade" variant="soft" radius="full">
                                            {JSON.stringify(value)}
                                        </Badge>
                                    </DataList.Value>
                                </DataList.Item>
                            )
                        })
                    }
                </DataList.Root>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default Detail