<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model
{
    use HasFactory;

    protected $table = 'campaigns';

    const FIELD_NAME = 'name';
    const FIELD_DATE_FROM = 'date_from';
    const FIELD_DATE_TO = 'date_to';
    const FIELD_TOTAL_BUDGET = 'total_budget';
    const FIELD_DAILY_BUDGET = 'daily_budget';

    protected $fillable = [
        self::FIELD_NAME,
        self::FIELD_DATE_FROM,
        self::FIELD_DATE_TO,
        self::FIELD_TOTAL_BUDGET,
        self::FIELD_DAILY_BUDGET
    ];

    public function creatives(): HasMany
    {
        return $this->hasMany(Creative::class);
    }

    public function getCreatedAtAttribute(string $date): string
    {
        return Carbon::parse($date)->format('Y-m-d');
    }

    public function getUpdatedAtAttribute(string $date): string
    {
        return Carbon::parse($date)->format('Y-m-d');
    }
}
