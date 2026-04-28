import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Layout = () => {
    // Auth check removed to allow public pages


    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Layout