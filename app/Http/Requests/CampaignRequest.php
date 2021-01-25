<?php

namespace App\Http\Requests;

use App\Models\Campaign;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class CampaignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $mimes = Config::get('app.allowed_mimes');
        $maxFileSize = Config::get('app.max_file_size');

        return [
            Campaign::FIELD_NAME => 'required|max:255',
            Campaign::FIELD_DATE_FROM => 'required|date',
            Campaign::FIELD_DATE_TO => 'required|date',
            Campaign::FIELD_TOTAL_BUDGET => 'required|numeric|min:0',
            Campaign::FIELD_DAILY_BUDGET => 'required|numeric|min:0',
            'creatives.*' => "image|mimes:$mimes|max:$maxFileSize"
        ];
    }
}
