import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Checkbox, Container, Flex, Grid, TextArea, TextField} from '@radix-ui/themes'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {addEmployee, getEmployee, updateEmployee} from '../apis/employees.api'
import {Address, Employee} from '../apis/types/employees.type'
import * as Form from '@radix-ui/react-form'
import {v4 as uuidV4} from 'uuid'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const initialAddress: Address = {
    street: '',
    town: '',
    postode: ''
}

const initialEmployee: Employee = {
    id: uuidV4(),
    name: '',
    dob: '',
    address: initialAddress,
    telephone: '',
    pets: [],
    score: 0,
    email: '',
    url: '',
    description: '',
    verified: false,
    salary: 0
}

function Upsert() {

    const navigate = useNavigate()
    const [employeeForm, setEmployeeForm] = useState<Employee>(initialEmployee)
    const {id} = useParams()
    const queryClient = useQueryClient()
    const [address, setAddress] = useState<string>('')
    const [pets, setPets] = useState<string>('')
    const employeeQuery = useQuery({
        queryKey: [
            'employee',
            id
        ],
        queryFn: () => getEmployee(id as string),
        enabled: id !== undefined,
        staleTime: 1000 * 60
    })

    const addEmployeeMutation = useMutation({
        mutationFn: (body: Employee) => addEmployee(body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})
                .then()
            toast.success('Employee added successfully')
            navigate('/employees')
        },
        onError: () => {
            toast.error('Error adding employee')
        }
    })

    const updateEmployeeMutation = useMutation({
        mutationFn: (body: Employee) => updateEmployee(body.id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employee', id]})
                .then()
            toast.success('Employee updated successfully')
            navigate('/employees')
        },
        onError: () => {
            toast.error('Error updating employee')
        }
    })

    useEffect(() => {
        if (employeeQuery.data?.data) {
            setEmployeeForm(employeeQuery.data.data)
            setAddress(employeeQuery.data.data.address.street + ' - ' + employeeQuery.data.data.address.town + ' - ' + employeeQuery.data.data.address.postode)
            setPets(employeeQuery.data.data.pets.join(', '))
        }
    }, [employeeQuery.data?.data])

    const onChangeEmployeeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeForm({
            ...employeeForm,
            [e.target.name]: e.target.value
        })
    }

    const onChangeTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmployeeForm({
            ...employeeForm,
            description: e.target.value
        })
    }

    const onCheckedChange = () => {
        setEmployeeForm({
            ...employeeForm,
            verified: !employeeForm.verified
        })
    }

    const onSaveEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const petsArray = pets.split(', ').map(pet => pet.trim())
        const addressArray = address.split(' - ')
        const newEmployeeForm = {
            ...employeeForm,
            pets: petsArray,
            address: {
                street: addressArray[0],
                town: addressArray[1],
                postode: addressArray[2]
            }
        }
        setEmployeeForm(newEmployeeForm)
        if (id) {
            updateEmployeeMutation.mutate(newEmployeeForm)
        } else {
            addEmployeeMutation.mutate(newEmployeeForm)
        }
    }

    const onChangePets = (e: React.FormEvent<HTMLInputElement>) => {
        setPets(e.currentTarget.value)
    }

    const onChangeAddress = (e: React.FormEvent<HTMLInputElement>) => {
        setAddress(e.currentTarget.value)
    }

    return (
        <Container mt={'5'}>
            <Form.Root className="FormRoot" onSubmit={onSaveEmployee}>
                <Grid columns='2' gap={'2'}>
                    {employeeQuery.data && employeeQuery.data.data && (
                        <Form.Field className="FormField" name="id">
                            <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                <Form.Label className="FormLabel">Id</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your id
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <TextField.Root
                                    type="text"
                                    required
                                    onChange={onChangeEmployeeForm}
                                    value={employeeForm.id}
                                    name='id'
                                    disabled={!!id}
                                />
                            </Form.Control>
                        </Form.Field>
                    )}

                    <Form.Field className="FormField" name="name">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Name</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your name
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="text"
                                required
                                value={employeeForm.name}
                                name='name'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="dob">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Day of birth</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your day of birth
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid day of birth
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="date"
                                required
                                value={employeeForm.dob}
                                name='dob'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="address">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Address</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your address
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="text"
                                required
                                value={address}
                                name='address'
                                onChange={onChangeAddress}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="telephone">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Telephone</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your telephone
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="text"
                                required
                                value={employeeForm.telephone}
                                name='telephone'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="pets">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Pets</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your pets
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="text"
                                required
                                value={pets}
                                name='pets'
                                onChange={onChangePets}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="score">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Score</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your score
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="number"
                                required
                                value={employeeForm.score}
                                name='score'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="email">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">email</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your email
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid email
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="email"
                                required
                                value={employeeForm.email}
                                name='email'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="url">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Url</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your url
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid url
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="url"
                                required
                                value={employeeForm.url}
                                name='url'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="salary">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Salary</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your salary
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid salary
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextField.Root
                                type="number"
                                required
                                value={employeeForm.salary}
                                name='salary'
                                onChange={onChangeEmployeeForm}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="verified">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Verified</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your verified
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid verified
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <Checkbox
                                checked={employeeForm.verified}
                                onClick={onCheckedChange}
                                name='verified'
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field className="FormField" name="description">
                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <Form.Label className="FormLabel">Description</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                Please enter your description
                            </Form.Message>
                            <Form.Message className="FormMessage" match="typeMismatch">
                                Please provide a valid description
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <TextArea
                                name='description'
                                value={employeeForm.description}
                                onChange={onChangeTextAreaInput}
                            />
                        </Form.Control>
                    </Form.Field>
                </Grid>
                <Form.Submit asChild>
                    <Flex justify={'center'} pt={'5'} gap={'1'}>
                        <Button>Save</Button>
                        <Button onClick={() => navigate(`/employees`)}>Cancel</Button>
                    </Flex>
                </Form.Submit>
            </Form.Root>
        </Container>
    )
}

export default Upsert