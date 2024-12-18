<?php

namespace App\Http\Controllers\restapi;

use App\Enums\ContactStatus;
use App\Http\Controllers\Api;
use App\Models\Contacts;
use Illuminate\Http\Request;

class ContactApi extends Api
{
    public function create(Request $request)
    {
        try {
            $first_name = $request->input('first_name');
            $last_name = $request->input('last_name');
            $email = $request->input('email');
            $subject = $request->input('subject');
            $message = $request->input('message');

            $contact = new Contacts();

            $contact->first_name = $first_name;
            $contact->last_name = $last_name;
            $contact->email = $email;
            $contact->subject = $subject;
            $contact->message = $message;
            $contact->status = ContactStatus::PENDING;
            $contact->save();

            $data = returnMessage(1, $contact, 'Success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }
}
