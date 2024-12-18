<?php

namespace App\Http\Controllers\restapi\admin;

use App\Enums\ContactStatus;
use App\Http\Controllers\Api;
use App\Models\Contacts;
use Illuminate\Http\Request;

class AdminContactApi extends Api
{
    public function list()
    {
        try {
            $contacts = Contacts::where('status', '!=', ContactStatus::DELETED)
                ->orderByDesc('id')
                ->get();

            $data = returnMessage(1, $contacts, 'Success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    public function detail($id)
    {
        try {
            $contact = Contacts::find($id);

            if (!$contact) {
                $data = returnMessage(-1, '', 'Không tìm thấy liên hệ!');
                return response($data, 404);
            }

            $data = returnMessage(1, $contact, 'Success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $contact = Contacts::find($id);

            if (!$contact) {
                $data = returnMessage(-1, '', 'Không tìm thấy liên hệ!');
                return response($data, 404);
            }

            $status = $request->input('status') ?? ContactStatus::REJECTED;
            $contact->status = $status;
            $contact->save();

            $data = returnMessage(1, $contact, 'Success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    public function delete($id)
    {
        try {
            $contact = Contacts::find($id);

            if (!$contact) {
                $data = returnMessage(-1, '', 'Không tìm thấy liên hệ!');
                return response($data, 404);
            }

            $contact->status = ContactStatus::DELETED;

            $contact->save();

            $data = returnMessage(1, $contact, 'Success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }
}
