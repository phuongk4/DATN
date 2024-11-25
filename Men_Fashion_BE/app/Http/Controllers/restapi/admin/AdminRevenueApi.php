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

    /**
     * @OA\Get(
     *     path="/api/admin/revenues/charts",
     *     summary="Get chart statistics of revenues",
     *     description="Get chart statistics of revenues",
     *     tags={"Revenue"},
     *     @OA\Response(
     *         response=200,
     *         description="successful operation"
     *     )
     * )
     */
    public function charts()
    {
        $vMonths = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

        $xData = [];
        $yData = [];

        for ($i = 11; $i >= 0; $i--) {
            $monthIndex = now()->subMonths($i)->format('n') - 1;
            $xData[] = $vMonths[$monthIndex];
            $yData[] = 0;
        }

        $revenues = Revenues::whereBetween('created_at', [
            now()->subMonths(11)->startOfMonth(),
            now()->endOfMonth()
        ])->get();

        $total = 0;

        foreach ($revenues as $revenue) {
            $monthIndex = now()->diffInMonths($revenue->created_at->startOfMonth());
            if ($monthIndex < 12) {
                $yData[11 - $monthIndex] += $revenue->total;
            }

            $total += $revenue->total;
        }

        $res = ['x_data' => $xData, 'y_data' => $yData, 'total' => $total];
        $data = returnMessage(1, $res, 'Success');
        return response($data, 200);
    }
}
