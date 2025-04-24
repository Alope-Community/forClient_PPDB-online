<?php

namespace App\Filament\Resources\SchoolInfoResource\Pages;

use App\Filament\Resources\SchoolInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewSchoolInfo extends ViewRecord
{
    protected static string $resource = SchoolInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if ($this->record->type === 'picture') {
            $json = json_decode($this->record->value, true);
            $data['image'] = $json['image'] ?? null;
        } else {
            $data['image'] = null;
        }
        return $data;
    }
}
