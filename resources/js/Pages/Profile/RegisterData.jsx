import { useEffect, useState } from "react";
import { router, usePage } from '@inertiajs/react';
import ButtonComponent from "../../Components/Button";

export default function RegisterData() {
    const { errors, flash } = usePage().props
    const [alert, setAlert] = useState({ type: '', message: '' });
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/register-data", formData);
    };

    useEffect(() => {
        if (flash.success) {
            setAlert({ type: 'success', message: flash.success });
            setTimeout(() => setAlert({ type: '', message: '' }), 3000);
        }
        if (flash.error) {
            setAlert({ type: 'error', message: flash.error });
            setTimeout(() => setAlert({ type: '', message: '' }), 3000);
        }
    }, [flash]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full mx-20 p-6 bg-white shadow-md rounded-lg border border-secondary text-primary">
                <h2 className="text-center text-xl font-semibold mb-6">
                    Upload Data Pribadi
                </h2>
                {alert.message && (
                    <div className={`p-3 mb-4 text-white rounded ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {alert.message}
                    </div>
                )}
                <div className="mt-4 w-full">
                    <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Ayah</label>
                            <input name='fatherName' onChange={handleChange} type="text" placeholder="Nama Ayah" className={`w-full p-2 border rounded-md ${errors.fatherName && formData.fatherName === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.fatherName && formData.fatherName === '' && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Ibu</label>
                            <input name='motherName' onChange={handleChange} type="text" placeholder="Nama Ibu" className={`w-full p-2 border rounded-md ${errors.motherName && formData.motherName === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.motherName && formData.motherName === '' && <p className="text-red-500 text-sm">{errors.motherName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nomor Telepon Orang Tua</label>
                            <input name='phoneNumber' onChange={handleChange} type="text" placeholder="Nomor Telepon Orang Tua" className={`w-full p-2 border rounded-md ${errors.phoneNumber && formData.phoneNumber === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.phoneNumber && formData.phoneNumber === '' && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Pekerjaan Ayah</label>
                            <select name="fatherJob" onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.fatherJob && formData.fatherJob === '' ? 'border-red-500' : 'border-primary/50'}`}>
                                <option value="">Pilih Salah Satu</option>
                                <option value="pegawai">Pegawai</option>
                                <option value="wiraswasta">Wiraswasta</option>
                                <option value="pedagang">Pedagang</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                            {errors.fatherJob && formData.fatherJob === '' && <p className="text-red-500 text-sm">{errors.fatherJob}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Pekerjaan Ibu</label>
                            <select name="motherJob" onChange={handleChange} className={`w-full p-2 border rounded-md ${errors.motherJob && formData.motherJob === '' ? 'border-red-500' : 'border-primary/50'}`}>
                                <option value="">Pilih Salah Satu</option>
                                <option value="IRT">IRT</option>
                                <option value="pedagang">Pedagang</option>
                                <option value="pegawai">Pegawai</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                            {errors.motherJob && formData.motherJob === '' && <p className="text-red-500 text-sm">{errors.motherJob}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Penghasilan Orang Tua</label>
                            <input name='parentSalary' onChange={handleChange} type="number" placeholder="Penghasilan Orang Tua" className={`w-full p-2 border rounded-md ${errors.parentSalary && formData.parentSalary === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.parentSalary && formData.parentSalary === '' && <p className="text-red-500 text-sm">{errors.parentSalary}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Jarak Rumah Ke Sekolah (KM)</label>
                            <input name="distance" onChange={handleChange} type="number" placeholder="Jarak Rumah Ke Sekolah (KM)" className={`w-full p-2 border rounded-md ${errors.distance && formData.distance === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.distance && formData.distance === '' && <p className="text-red-500 text-sm">{errors.distance}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Biaya Ongkos Sekolah (RP)</label>
                            <input name="schoolExpense" onChange={handleChange} type="number" placeholder="Jarak Rumah Ke Sekolah (KM)" className={`w-full p-2 border rounded-md ${errors.schoolExpense && formData.schoolExpense === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.schoolExpense && formData.schoolExpense === '' && <p className="text-red-500 text-sm">{errors.schoolExpense}</p>}
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Alamat Rumah</label>
                            <textarea name='address' onChange={handleChange} cols={4} placeholder="Alamat Rumah" className={`w-full p-2 border rounded-md h-24 ${errors.address && formData.address === '' ? 'border-red-500' : 'border-primary/50'}`}></textarea>
                            {errors.address && formData.address === '' && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Asal Sekolah</label>
                            <input name='schoolOrigin' onChange={handleChange} type="text" placeholder="Asal Sekolah" className={`w-full p-2 border rounded-md ${errors.schoolOrigin && formData.schoolOrigin === '' ? 'border-red-500' : 'border-primary/50'}`} />
                            {errors.schoolOrigin && formData.schoolOrigin === '' && <p className="text-red-500 text-sm">{errors.schoolOrigin}</p>}
                        </div>
                        <div className="col-span-2 flex justify-between mt-4">
                            <ButtonComponent
                                text="Kembali"
                                variant="secondary"
                                size="lg"
                                color="white"
                            />
                            <ButtonComponent
                                text="Daftar Sekarang"
                                variant="secondary"
                                size="lg"
                                type='submit'
                                color="white"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
