<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Document extends Model
{
    protected $fillable = [
        'registration_id',
        'document_type',
        'file_path',
        'before_size',
        'after_size',
        'legacy_file_name',
        'elapsed_time'
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function verification(): HasOne
    {
        return $this->hasOne(Verification::class);
    }

}
