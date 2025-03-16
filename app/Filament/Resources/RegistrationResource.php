<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RegistrationResource\Pages;
use App\Filament\Resources\RegistrationResource\RelationManagers;
use App\Models\Registration;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RegistrationResource extends Resource
{
    protected static ?string $model = Registration::class;

    protected static ?string $navigationIcon = 'heroicon-o-pencil';

    public static function getModelLabel(): string
    {
        return 'Status';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Status Registrasi';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Nama Siswa')
                    ->required()
                    ->relationship('user', 'name', function ($query) {
                        $query->whereHas('roles', function ($roleQuery) {
                            $roleQuery->where('name', 'student');
                        });
                    }),
                Forms\Components\Select::make('registration_path')
                    ->label('Jalur Pendaftaran')
                    ->options([
                        'reguler' => 'Reguler',
                        'afirmasi' => 'Afirmasi',
                    ]),
                Forms\Components\ToggleButtons::make('status')
                    ->label('Status')
                    ->inline()
                    ->default('menunggu')
                    ->options([
                        'menunggu' => 'Menunggu',
                        'diterima' => 'Diterima',
                        'ditolak' => 'Ditolak',
                    ])
                    ->icons([
                        'menunggu' => 'heroicon-o-clock',
                        'diterima' => 'heroicon-o-check-circle',
                        'ditolak' => 'heroicon-o-x-circle',
                    ])
                    ->colors([
                        'menunggu' => 'warning',
                        'diterima' => 'success',
                        'ditolak' => 'danger',
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable()
                    ->label('Nama Siswa'),
                Tables\Columns\TextColumn::make('registration_path')
                    ->label('Jalur Pendaftaran')
                    ->sortable()
                    ->badge()
                    ->colors([
                        'success' => 'afirmasi',
                        'info' => 'reguler',
                    ]),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->badge()
                    ->colors([
                        'warning' => 'menunggu',
                        'success' => 'diterima',
                        'danger' => 'ditolak',
                    ]),
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
            'index' => Pages\ListRegistrations::route('/'),
            'create' => Pages\CreateRegistration::route('/create'),
            'view' => Pages\ViewRegistration::route('/{record}'),
            'edit' => Pages\EditRegistration::route('/{record}/edit'),
        ];
    }
}
