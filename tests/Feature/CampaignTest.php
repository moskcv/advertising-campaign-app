<?php

namespace Tests\Feature;

use App\Models\Campaign;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    const BASE_URL = '/api/campaigns';
    const VALID_DATA = [
        Campaign::FIELD_NAME => 'Test name',
        Campaign::FIELD_DATE_FROM => '2021-12-25',
        Campaign::FIELD_DATE_TO => '2021-12-25',
        Campaign::FIELD_TOTAL_BUDGET => '5000',
        Campaign::FIELD_DAILY_BUDGET => '50',
    ];

    const INVALID_DATA = [
        Campaign::FIELD_NAME => '',
        Campaign::FIELD_DATE_FROM => 'qwerty',
        Campaign::FIELD_DATE_TO => '2021-12-25',
        Campaign::FIELD_TOTAL_BUDGET => 'qwerty',
        Campaign::FIELD_DAILY_BUDGET => '25.12',
    ];

    public function test_wrong_page()
    {
        $response = $this->get('/api/qwerty');

        $response->assertStatus(404);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_index()
    {
        $response = $this->json('GET', self::BASE_URL);

        $response->assertStatus(200);
    }

    public function test_store_validation_valid_data()
    {
        $response = $this->json('POST', self::BASE_URL, self::VALID_DATA);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'data'
        ]);
    }

    public function test_store_validation_invalid_data()
    {
        $response = $this->json('POST', self::BASE_URL, self::INVALID_DATA);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            Campaign::FIELD_NAME,
            Campaign::FIELD_DATE_FROM,
            Campaign::FIELD_TOTAL_BUDGET,
        ]);
    }

    public function test_store_validation_valid_file()
    {
        $maxFileSize = Config::get('app.max_file_size');
        $allowedFileMimes = Config::get('app.allowed_mime_types');
        $mimeType = explode(",", $allowedFileMimes)[0];
        $file = UploadedFile::fake()->image(sprintf('test.%s', $mimeType))->size($maxFileSize - 10);
        $data = self::VALID_DATA;
        $data['creatives'][] = $file;

        $response = $this->json('POST', self::BASE_URL, $data);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'data'
        ]);
    }

    public function test_store_validation_invalid_file_size()
    {
        $maxFileSize = Config::get('app.max_file_size');
        $allowedFileMimes = Config::get('app.allowed_mime_types');
        $mimeType = explode(",", $allowedFileMimes)[0];

        $file = UploadedFile::fake()->image(sprintf('test.%s', $mimeType))->size($maxFileSize + 1000);
        $data = self::VALID_DATA;
        $data['creatives'][] = $file;

        $response = $this->json('POST', self::BASE_URL, $data);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'creatives.0'
        ]);
    }

    public function test_store_validation_invalid_file_format()
    {
        $maxFileSize = Config::get('app.max_file_size');
        $file = UploadedFile::fake()->image('test.exe')->size($maxFileSize + 1000);
        $data = self::VALID_DATA;
        $data['creatives'][] = $file;

        $response = $this->json('POST', self::BASE_URL, $data);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'creatives.0'
        ]);
    }
}
