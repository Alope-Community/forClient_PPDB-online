export default function Maps() {
    return (
        <div className="w-full flex items-center justify-center py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-center rounded-lg">
                <div className="w-full md:w-1/2 max-w-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.846593167475!2d-122.08424968469218!3d37.421999779825295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c5d1b1b55%3A0xa28bd7c29b5b5f7c!2sGoogleplex!5e0!3m2!1sen!2sus!4v1618970631903!5m2!1sen!2sus"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Kontak Kami</h2>
                        <div className="flex items-center mb-2 gap-3">
                            <div className="text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                            </div>
                            <p className="text-primary">
                                3F8X+PJJ, Cikaso, Kec. Kramatmulya, Kabupaten
                                Kuningan, Jawa Barat 45553
                            </p>
                        </div>
                        <div className="flex items-center mb-2 gap-3">
                            <div className="text-primary mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                </svg>
                            </div>
                            <p className="text-primary">+62 812-1234-1234</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold mr-3">f</p>
                            <p className="text-primary">@MTs PUI CIKASO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
