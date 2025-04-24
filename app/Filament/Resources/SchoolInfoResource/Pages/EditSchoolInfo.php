<?php

namespace App\Filament\Resources\SchoolInfoResource\Pages;

use App\Filament\Resources\SchoolInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSchoolInfo extends EditRecord
{
    protected static string $resource = SchoolInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {

        if ($this->record->type === 'picture') {
            $data['image'] = $this->record->value;
        } else {
            $data['image'] = null;
        }

        return $data;
    }

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
