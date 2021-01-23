<?php

namespace App\Http\Controllers;

use App\Models\Creative;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreativeController extends Controller
{
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            /** @var Creative $creative */
            $creative = Creative::findOrFail($id);
            $creative->delete();
        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        return response()->json(['message' => 'Creative was deleted'], 200);
    }
}
