import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = ({}) => {
    return (
        <nav className='flex justify-between px-10 items-center py-2'>
            <Link href='/' className='text-3xl font-black tracking-wider'>
                Dish Spotter
            </Link>
            <div className='flex items-center gap-3'>
                <Link href='/sad'>Home</Link>
            </div>
        </nav>
    )
}

export default Navbar
