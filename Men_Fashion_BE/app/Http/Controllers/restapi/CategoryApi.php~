<?php

namespace App\Http\Controllers\restapi;

use App\Enums\CategoryStatus;
use App\Http\Controllers\Api;
use App\Models\Categories;

class CategoryApi extends Api
{
    public function list()
    {

        $categories = Categories::where('status', CategoryStatus::ACTIVE)
            ->where('parent_id', null)
            ->orderByDesc('id')
            ->get();


        $data = returnMessage(1, $categories, 'Success!');
        return response()->json($data, 200);
    }
}
