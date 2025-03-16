<?php

namespace App\Filament\Resources\StudentResource\Pages;

use App\Filament\Exports\UserExporter;
use App\Filament\Resources\StudentResource;
use Filament\Actions;
use Filament\Actions\ExportAction;
use Filament\Actions\Exports\Enums\ExportFormat;
use Filament\Resources\Pages\ListRecords;

class ListStudents extends ListRecords
{
    protected static string $resource = StudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\ActionGroup::make([
                Actions\CreateAction::make(),
                ExportAction::make()
                    ->exporter(UserExporter::class)
                    ->formats([
                        ExportFormat::Xlsx,
                    ])
                    ->fileDisk('export')

            ])
        ];
    }
}
