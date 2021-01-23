<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Creative extends Model
{
    use HasFactory;

    const FIELD_NAME = 'name';
    const FIELD_CAMPAIGN_ID = 'campaign_id';

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }
}
