<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    /** @use HasFactory<\Database\Factories\MunicipalityFactory> */
    use HasFactory, HasUuids;

    public function barangays()
    {
        return $this->hasMany(Barangay::class);
    }
}
