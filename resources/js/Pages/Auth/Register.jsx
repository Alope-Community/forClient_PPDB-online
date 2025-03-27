import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        nisn: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 ">
            <Head title="Registrasi" />

            <div className="absolute top-4 left-1 sm:top-6 sm:left-10">
                <Link
                    href="/"
                    className="px-3 py-2 text-sm sm:text-base text-secondary rounded-md transition-transform duration-300 border border-secondary hover:bg-secondary hover:text-white flex items-center gap-2 flex-wrap w-full sm:w-auto"
                >
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
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
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                        </svg>
                    </div>
                    <span>Kembali</span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full max-w-6xl">
                {/* Bagian Logo dan Judul */}
                <div className="flex flex-col items-center md:w-1/2 mt-16 sm:mt-0">
                    <h1 className="text-4xl sm:text-5xl font-bold text-center">
                        MTs PUI CIKASO
                    </h1>
                    <img
                        src="/image/logo.png"
                        alt="Logo MTs PUI CIKASO"
                        className="w-64 sm:w-80 mt-6"
                    />
                </div>

                {/* Form Registrasi */}
                <div className="w-full md:w-1/2 bg-white p-6 sm:p-8">
                    <form
                        onSubmit={submit}
                        className="border-2 border-secondary p-6 rounded-lg"
                    >
                        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-6 text-gray-800">
                            Registrasi
                        </h2>

                        {/* Input Nama */}
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Nama"
                                className="text-lg font-semibold"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Masukan nama calon siswa"
                                value={data.name}
                                className="mt-2 block w-full border-secondary"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Input NISN */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <InputLabel
                                    htmlFor="nisn"
                                    value="NISN"
                                    className="text-lg font-semibold"
                                />
                                <a
                                    href="https://nisn.data.kemdikbud.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm italic"
                                >
                                    Cek NISN disini*
                                </a>
                            </div>
                            <TextInput
                                id="nisn"
                                name="nisn"
                                placeholder="Masukan NISN calon siswa"
                                value={data.nisn}
                                className="mt-1 block w-full border-secondary"
                                onChange={(e) =>
                                    setData("nisn", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.nisn}
                                className="mt-2"
                            />
                        </div>

                        {/* Input Email */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-lg font-semibold"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Masukan email calon siswa"
                                value={data.email}
                                className="mt-2 block w-full border-secondary"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Input Password */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-lg font-semibold"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Masukan password calon siswa"
                                value={data.password}
                                className="mt-2 block w-full border-secondary"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Tombol Registrasi */}
                        <div className="mt-6 text-center">
                            <PrimaryButton
                                className="w-full sm:w-2/3 bg-secondary mx-auto hover:bg-secondary/90"
                                disabled={processing}
                            >
                                Registrasi
                            </PrimaryButton>
                        </div>

                        {/* Link ke halaman login */}
                        <div className="mt-3 text-center">
                            <span>Sudah punya akun? </span>
                            <Link
                                href={route("login")}
                                className="text-blue-500"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
