import Listing from './pages/Listing.tsx'
import Upsert from './pages/Upsert.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Listing/>
    },
    {
        path: '/employees',
        element: <Listing/>
    },
    {
        path: '/employees/upsert',
        element: <Upsert/>
    },
    {
        path: '/employees/upsert/:id',
        element: <Upsert/>
    }
])

const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
