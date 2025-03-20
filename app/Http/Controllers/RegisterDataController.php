<?php

namespace App\Http\Controllers;

use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterDataController extends Controller
{
    public function store(Request $request)
    {
        $userId = Auth::user()->id;

        $validatedData = $request->validate([
            'fatherName'    => 'required|string|max:255',
            'motherName'    => 'required|string|max:255',
            'phoneNumber'   => 'nullable|string|max:15',
            'fatherJob'     => 'required|string|max:100',
            'motherJob'     => 'required|string|max:100',
            'parentSalary'  => 'nullable|string|max:50',
            'distance'       => 'required|numeric|min:0',
            'address'        => 'required|string|max:500',
            'schoolOrigin'  => 'required|string|max:255',
            'schoolExpense'  => 'nullable|string|max:255',
        ], [
            'required' => ':attribute harus diisi!',
            'max'      => ':attribute terlalu panjang!',
            'numeric'  => ':attribute harus berupa angka!',
            'min'      => ':attribute tidak boleh kurang dari 0!',
        ], [
            'fatherName'   => 'Nama Ayah',
            'motherName'   => 'Nama Ibu',
            'phoneNumber'  => 'Nomor Telepon',
            'fatherJob'    => 'Pekerjaan Ayah',
            'motherJob'    => 'Pekerjaan Ibu',
            'parentSalary' => 'Penghasilan Orang Tua',
            'distance'      => 'Jarak Rumah ke Sekolah',
            'address'       => 'Alamat Rumah',
            'schoolOrigin' => 'Asal Sekolah',
        ]);

        $formattedData = [
            'user_id'       => $userId,
            'father_name'   => $validatedData['fatherName'],
            'mother_name'   => $validatedData['motherName'],
            'phone_number'  => $validatedData['phoneNumber'] ?? null,
            'father_job'    => $validatedData['fatherJob'],
            'mother_job'    => $validatedData['motherJob'],
            'parent_salary' => $validatedData['parentSalary'] ?? null,
            'distance'      => $validatedData['distance'],
            'address'       => $validatedData['address'],
            'school_origin' => $validatedData['schoolOrigin'] ?? null,
            'school_expense' => $validatedData['schoolExpense'] ?? null,
        ];


        try {
            UserDetail::create($formattedData);
            return redirect()->route('dashboard')->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan, coba lagi.');
        }
    }
}
