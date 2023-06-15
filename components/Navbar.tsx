export default function Navbar() {
    return (
        <nav className="bg-white shadow sticky top-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center"><img className="block h-8 w-auto"
                                                                              src="logo.png" alt="NotiFire"/>
                            <div
                                className="ml-3 sm:text-xl lg:text-2xl font-extrabold tracking-tight text-gray-900">Noti<span
                                className="text-blue-600">Fire</span>
                            </div>
                        </div>

                    </div>

                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <div
                                className="ml-3 sm:text-xl lg:text-2xl font-extrabold tracking-tight text-gray-900"><span
                                className="text-blue-600">Ali</span>&nbsp;Almahdi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}