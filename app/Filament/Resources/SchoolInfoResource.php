<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SchoolInfoResource\Pages;
use App\Filament\Resources\SchoolInfoResource\RelationManagers;
use App\Models\SchoolInfo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use ValentinMorice\FilamentJsonColumn\FilamentJsonColumn;

class SchoolInfoResource extends Resource
{
    protected static ?string $model = SchoolInfo::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationGroup = 'Data Sekolah';

    public static function getModelLabel(): string
    {
        return 'Info';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Info Sekolah';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('key')
                    ->label('Key')
                    ->required()
                    ->unique(ignoreRecord: true),

                FilamentJsonColumn::make('value')
                    ->label('Value')
                    ->columnSpanFull()
                    ->viewerOnly(fn($livewire) => $livewire instanceof Pages\ViewSchoolInfo)
                    ->accent('#00923f')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('Key')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('value')
                    ->label('Value')
                    ->limit(50)
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSchoolInfos::route('/'),
            'create' => Pages\CreateSchoolInfo::route('/create'),
            'view' => Pages\ViewSchoolInfo::route('/{record}'),
            'edit' => Pages\EditSchoolInfo::route('/{record}/edit'),
        ];
    }
}
