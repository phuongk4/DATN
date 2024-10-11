<?php

namespace App\Http\Controllers;

use App\Enums\AttributeStatus;
use App\Models\Attributes;
use Illuminate\Http\Request;

class AdminTest extends Controller
{
    public function list(Request $request)
    {
        $attributes = Attributes::where('status', '!=', AttributeStatus::DELETED)
            ->orderBy('id', 'desc')
            ->get();
        $data = returnMessage(1, $attributes, 'Success!');
        return response()->json($data, 200);
    }

    public function detail($id)
    {
        $attribute = Attributes::where('id', $id)
            ->where('status', '!=', AttributeStatus::DELETED)
            ->first();
        if ($attribute == null) {
            $data = returnMessage(-1, null, 'Attribute not found!');
            return response()->json($data, 404);
        }
        $data = returnMessage(1, $attribute, 'Success!');
        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        try {
            $attribute = new Attributes();
            $attribute->name = $request->name;
            $attribute->status = $request->status;
            $success = $attribute->save();
            if ($success) {
                $data = returnMessage(1, $attribute, 'Success, Create success!');
                return response()->json($data, 200);
            }

            $data = returnMessage(-1, null, 'Error, Create error!');
            return response()->json($data, 400);
        } catch (\Exception $e) {
            $data = returnMessage(-1, null, $e->getMessage());
            return response()->json($data, 400);
        }
    }

    public function update($id, Request $request)
    {
        try {
            $attribute = Attributes::where('id', $id)
                ->where('status', '!=', AttributeStatus::DELETED)
                ->first();
            $attribute->name = $request->name;
            $attribute->status = $request->status;
            $success = $attribute->save();
            if ($success) {
                $data = returnMessage(1, $attribute, 'Success, Update success!');
                return response()->json($data, 200);
            }

            $data = returnMessage(-1, null, 'Error, Update error!');
            return response()->json($data, 400);
        } catch (\Exception $e) {
            $data = returnMessage(-1, null, $e->getMessage());
            return response()->json($data, 400);
        }
    }

    public function delete($id)
    {
        try {
            $attribute = Attributes::where('id', $id)
                ->where('status', '!=', AttributeStatus::DELETED)
                ->first();
            $attribute->status = AttributeStatus::DELETED;
            $success = $attribute->save();
            if ($success) {
                $data = returnMessage(1, $attribute, 'Success, Delete success!');
                return response()->json($data, 200);
            }

            $data = returnMessage(-1, null, 'Error, Delete error!');
            return response()->json($data, 400);
        } catch (\Exception $e) {
            $data = returnMessage(-1, null, $e->getMessage());
            return response()->json($data, 400);
        }
    }
}
