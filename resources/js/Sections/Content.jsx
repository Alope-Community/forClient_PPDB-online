import { Link, usePage } from "@inertiajs/react";
import ButtonComponent from "../Components/Button";

export default function Content() {
    const { info } = usePage().props;

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-4 py-16">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                <div className="md:w-1/2 text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold">MTs PUI CIKASO</h2>
                    <p className="mt-4 text-primary">
                        {info["Kata Selamat Datang"] ||
                            "Kata Selamat Datang belum tersedia."}
                    </p>
                    <div className="mt-8">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                            link={"/pendaftaran-jalur-reguler"}
                        />
                    </div>
                </div>
                <div className="md:w-1/2 md:flex justify-center hidden">
                    <img
                        src="/image/logo.png"
                        alt="Logo MTs PUI CIKASO"
                        className="w-48 md:w-[300px]"
                    />
                </div>
            </div>
            <div className="mt-16 bg-secondary text-white py-12 text-center rounded-lg shadow-lg">
                <p className="text-xl italic font-semibold">
                    "{info["Motto Sekolah"] || "Motto belum tersedia."}"
                </p>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold">Program Unggulan</h2>
            </div>
            <div className="mt-8 grid gap-8">
                {info["Program Unggulan"] ? (
                    (Array.isArray(info["Program Unggulan"])
                        ? info["Program Unggulan"]
                        : typeof info["Program Unggulan"] === "string"
                        ? JSON.parse(info["Program Unggulan"])
                        : Object.values(info["Program Unggulan"])
                    ).map((program, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            } items-center gap-6`}
                        >
                            <img
                                src={`${program.image}`}
                                alt={program.title}
                                className="w-full md:w-1/2 h-60 object-cover rounded-md"
                            />
                            <div className="md:w-1/2">
                                <h3 className="text-xl font-semibold">
                                    {program.title}
                                </h3>
                                <p className="mt-2 text-primary">
                                    {program.desc}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Program belum tersedia.
                    </p>
                )}
            </div>

            <div className="mt-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Visi & Misi</h2>
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-secondary">
                        <h3 className="text-xl font-semibold text-secondary">
                            Visi
                        </h3>
                        <p className="mt-4 mx-5 text-gray-700">
                            <ul className="mt-4 list-disc text-gray-700">
                                {info.Visi ? (
                                    (Array.isArray(info.Visi)
                                        ? info.Visi
                                        : typeof info.Visi === "string"
                                        ? JSON.parse(info.Visi)
                                        : Object.values(info.Visi)
                                    ).map((visi, index) => (
                                        <li key={index} className="my-4">
                                            {visi}
                                        </li>
                                    ))
                                ) : (
                                    <li>Visi belum tersedia.</li>
                                )}
                            </ul>
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-secondary">
                        <h3 className="text-xl font-semibold text-secondary">
                            Misi
                        </h3>
                        <ul className="mt-4 mx-5 list-disc text-gray-700">
                            {info.Misi ? (
                                (Array.isArray(info.Misi)
                                    ? info.Misi
                                    : typeof info.Misi === "string"
                                    ? JSON.parse(info.Misi)
                                    : Object.values(info.Misi)
                                ).map((misi, index) => (
                                    <li key={index} className="my-4">
                                        {misi}
                                    </li>
                                ))
                            ) : (
                                <li>Misi belum tersedia.</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold">Ekstrakurikuler</h2>
                </div>
                <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 gap-8">
                    {info.Eskul ? (
                        (Array.isArray(info.Eskul)
                            ? info.Eskul
                            : typeof info.Eskul === "string"
                            ? JSON.parse(info.Eskul)
                            : Object.values(info.Eskul)
                        ).map((eskul, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-secondary hover:text-white transition-all duration-300 border-2"
                            >
                                <h3 className="text-lg font-semibold">
                                    {eskul}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            Data ekstrakurikuler belum tersedia.
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold">Mari Bergabung!!</h2>
                <p className="mt-2 text-primary">
                    MTs PUI CIKASO membuka dua jalur pendaftaran, yaitu Reguler
                    untuk umum dan Afirmasi bagi siswa berprestasi atau kurang
                    mampu.
                </p>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-16 mt-8 items-center">
                <div className="pb-4 md:pb-0 md:pr-12 flex flex-col md:items-end items-center">
                    <h3 className="text-xl font-semibold text-center md:text-right">
                        Jalur Reguler
                    </h3>
                    <p className="text-secondary text-center md:text-right">
                        14 Juni 2025 - 14 Agustus 2025
                    </p>
                    <h4 className="mt-4 font-semibold text-center md:text-right">
                        Persyaratan
                    </h4>
                    <ul className="mt-2 list-none text-center md:text-right">
                        {[
                            "Pas Foto",
                            "Kartu Keluarga",
                            "AKTE Kelahiran",
                            "KIA/KTP Orang Tua",
                            "Ijazah SKL",
                            "SKHU/Raport Kelas 5",
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-center md:justify-end items-center"
                            >
                                <span className="mr-2">{item}</span>
                                <span>•</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 text-center md:text-right md:mt-10">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                            link="/pendaftaran-jalur-reguler"
                        />
                    </div>
                </div>

                <div className="hidden md:flex justify-center">
                    <div className="w-[2px] h-[350px] bg-secondary"></div>
                </div>

                <div className="pb-4 md:pb-0 md:pl-12 flex flex-col md:items-start items-center">
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
                        {[
                            "Pas Foto",
                            "Kartu Keluarga",
                            "AKTE Kelahiran",
                            "KIA/KTP Orang Tua",
                            "Ijazah SKL",
                            "SKHU/Raport Kelas 5",
                            "KIP/PKH/KIP/SKTM",
                        ].map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <div className="mt-5 text-center md:text-left">
                        <ButtonComponent
                            text="Daftar Sekarang"
                            variant="secondary"
                            size="lg"
                            color="white"
                            link="/pendaftaran-jalur-afirmasi"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
