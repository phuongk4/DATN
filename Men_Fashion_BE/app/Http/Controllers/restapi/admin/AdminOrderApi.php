<?php

namespace App\Http\Controllers\restapi\admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Revenues;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminOrderApi extends Api
{
    /**
     * @OA\Get(
     *     path="/api/admin/orders/list",
     *     summary="Get list of orders",
     *     description="Get list of orders",
     *     tags={"Admin Order"},
     *     @OA\Parameter(
     *         description="Order status",
     *         in="query",
     *         name="status",
     *         required=false,
     *         example="processing",
     *         @OA\Schema(
     *             type="string",
     *             enum={"processing", "shipping", "delivered", "canceled", "deleted"}
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="User id",
     *         in="query",
     *         name="user_id",
     *         required=false,
     *         example=1,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="successful operation"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized user"
     *     )
     * )
     */
    public function list(Request $request)
    {
        $status = $request->input('status');
        $user_id = $request->input('user_id');

        if ($status) {
            $orders = Orders::where('status', $status);
        } else {
            $orders = Orders::where('status', '!=', OrderStatus::DELETED);
        }

        if ($user_id) {
            $orders = $orders->where('user_id', $user_id);
        }

        $orders = $orders->cursor()
            ->map(function ($item) {
                $order = $item->toArray();
                $order['order_items'] = $item->order_items;
                return $order;
            });

        $data = returnMessage(1, $orders, 'Success');
        return response($data, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/orders/detail/{id}",
     *     summary="Get detail of an order",
     *     description="Get detail of an order",
     *     tags={"Order"},
     *     @OA\Parameter(
     *         description="Order ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="successful operation"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized user"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order not found"
     *     )
     * )
     */
    public function detail($id)
    {
        $order = Orders::find($id);
        if (!$order || $order->status == OrderStatus::DELETED) {
            $data = returnMessage(0, null, 'Order not found');
            return response($data, 404);
        }
        $order_convert = $order->toArray();
        $order_convert['order_items'] = $order->order_items;
        $data = returnMessage(1, $order_convert, 'Success');
        return response($data, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/admin/orders/update/{id}",
     *     summary="Update order status",
     *     description="Update order status",
     *     tags={"Admin Order"},
     *     @OA\Parameter(
     *         description="Order ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Order status",
     *         in="query",
     *         name="status",
     *         required=true,
     *         example="canceled",
     *         @OA\Schema(
     *             type="string",
     *             enum={"canceled", "completed"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="successful operation"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid request"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order not found"
     *     )
     * )
     */
    public function update($id, Request $request)
    {
        try {
            $status = $request->input('status');
            $order = Orders::find($id);
            if (!$order || $order->status == OrderStatus::DELETED) {
                $data = returnMessage(0, null, 'Order not found');
                return response($data, 404);
            }

            if ($order->status == OrderStatus::CANCELED) {
                $data = returnMessage(0, null, 'Order already canceled');
                return response($data, 400);
            }

            if ($status == OrderStatus::COMPLETED) {
                $data = returnMessage(0, null, 'Order already completed');
                return response($data, 400);
            }

            $order->status = $status ?? OrderStatus::CANCELED;
            $order->save();
            if ($status == OrderStatus::CANCELED) {
                $order->order_items->each(function ($item) {
                    $item->product->update([
                        'quantity' => $item->product->quantity + $item->quantity
                    ]);
                });
            }

            if ($status == OrderStatus::COMPLETED) {
                $revenue = new Revenues();
                $revenue->total = $order->total_price;
                $revenue->order_id = $order->id;
                $revenue->save();
            }
            $data = returnMessage(1, $order, 'Update order success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }
}
