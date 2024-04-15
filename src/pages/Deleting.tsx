import {AlertDialog, Button, Flex, Link} from '@radix-ui/themes'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteEmployee} from "../apis/employees.api.tsx";
import {toast} from "react-toastify";

type Props = {
    id: string
}

function Deleting({id}: Props) {

    const queryClient = useQueryClient()

    const onDeleteMutation = useMutation({
        mutationFn: (id: string) => deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})
                .then()
            toast.success('Employee deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete employee')
        }
    })

    const onDelete = () => onDeleteMutation.mutate(id)

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Link href="#">Delete</Link>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete employee</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? The employee will be deleted permanently.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={onDelete}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default Deleting