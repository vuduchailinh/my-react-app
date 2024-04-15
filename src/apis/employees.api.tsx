import { Employee } from './types/employees.type'
import { Pageable } from './types'
import http from '../utils/http'

export const getEmployees = (page: number | string, perPage: number | string = 10) =>
    http.get<Pageable<Employee>>('/employees', {
        params: {
            _page: page,
            _per_page: perPage
        }
    })

export const getEmployee = (id: string) => 
    http.get<Employee>(`/employees/${id}`)

export const addEmployee = (employee: Omit<Employee, 'id'>) => 
    http.post<Employee>('/employees', employee)

export const updateEmployee = (id: string, employee: Employee) =>
    http.put<Employee>(`/employees/${id}`, employee)

export const deleteEmployee = (id: string) => 
    http.delete<string>(`/employees/${id}`)