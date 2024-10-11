<?php

namespace App\Http\Controllers\restapi\admin;

use App\Http\Controllers\Controller;
use App\Models\Revenues;
use OpenApi\Annotations as OA;

class AdminRevenueApi extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/admin/revenues/list",
     *     summary="Get list of revenues",
     *     description="Get list of revenues",
     *     tags={"Revenue"},
     *     @OA\Response(
     *         response=200,
     *         description="successful operation"
     *     )
     * )
     */
    public function list()
    {
        $revenues = Revenues::all();
        $data = returnMessage(1, $revenues, 'Success');
        return response($data, 200);
    }
}
