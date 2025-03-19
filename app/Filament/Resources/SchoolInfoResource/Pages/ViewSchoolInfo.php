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
}
