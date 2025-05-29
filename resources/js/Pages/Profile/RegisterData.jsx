import { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import ButtonComponent from "../../Components/Button";

export default function RegisterData() {
    const { errors, flash } = usePage().props;
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [formData, setFormData] = useState({
        fatherName: "",
        motherName: "",
        phoneNumber: "",
        fatherJob: "",
        motherJob: "",
        parentSalary: "",
        schoolExpense: "",
        distance: "",
        address: "",
        schoolOrigin: "",
        //
        gender: "",
        birthPlace: "",
        birthDate: "",
        religion: "",
        citizenship: "",
        familyOrder: "",
        numberOfSiblings: "",
        familyStatus: "",
        schoolOriginType: "",
        graduationYear: "",
        extracurricular: [],
    });

    const [otherFormParentJob, setOtherFormParentJob] = useState({
        father: false,
        mother: false,
    });

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // if (value == "lainnya") {
        //     if (name == "fatherJob") {
        //         setOtherFormParentJob((prev) => ({
        //             ...prev,
        //             father: true,
        //         }));
        //     } else if (name == "motherJob") {
        //         setOtherFormParentJob((prev) => ({
        //             ...prev,
        //             mother: true,
        //         }));
        //     }
        // } else {
        //     setFormData({ ...formData, [name]: value });
        // }
        const { name, value, type, checked } = e.target;

        if (name === "extracurricular") {
            if (checked) {
                // kalau dicentang, tambahkan ke array
                setFormData((prev) => ({
                    ...prev,
                    extracurricular: [...prev.extracurricular, value],
                }));
            } else {
                // kalau di-uncheck, hapus dari array
                setFormData((prev) => ({
                    ...prev,
                    extracurricular: prev.extracurricular.filter(
                        (item) => item !== value
                    ),
                }));
            }
        } else if (value == "lainnya") {
            if (name == "fatherJob") {
                setOtherFormParentJob((prev) => ({
                    ...prev,
                    father: true,
                }));
            } else if (name == "motherJob") {
                setOtherFormParentJob((prev) => ({
                    ...prev,
                    mother: true,
                }));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        router.post("/register-data", formData);
    };

    useEffect(() => {
        if (flash.success) {
            setAlert({ type: "success", message: flash.success });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
        if (flash.error) {
            setAlert({ type: "error", message: flash.error });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
    }, [flash]);

    const { props } = usePage();
    const successMessage = props.flash?.success;
    const [showToast, setShowToast] = useState(!!successMessage);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000); // 2 detik = 2000 ms

            return () => clearTimeout(timer); // bersihkan timer kalau unmount
        }
    }, [successMessage]);

    return (
        <>
            {/* {showToast && (
                <div className="bg-green-500 text-white px-6 py-3 rounded shadow fixed z-[70] w-[200px] left-1/2 -translate-x-1/2 top-4 text-center transition-all duration-300">
                    {successMessage}
                </div>
            )} */}
            <Head title="Registrasi Data" />
            <div className="flex justify-center items-center min-h-screen p-4 bg-cover bg-[url('../image/hero/hero.jpg')] after:content-[''] after:absolute relative after:bg-black/60 after:inset-0">
                <div className="w-full mx-20 p-6 bg-white shadow-md rounded-lg border border-secondary text-primary z-10">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        Upload Data Pribadi
                    </h2>
                    {alert.message && (
                        <div
                            className={`p-3 mb-4 text-white rounded ${
                                alert.type === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}
                        >
                            {alert.message}
                        </div>
                    )}
                    <div className="mt-4 w-full">
                        <form onSubmit={handleSubmit}>
                            <section className="grid grid-cols-2 gap-6 mb-10">
                                <div className="col-span-2">
                                    <hr />
                                    <h3 className="text-xl mt-3 font-semibold">
                                        Data Pribadi
                                    </h3>
                                </div>
                                <div className="grid gap-6 grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Jenis Kelamin
                                        </label>
                                        <span className="inline-flex gap-2 items-center mr-5">
                                            <input
                                                id="gMale"
                                                name="gender"
                                                onChange={handleChange}
                                                type="radio"
                                                value={"male"}
                                            />
                                            <label htmlFor="gMale">
                                                Laki-laki
                                            </label>
                                        </span>
                                        <span className="inline-flex gap-2 items-center">
                                            <input
                                                id="gFemale"
                                                name="gender"
                                                onChange={handleChange}
                                                type="radio"
                                                value={"female"}
                                            />
                                            <label htmlFor="gFemale">
                                                Perempuan
                                            </label>
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Asal Sekolah
                                        </label>
                                        <input
                                            name="schoolOrigin"
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Asal Sekolah"
                                            className={`w-full p-2 border rounded-md ${
                                                errors.schoolOrigin &&
                                                formData.schoolOrigin === ""
                                                    ? "border-red-500"
                                                    : "border-primary/50"
                                            }`}
                                        />
                                        {errors.schoolOrigin &&
                                            formData.schoolOrigin === "" && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.schoolOrigin}
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div className="grid gap-6 grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Asal Sekolah
                                        </label>
                                        <span className="inline-flex gap-2 items-center mr-5">
                                            <input
                                                id="sotSD"
                                                name="schoolOriginType"
                                                onChange={handleChange}
                                                type="radio"
                                                value={"SD"}
                                            />
                                            <label htmlFor="sotSD">SD</label>
                                        </span>
                                        <span className="inline-flex gap-2 items-center mr-5">
                                            <input
                                                id="sotMI"
                                                name="schoolOriginType"
                                                onChange={handleChange}
                                                type="radio"
                                                value={"MI"}
                                            />
                                            <label htmlFor="sotMI">MI</label>
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Tahun Lulus
                                        </label>
                                        <select
                                            name="graduationYear"
                                            className={`w-full p-2 border rounded-md`}
                                            onChange={handleChange}
                                        >
                                            <option value="" hidden>
                                                Pilih Tahun Lulus
                                            </option>
                                            <option value="2024">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        name="birthPlace"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Tempat Lahir"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.birthPlace &&
                                            formData.birthPlace === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.birthPlace &&
                                        formData.birthPlace === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.birthPlace}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        name="birthDate"
                                        onChange={handleChange}
                                        type="date"
                                        placeholder="Tanggal Lahir"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.birthDate &&
                                            formData.birthDate === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.birthDate &&
                                        formData.birthDate === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.birthDate}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Agama
                                    </label>
                                    <select
                                        name="religion"
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${
                                            errors.religion &&
                                            formData.religion === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    >
                                        <option value="" hidden>
                                            Pilih Agama
                                        </option>
                                        <option value="islam">Islam</option>
                                        <option value="kristen">Kristen</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="budha">Budha</option>
                                        <option value="konghucu">
                                            Konghucu
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Kewarganegaraan
                                    </label>
                                    <input
                                        name="citizenship"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Kewarganegaraan"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.citizenship &&
                                            formData.citizenship === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.citizenship &&
                                        formData.citizenship === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.citizenship}
                                            </p>
                                        )}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium mb-1">
                                        Anak ke
                                    </label>
                                    <input
                                        name="familyOrder"
                                        onChange={handleChange}
                                        type="text"
                                        className={`p-2 border rounded-md`}
                                    />
                                    <label className="text-sm font-medium mb-1">
                                        dari
                                    </label>
                                    <input
                                        name="numberOfSiblings"
                                        onChange={handleChange}
                                        type="text"
                                        className={`p-2 border rounded-md`}
                                    />
                                    <p>Bersaudara</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Anak
                                    </label>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="fsYatim"
                                            name="familyStatus"
                                            onChange={handleChange}
                                            type="radio"
                                            value={"yatim"}
                                        />
                                        <label htmlFor="fsYatim">Yatim</label>
                                    </span>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="fsPiatu"
                                            name="familyStatus"
                                            onChange={handleChange}
                                            type="radio"
                                            value={"piatu"}
                                        />
                                        <label htmlFor="fsPiatu">Piatu</label>
                                    </span>
                                    <span className="inline-flex gap-2 items-center">
                                        <input
                                            id="fsYatimPiatu"
                                            name="familyStatus"
                                            onChange={handleChange}
                                            type="radio"
                                            value={"Yatim Piatu"}
                                        />
                                        <label htmlFor="fsYatimPiatu">
                                            Yatim Piatu
                                        </label>
                                    </span>
                                </div>
                            </section>
                            <section className="grid grid-cols-2 gap-6 mb-10">
                                <div className="col-span-2">
                                    <hr />
                                    <h3 className="text-xl mt-3 font-semibold">
                                        Data Orang Tua
                                    </h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nama Ayah
                                    </label>
                                    <input
                                        name="fatherName"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Nama Ayah"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.fatherName &&
                                            formData.fatherName === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.fatherName &&
                                        formData.fatherName === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.fatherName}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nama Ibu
                                    </label>
                                    <input
                                        name="motherName"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Nama Ibu"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.motherName &&
                                            formData.motherName === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.motherName &&
                                        formData.motherName === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.motherName}
                                            </p>
                                        )}
                                </div>
                                <div className="flex  gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">
                                            Pekerjaan Ayah
                                        </label>
                                        <select
                                            name="fatherJob"
                                            onChange={handleChange}
                                            className={`w-full p-2 border rounded-md ${
                                                errors.fatherJob &&
                                                formData.fatherJob === ""
                                                    ? "border-red-500"
                                                    : "border-primary/50"
                                            }`}
                                        >
                                            <option value="">
                                                Pilih Salah Satu
                                            </option>
                                            <option value="pegawai">
                                                Pegawai
                                            </option>
                                            <option value="wiraswasta">
                                                Wiraswasta
                                            </option>
                                            <option value="pedagang">
                                                Pedagang
                                            </option>
                                            <option value="lainnya">
                                                Lainnya
                                            </option>
                                        </select>
                                        {errors.fatherJob &&
                                            formData.fatherJob === "" && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.fatherJob}
                                                </p>
                                            )}
                                    </div>
                                    {otherFormParentJob.father && (
                                        <div className="flex-[2]">
                                            <label className="block text-sm font-medium mb-1 invisible">
                                                Pekerjaan Ayah
                                            </label>
                                            <input
                                                name="fatherJob"
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Pekerjaan Ayah"
                                                className={`w-full p-2 border rounded-md ${
                                                    errors.fatherJob &&
                                                    formData.fatherJob === ""
                                                        ? "border-red-500"
                                                        : "border-primary/50"
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">
                                            Pekerjaan Ibu
                                        </label>
                                        <select
                                            name="motherJob"
                                            onChange={handleChange}
                                            className={`w-full p-2 border rounded-md ${
                                                errors.motherJob &&
                                                formData.motherJob === ""
                                                    ? "border-red-500"
                                                    : "border-primary/50"
                                            }`}
                                        >
                                            <option value="">
                                                Pilih Salah Satu
                                            </option>
                                            <option value="IRT">IRT</option>
                                            <option value="pedagang">
                                                Pedagang
                                            </option>
                                            <option value="pegawai">
                                                Pegawai
                                            </option>
                                            <option value="lainnya">
                                                Lainnya
                                            </option>
                                        </select>
                                        {errors.motherJob &&
                                            formData.motherJob === "" && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.motherJob}
                                                </p>
                                            )}
                                    </div>
                                    {otherFormParentJob.mother && (
                                        <div className="flex-[2]">
                                            <label className="block text-sm font-medium mb-1 invisible">
                                                Pekerjaan Ibu
                                            </label>
                                            <input
                                                name="motherJob"
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Pekerjaan Orang Tua"
                                                className={`w-full p-2 border rounded-md ${
                                                    errors.motherJob &&
                                                    formData.motherJob === ""
                                                        ? "border-red-500"
                                                        : "border-primary/50"
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Penghasilan Orang Tua
                                    </label>
                                    <input
                                        name="parentSalary"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Penghasilan Orang Tua"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.parentSalary &&
                                            formData.parentSalary === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.parentSalary &&
                                        formData.parentSalary === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.parentSalary}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nomor Telepon Orang Tua
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Nomor Telepon Orang Tua"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.phoneNumber &&
                                            formData.phoneNumber === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.phoneNumber &&
                                        formData.phoneNumber === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.phoneNumber}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Jarak Rumah Ke Sekolah (KM)
                                    </label>
                                    <input
                                        name="distance"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Jarak Rumah Ke Sekolah (KM)"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.distance &&
                                            formData.distance === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.distance &&
                                        formData.distance === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.distance}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Biaya Ongkos Sekolah (RP)
                                    </label>
                                    <input
                                        name="schoolExpense"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Jarak Rumah Ke Sekolah (KM)"
                                        className={`w-full p-2 border rounded-md ${
                                            errors.schoolExpense &&
                                            formData.schoolExpense === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    />
                                    {errors.schoolExpense &&
                                        formData.schoolExpense === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.schoolExpense}
                                            </p>
                                        )}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">
                                        Alamat Rumah
                                    </label>
                                    <textarea
                                        name="address"
                                        onChange={handleChange}
                                        cols={4}
                                        placeholder="Alamat Rumah"
                                        className={`w-full p-2 border rounded-md h-24 ${
                                            errors.address &&
                                            formData.address === ""
                                                ? "border-red-500"
                                                : "border-primary/50"
                                        }`}
                                    ></textarea>
                                    {errors.address &&
                                        formData.address === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.address}
                                            </p>
                                        )}
                                </div>
                            </section>
                            <section className="grid grid-cols-2 gap-6 mb-10">
                                <div className="col-span-2">
                                    <hr />
                                    <h3 className="text-xl mt-3 font-semibold">
                                        Ekstrakulikuler
                                    </h3>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 mr-5">
                                        Pilih Ekstrakulikuler :
                                    </label>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="ePaskibra"
                                            name="extracurricular"
                                            onChange={handleChange}
                                            type="checkbox"
                                            value={"Paskibra"}
                                        />
                                        <label htmlFor="ePaskibra">
                                            Paskibra
                                        </label>
                                    </span>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="ePramuka"
                                            name="extracurricular"
                                            onChange={handleChange}
                                            type="checkbox"
                                            value={"Pramuka"}
                                        />
                                        <label htmlFor="ePramuka">
                                            Pramuka
                                        </label>
                                    </span>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="eFutsal"
                                            name="extracurricular"
                                            onChange={handleChange}
                                            type="checkbox"
                                            value={"Futsal"}
                                        />
                                        <label htmlFor="eFutsal">Futsal</label>
                                    </span>
                                    <span className="inline-flex gap-2 items-center mr-5">
                                        <input
                                            id="eVoli"
                                            name="extracurricular"
                                            onChange={handleChange}
                                            type="checkbox"
                                            value={"Voli"}
                                        />
                                        <label htmlFor="eVoli">Voli</label>
                                    </span>
                                </div>
                            </section>
                            <div className="col-span-2 flex justify-between mt-4">
                                <ButtonComponent
                                    text="Simpan"
                                    variant="secondary"
                                    size="lg"
                                    type="submit"
                                    color="white"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
