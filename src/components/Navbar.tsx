import logo from '../assets/Logo.png'

const Navbar = () => {

    return (
        <header className="fixed z-40 py-3 w-full pr-3 sm:px-12 bg-primary-200 border-b text-primary-50">
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-0">
                <img src={logo} alt="logo sb tuit"  width={60}/>
                {/* <img src={localStorage.getItem('role')== "Admin"? logo : user} alt="logo" className="h-8 md:h-12 mr-2" /> */}
                <ul className="flex items-center gap-3">
                    <li className="text-xl font-semibold">Admin</li>
                    {/* <li><RxHamburgerMenu size={28}/></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar