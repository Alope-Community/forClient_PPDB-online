import { IconMapPin } from "@tabler/icons-react";

export default function Hero() {
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
                    MTs LA TAHZAN
                </h2>
                <div className="mt-8 flex items-center space-x-2">
                    <IconMapPin
                        className="mb-10 md:mb-6 text-white"
                        size={30}
                    />
                    <p className="text-base md:text-lg">
                        KP. NYOMPOK RT. 017/008 Carenang Kec.
                        <br />
                        Cisoka Kab. Tangerang Banten
                    </p>
                </div>
            </div>
        </div>
    );
}
