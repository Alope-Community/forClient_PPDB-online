<?php

namespace App\Filament\Resources\SchoolInfoResource\Pages;

use App\Filament\Resources\SchoolInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateSchoolInfo extends CreateRecord
{
    protected static string $resource = SchoolInfoResource::class;

    protected function afterSave(): void
    {
        $record = $this->record;

        if ($record->type === 'picture') {
            $imagePath = $this->data['image'] ?? null;

            if ($imagePath) {
                $record->update([
                    'value' => $imagePath,
                ]);
            }
        }
    }
}
