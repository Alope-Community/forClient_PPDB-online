<?php

namespace App\Filament\Exports;

use App\Models\User;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class UserExporter extends Exporter
{
    protected static ?string $model = User::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('nisn')
                ->label('NISN'),
            ExportColumn::make('name')
                ->label('Nama Lengkap'),
            ExportColumn::make('email'),
            ExportColumn::make('detail.father_name')
                ->label('Nama Ayah'),
            ExportColumn::make('detail.mother_name')
                ->label('Nama Ibu'),
            ExportColumn::make('detail.phone_number')
                ->label('Nomor Telepon Orang Tua'),
            ExportColumn::make('detail.father_job')
                ->label('Pekerjaan Ayah'),
            ExportColumn::make('detail.mother_job')
                ->label('Pekerjaan Ibu'),
            ExportColumn::make('detail.parent_salary')
                ->label('Penghasilan Orang Tua'),
            ExportColumn::make('detail.address')
                ->label('Alamat Rumah'),
            ExportColumn::make('detail.school_origin')
                ->label('Asal Sekolah'),
            ExportColumn::make('detail.school_expense (RP)')
                ->label('Biaya Ongkos Sekolah'),
            ExportColumn::make('detail.distance')
                ->label('Jarak Rumah ke Sekolah (KM)'),
            ExportColumn::make('registration.registration_path')
                ->label('Pilihan Jalur')
                ->formatStateUsing(fn($state) => ucfirst($state)),
            ExportColumn::make('email_verified_at'),
            ExportColumn::make('created_at'),
            ExportColumn::make('updated_at'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your user export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
