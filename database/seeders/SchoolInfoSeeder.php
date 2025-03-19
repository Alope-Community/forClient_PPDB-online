<?php

namespace Database\Seeders;

use App\Models\SchoolInfo;
use Illuminate\Database\Seeder;

class SchoolInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['key' => 'program_keunggulan', 'value' => json_encode([
                ['title' => 'Tahfidz Quran', 'desc' => "Program Tahfidz Al-Qur'an di MTs LA Tahzan membimbing siswa menghafal dan memahami Al-Qur'an agar mendapatkan keberkahan hidup dunia & akhirat.", 'image' => "../image/tahfidz.jpg"],
                ['title' => 'Kurikulum Terbaru', 'desc' => "MTs LA Tahzan menerapkan kurikulum terbaru dengan mengintegrasikan sains, seni, dan teknologi untuk mencetak generasi cerdas dan berakhlak.", 'image' => "../image/hero/hero.jpg"],
            ])],
            ['key' => 'deskripsi_sekolah', 'value' => 'Selamat datang di MTs LA Tahzan, madrasah tsanawiyah berakreditasi A yang berkomitmen mencetak generasi islami yang unggul dalam akademik.'],
            ['key' => 'motto_sekolah', 'value' => 'Menjadi Generasi Berprestasi dan Berakhlak Mulia'],
            ['key' => 'visi', 'value' => json_encode([
                "Menjadi madrasah unggulan yang mencetak generasi Islami berprestasi di bidang akademik dan non-akademik.",
                "Membangun karakter siswa yang berakhlak mulia, mandiri, dan bertanggung jawab sesuai ajaran Islam.",
                "Mewujudkan lingkungan pendidikan yang inovatif, berbasis teknologi, dan berwawasan global.",
                "Menjadikan madrasah sebagai pusat pembelajaran yang berorientasi pada nilai-nilai keislaman dan kebangsaan."
            ])],
            ['key' => 'misi', 'value' => json_encode([
                "Menyelenggarakan pendidikan berbasis nilai-nilai Islam untuk membentuk pribadi yang beriman dan bertakwa.",
                "Mengembangkan kurikulum yang terintegrasi dengan sains, teknologi, dan seni untuk mencetak generasi berdaya saing tinggi.",
                "Membimbing siswa dalam menghafal, memahami, dan mengamalkan Al-Qur’an dalam kehidupan sehari-hari.",
                "Menanamkan jiwa kepemimpinan, kemandirian, dan rasa tanggung jawab melalui berbagai kegiatan ekstrakurikuler."
            ])],
            ['key' => 'eskul', 'value' => json_encode(['Futsal', 'Basket', 'Paskibra', 'Pramuka'])],
        ];

        foreach ($data as $item) {
            SchoolInfo::updateOrCreate(['key' => $item['key']], ['value' => $item['value']]);
        }
    }
}
