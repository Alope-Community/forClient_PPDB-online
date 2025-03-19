export default function Footer() {
    return (
        <footer className="text-white border-t-4 border-yellow-500 bg-secondary">
            <div className="container mx-auto">
                <div className="px-10 py-8 flex flex-col md:flex-row justify-between gap-8">
                    <div className="md:w-1/3 px-5">
                        <h2 className="text-lg font-semibold">MTs LA TAHZAN</h2>
                        <p className="text-sm leading-relaxed">
                            Madrasah Tsanawiyah berakreditasi B yang berkomitmen
                            mencetak generasi islami yang cerdas, berakhlak, dan
                            siap menghadapi tantangan masa depan dengan ilmu dan
                            iman.
                        </p>
                    </div>
                    <div className="md:w-1/5 px-5">
                        <h3 className="font-semibold text-sm underline underline-offset-4 decoration-white decoration-2 mb-4">
                            Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#beranda"
                                    className="transition-colors hover:text-yellow-500"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#daftar-reguler"
                                    className="transition-colors hover:text-yellow-500"
                                >
                                    Daftar Jalur Reguler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#daftar-afirmasi"
                                    className="transition-colors hover:text-yellow-500"
                                >
                                    Daftar Jalur Afirmasi
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/3 px-5">
                        <h3 className="font-semibold text-sm underline underline-offset-4 decoration-white decoration-2 mb-4">
                            Kontak
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <div className="w-5 h-5 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <p className="text-sm leading-relaxed">
                                    KP. Nyompok RT. 07/008 Carenang <br />
                                    Kec. Cisoka Kab. Tangerang Banten
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <p className="text-sm">+62812-1234-1234</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-10 pb-4">
                    <p className="text-center text-xs text-white mt-4">
                        © 2025 MTs La Tahzan. Semua Hak Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
