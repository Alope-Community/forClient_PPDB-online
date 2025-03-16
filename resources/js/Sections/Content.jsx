import ButtonComponent from "../Components/Button";

export default function Content() {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-4 py-16">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 ">
                <div className="md:w-1/2 text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold">MTs LA TAHZAN</h2>
                    <p className="mt-4 text-primary">
                        Selamat datang di MTs LA Tahzan, madrasah tsanawiyah
                        berakreditasi A yang berkomitmen mencetak generasi
                        islami yang unggul dalam akademik.
                    </p>
                    <div className="mt-8">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 md:flex justify-center hidden">
                    <img
                        src="../image/logo.png"
                        alt="Logo MTs LA Tahzan"
                        className="w-48 md:w-[300px]"
                    />
                </div>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold">Program Unggulan</h2>
            </div>
            <div className="mt-8 grid gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src="../image/tahfidz.jpg"
                        alt="Tahfidz Quran"
                        className="w-full md:w-1/2 h-60 object-cover rounded-md"
                    />
                    <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold">Tahfidz Quran</h3>
                        <p className="mt-2 text-primary">
                            Program Tahfidz Al-Qur'an di MTs LA Tahzan
                            membimbing siswa menghafal dan memahami Al-Qur'an
                            agar mendapatkan keberkahan hidup dunia & akhirat.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                    <img
                        src="../image/hero/hero.jpg"
                        alt="Kurikulum Terbaru"
                        className="w-full md:w-1/2 h-60 object-cover rounded-md"
                    />
                    <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold">
                            Kurikulum Terbaru
                        </h3>
                        <p className="mt-2 text-primary">
                            MTs LA Tahzan menerapkan kurikulum terbaru dengan
                            mengintegrasikan sains, seni, dan teknologi untuk
                            mencetak generasi cerdas dan berakhlak.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold">Mari Bergabung!!</h2>
                <p className="mt-2 text-primary">
                    MTs La Tahzan membuka dua jalur pendaftaran, yaitu Reguler
                    untuk umum dan Afirmasi bagi siswa berprestasi atau kurang
                    mampu.
                </p>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-16 mt-8 items-center">
                <div className="pb-4 md:pb-0 md:pr-12 flex flex-col items-end">
                    <h3 className="text-xl font-semibold text-center md:text-right">
                        Jalur Reguler
                    </h3>
                    <p className="text-secondary text-center md:text-right">
                        14 Juni 2025 – 14 Agustus 2025
                    </p>
                    <h4 className="mt-4 font-semibold text-center md:text-right">
                        Persyaratan
                    </h4>
                    <ul className="mt-2 list-none text-center md:text-right">
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">Pas Foto</span>
                            <span>•</span>
                        </li>
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">Kartu Keluarga</span>
                            <span>•</span>
                        </li>
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">AKTE Kelahiran</span>
                            <span>•</span>
                        </li>
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">KIA/KTP Orang Tua</span>
                            <span>•</span>
                        </li>
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">Ijazah SKL</span>
                            <span>•</span>
                        </li>
                        <li className="flex justify-center md:justify-end items-center">
                            <span className="mr-2">SKHU/Raport Kelas 5</span>
                            <span>•</span>
                        </li>
                    </ul>
                    <div className="mt-5 text-center md:text-right md:mt-10">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                            link={"/pendaftaran-jalur-reguler"}
                        />
                    </div>
                </div>
                <div className="hidden md:flex justify-center">
                    <div className="w-[2px] h-[350px] bg-secondary"></div>
                </div>
                <div className="pb-4 md:pb-0 md:pl-12">
                    <h3 className="text-xl font-semibold text-center md:text-left">
                        Jalur Afirmasi
                    </h3>
                    <p className="text-secondary text-center md:text-left">
                        14 Juni 2025 – 14 Agustus 2025
                    </p>
                    <h4 className="mt-4 font-semibold text-center md:text-left">
                        Persyaratan
                    </h4>
                    <ul className="mt-2 text-primary list-disc list-inside text-center md:text-left">
                        <li>Pas Foto</li>
                        <li>Kartu Keluarga</li>
                        <li>AKTE Kelahiran</li>
                        <li>KIA/KTP Orang Tua</li>
                        <li>Ijazah SKL</li>
                        <li>SKHU/Raport Kelas 5</li>
                        <li>KIP/PKH/KIP/SKTM</li>
                    </ul>
                    <div className="mt-5 text-center md:text-left">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                            link={"/pendaftaran-jalur-afirmasi"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
