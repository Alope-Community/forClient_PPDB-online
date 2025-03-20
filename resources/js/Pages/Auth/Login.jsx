import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // <GuestLayout>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 ">
            <Head title="Log in" />

            {
                status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )
            }

            <div className="absolute top-4 left-1 sm:top-6 sm:left-10">
                <Link
                    href="/"
                    className="px-3 py-2 text-sm sm:text-base text-secondary rounded-md transition-transform duration-300 border border-secondary hover:bg-secondary hover:text-white flex items-center gap-2 flex-wrap w-full sm:w-auto"
                >
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </div>
                    <span>Kembali</span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full max-w-6xl">

                <div className="flex flex-col items-center md:w-1/2 mt-16 sm:mt-0">
                    <h1 className="text-4xl sm:text-5xl font-bold text-center">
                        MTs LA TAHZAN
                    </h1>
                    <img
                        src="/image/logo.png"
                        alt="Logo MTs LA TAHZAN"
                        className="w-64 sm:w-80 mt-6"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-white p-6 sm:p-8">

                    <form
                        onSubmit={submit}
                        className="border-2 border-secondary p-6 rounded-lg"
                    >
                        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-6 text-gray-800">
                            Login
                        </h2>

                        <div>
                            <InputLabel htmlFor="nisn" value="NISN" />

                            <TextInput
                                id="nisn"
                                type="number"
                                name="nisn"
                                value={data.nisn}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('nisn', e.target.value)}
                            />

                            <InputError message={errors.nisn} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-5 flex items-center justify-end">

                            <PrimaryButton className="w-full sm:w-2/3 bg-secondary mx-auto hover:bg-secondary/90" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                        <div className="mt-10 text-center">
                            <span>Belum punya akun? </span>
                            <Link
                                href={route("register")}
                                className="text-blue-500"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </GuestLayout >
    );
}
