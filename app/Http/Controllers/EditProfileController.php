<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EditProfileController extends Controller
{
    public function edit()
    {
        $user = Auth::user();
        $registration = $user->registration;
        $documents = $registration ? $registration->documents : collect([]);

        return Inertia::render('Profile/EditProfile', [
            'user' => $user,
            'detail' => $user->detail,
            'documents' => $documents
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'nisn' => 'nullable|string|max:20',
            'jarak_rumah' => 'nullable|numeric',
            'asal_sekolah' => 'nullable|string|max:255',
            'alamat_rumah' => 'nullable|string|max:255',
            'nama_ayah' => 'nullable|string|max:255',
            'nomor_telepon' => 'nullable|string|max:15',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'penghasilan_orang_tua' => 'nullable|numeric',
            'nama_ibu' => 'nullable|string|max:255',
            'nomor_ibu_hp' => 'nullable|string|max:15',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'upah_ibu' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('photo')) {
            $registration = $user->registration;
            if (!$registration) {
                return redirect()->back()->with('error', 'Data pendaftaran belum ditemukan, silahkan daftar melalui pilihan yang sesuai.');
            }

            $document = $registration->documents()->where('document_type', 'pas photo')->first();

            if ($document && $document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }

            $path = $request->file('photo')->store('documents', 'public');

            if ($document) {
                $document->update(['file_path' => $path]);
            } else {
                Document::create([
                    'registration_id' => $registration->id,
                    'document_type' => 'pas photo',
                    'file_path' => $path,
                ]);
            }
        } else {
            $request->request->remove('photo');
        }

        $user->update([
            'name' => $request->name,
            'nisn' => $request->nisn,
        ]);

        if ($user->detail) {
            $user->detail()->update([
                'distance' => $request->jarak_rumah,
                'school_origin' => $request->asal_sekolah,
                'address' => $request->alamat_rumah,
                'father_name' => $request->nama_ayah,
                'father_job' => $request->pekerjaan_ayah,
                'mother_name' => $request->nama_ibu,
                'mother_job' => $request->pekerjaan_ibu,
                'parent_salary' => $request->penghasilan_orang_tua,
                'phone_number' => $request->nomor_telepon,
            ]);
        } else {
            $user->detail()->create([
                'distance' => $request->jarak_rumah,
                'school_origin' => $request->asal_sekolah,
                'address' => $request->alamat_rumah,
                'father_name' => $request->nama_ayah,
                'father_job' => $request->pekerjaan_ayah,
                'mother_name' => $request->nama_ibu,
                'mother_job' => $request->pekerjaan_ibu,
                'parent_salary' => $request->penghasilan_orang_tua,
                'phone_number' => $request->nomor_telepon,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Profil berhasil diperbarui!');
    }
}
