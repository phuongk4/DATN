<?php

namespace App\Http\Controllers\restapi;

use App\Enums\OrderStatus;
use App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Attributes;
use App\Models\OrderItems;
use App\Models\Orders;
use App\Models\Products;
use App\Models\Properties;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderApi extends Api
{
    /**
     * @OA\Get(
     *     path="/api/orders/list",
     *     summary="Get list of orders",
     *     description="Get list of orders",
     *     tags={"Order"},
     *     @OA\Parameter(
     *         description="Order status",
     *         in="query",
     *         name="status",
     *         required=false,
     *         example="processing",
     *         @OA\Schema(
     *           type="string",
     *           enum={"processing", "shipping", "delivered", "canceled", "deleted"}
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
        $user = JWTAuth::parseToken()->authenticate();
        $user = $user->toArray();

        $status = $request->input('status');

        if ($status) {
            $orders = Orders::where('status', $status);
        } else {
            $orders = Orders::where('status', '!=', OrderStatus::DELETED);
        }

        $orders = $orders->where('user_id', $user['id'])
            ->cursor()
            ->map(function ($item) {
                $order = $item->toArray();
                $order_items = OrderItems::where('order_id', $item->id)->get();
                $order['order_items'] = $order_items->toArray();
                return $order;
            });

        $data = returnMessage(1, $orders, 'Success');
        return response($data, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/orders/detail/{id}",
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
        $user = JWTAuth::parseToken()->authenticate();
        $user = $user->toArray();

        $order = Orders::find($id);
        if (!$order || $order->status == OrderStatus::DELETED || $order->user_id != $user['id']) {
            $data = returnMessage(0, null, 'Order not found');
            return response($data, 404);
        }
        $order_convert = $order->toArray();
        $order_convert['order_items'] = $order->order_items;
        $data = returnMessage(1, $order_convert, 'Success');
        return response($data, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/orders/cancel/{id}",
     *     summary="Cancel an order",
     *     description="Cancel an order",
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
    public function cancel($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $user = $user->toArray();

            $order = Orders::find($id);
            if (!$order || $order->status == OrderStatus::DELETED || $order->user_id != $user['id']) {
                $data = returnMessage(0, null, 'Order not found');
                return response($data, 404);
            }

            $order->status = OrderStatus::CANCELED;
            $order->save();

            $order_items = OrderItems::where('order_id', $order->id)->get();

            $order_items->each(function ($item) {
                $product = Products::find($item->product_id);
                $qty = $item->product->quantity + $item->quantity;
                $product->quantity = $qty;
                $product->save();
            });

            $data = returnMessage(1, $order, 'Cancel success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }
}
