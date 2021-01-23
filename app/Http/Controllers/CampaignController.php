<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignRequest;
use App\Models\Campaign;
use App\Models\Creative;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class CampaignController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => Campaign::with('creatives')->get()->toArray()
        ]);
    }

    public function store(CampaignRequest $request): JsonResponse
    {
        $postData = $request->validated();

        $campaign = new Campaign();
        if ($campaign->fill($postData)->save()) {
            if ($request->hasFile('creatives')) {
                $creatives = [];
                /** @var UploadedFile $file */
                foreach ($request->file('creatives') as $file) {
                    $name = sprintf('%s_%s', time(), $file->getClientOriginalName());

                    try {
                        $file->move(public_path('uploads'), $name);
                        $creatives[] = [
                            Creative::FIELD_CAMPAIGN_ID => $campaign->id,
                            Creative::FIELD_NAME => $name
                        ];
                    } catch (FileException $e) {
                        return response()->json(
                            [
                                'message' => sprintf(
                                    'Campaign was created. Something went wrong while uploading: %s',
                                    $e->getMessage()
                                )
                            ], 500);
                    }
                }

                Creative::insert($creatives);
            }

            return response()->json([
                'message' => 'Campaign was created',
                'data' => $campaign->id,
            ]);
        }


        return response()->json([
            'message' => 'Something went wrong',
        ], 500);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        try {
            /** @var Campaign $campaign */
            $campaign = Campaign::with('creatives')->findOrFail($id);
        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        return response()->json(['data' => $campaign->toArray()]);
    }

    public function update(CampaignRequest $request, int $id): JsonResponse
    {
        $postData = $request->validated();

        try {
            /** @var Campaign $campaign */
            $campaign = Campaign::findOrFail($id);
            $campaign->fill($postData);
            $campaign->update();
        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        return response()->json([
            'message' => 'Campaign was updated',
            'data' => $campaign->toArray()
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            /** @var Campaign $campaign */
            $campaign = Campaign::findOrFail($id);
            $campaign->delete();
        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        return response()->json(['message' => 'Campaign was deleted'], 200);
    }
}
