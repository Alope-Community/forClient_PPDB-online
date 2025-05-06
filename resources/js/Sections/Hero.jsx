import { usePage } from "@inertiajs/react";

export default function Hero() {
    const { info } = usePage().props;

    return (
        <div className="relative w-full min-h-[400px] md:min-h-[600px] lg:min-h-[800px] top-16 md:top-0">
            <img
                src="../image/hero/hero.jpg"
                alt="PPDB Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-16 text-white z-20">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Penerimaan Peserta <br />
                    Didik Baru
                </h1>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mt-2">
                    MTs PUI Cikaso
                </h2>
                <div className="flex items-center space-x-2 mt-5">
                    <div className="text-white">
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
                    <p className="text-base md:text-lg">{info["Alamat"]}</p>
                </div>
            </div>
        </div>
    );
}
