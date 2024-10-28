<?php

namespace App\Http\Controllers\restapi\admin;

use App\Enums\RoleName;
use App\Enums\UserStatus;
use App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MainController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminUserApi extends Api
{
    /**
     * @OA\Get(
     *     path="/api/admin/users/list",
     *     summary="Get all users",
     *     description="Get all users",
     *     tags={"Admin User"},
     *     @OA\Parameter(
     *         description="Page number",
     *         in="query",
     *         name="page",
     *         required=false,
     *         example=1,
     *         @OA\Schema(
     *             type="integer",
     *             format="int32"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="status",
     *                 type="integer",
     *                 example=1
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Get users success!"
     *             ),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(
     *                         property="id",
     *                         type="integer",
     *                         example=1
     *                     ),
     *                     @OA\Property(
     *                         property="email",
     *                         type="string",
     *                         example="user@example.com"
     *                     ),
     *                     @OA\Property(
     *                         property="full_name",
     *                         type="string",
     *                         example="John Doe"
     *                     ),
     *                     @OA\Property(
     *                         property="phone",
     *                         type="string",
     *                         example="123 456 7890"
     *                     ),
     *                     @OA\Property(
     *                         property="avatar",
     *                         type="string",
     *                         example="http://example.com/avatar.jpg"
     *                     ),
     *                     @OA\Property(
     *                         property="total_balance",
     *                         type="integer",
     *                         example=10000
     *                     ),
     *                     @OA\Property(
     *                         property="status",
     *                         type="integer",
     *                         example=1
     *                     ),
     *                     @OA\Property(
     *                         property="role_name",
     *                         type="string",
     *                         example="Admin"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function list(Request $request)
    {
        $users = User::where('users.status', '!=', UserStatus::DELETED)
            ->join('role_users', 'users.id', '=', 'role_users.user_id')
            ->join('roles', 'role_users.role_id', '=', 'roles.id')
            ->where('roles.name', '!=', RoleName::ADMIN)
            ->orderByDesc('users.id')
            ->select('users.*', 'roles.name as role_name')
            ->get();

        $data = returnMessage(1, $users, 'Get users success!');
        return response($data, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/users/detail/{id}",
     *     summary="Get user detail by id",
     *     description="Get user detail by id",
     *     operationId="getUserDetailById",
     *     tags={"Admin User"},
     *     @OA\Parameter(
     *         description="ID of user",
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
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */
    public function detail($id)
    {
        $user = User::where('users.status', '!=', UserStatus::DELETED)->where('id', $id)->first();
        if (!$user) {
            return returnMessage(0, '', 'User not found!');
        }
        $data = returnMessage(1, $user, 'Get user success!');
        return response($data, 200);
    }


    /**
     * Create a user.
     *
     * @OA\Post(
     *     path="/api/admin/users/create",
     *     summary="Create a user",
     *     description="Create a user",
     *     tags={"Admin User"},
     *     @OA\RequestBody(
     *         description="User info to be created",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="full_name", type="string", example="Nguy n V n A"),
     *             @OA\Property(property="email", type="string", format="email", example="nguyenvana@gmail.com"),
     *             @OA\Property(property="phone", type="string", example="0123456789"),
     *             @OA\Property(property="password", type="string", format="password", example="123456"),
     *             @OA\Property(property="password_confirm", type="string", format="password", example="123456"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Create success",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *     ),
     * )
     */
    public function create(Request $request)
    {
        try {
            $user = new User();

            $email = $request->input('email');
            $phone = $request->input('phone');
            $password = $request->input('password');
            $password_confirm = $request->input('password_confirm');

            $is_valid = User::checkEmail($email);
            if (!$is_valid) {
                $data = returnMessage(-1, 'Error', 'Email has been used!');
                return response($data, 400);
            }

            $is_valid = User::checkPhone($phone);
            if (!$is_valid) {
                $data = returnMessage(-1, 'Error', 'Phone has been used!');
                return response($data, 400);
            }

            if ($password != $password_confirm) {
                $data = returnMessage(-1, 400, 'Error', 'Passwords do not match!');
                return response($data, 400);
            }

            if (strlen($password) < 5) {
                $data = returnMessage(-1, 'Error', 'Password must be at least 5 characters!');
                return response($data, 400);
            }

            $user = $this->save($user, $request);
            $user->save();

            (new MainController())->saveRoleUser($user->id);

            $data = returnMessage(1, $user, 'Create success');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    /**
     * Update a user.
     *
     * @OA\Post(
     *     path="/api/admin/users/update/{id}",
     *     summary="Update a user",
     *     description="Update a user",
     *     tags={"Admin User"},
     *     @OA\Parameter(
     *         description="ID of user",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         description="User info to be updated",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="full_name", type="string", example="Nguy n V n A"),
     *             @OA\Property(property="email", type="string", format="email", example="nguyenvana@gmail.com"),
     *             @OA\Property(property="phone", type="string", example="0123456789"),
     *             @OA\Property(property="password", type="string", format="password", example="123456"),
     *             @OA\Property(property="password_confirm", type="string", format="password", example="123456"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Update success",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *     ),
     * )
     */
    public function update($id, Request $request)
    {
        try {
            $user = User::where('users.status', '!=', UserStatus::DELETED)->where('id', $id)->first();
            if (!$user) {
                return returnMessage(-1, 400, null, 'User not found!');
            }

            $email = $request->input('email');
            $phone = $request->input('phone');
            $password = $request->input('password');
            $password_confirm = $request->input('password_confirm');

            if ($user->email != $email) {
                $is_valid = User::checkEmail($email);
                if (!$is_valid) {
                    $data = returnMessage(-1, 'Error', 'Email has been used!');
                    return response($data, 400);
                }
            }

            if ($user->phone != $phone) {
                $is_valid = User::checkPhone($phone);
                if (!$is_valid) {
                    $data = returnMessage(-1, 'Error', 'Phone has been used!');
                    return response($data, 400);
                }
            }

            if ($password || $password_confirm) {
                if ($password != $password_confirm) {
                    $data = returnMessage(-1, 'Error', 'Passwords do not match!');
                    return response($data, 400);
                }

                if (strlen($password) < 5) {
                    $data = returnMessage(-1, 'Error', 'Password must be at least 5 characters!');
                    return response($data, 400);
                }
            }

            $user = $this->save($user, $request);
            $user->save();

            $data = returnMessage(1, $user, 'Update success!');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    /**
     * Delete a user by ID.
     *
     * @OA\Delete(
     *     path="/api/admin/users/delete/{id}",
     *     summary="Delete a user by ID",
     *     description="Delete a user by ID",
     *     tags={"Admin User"},
     *     @OA\Parameter(
     *         description="ID of user",
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
     *         description="User deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */
    public function delete($id)
    {
        try {
            $user = User::where('users.status', '!=', UserStatus::DELETED)->where('id', $id)->first();
            if (!$user) {
                return returnMessage(-1, null, 'User not found!');
            }

            $user->status = UserStatus::DELETED;
            $user->save();

            $data = returnMessage(1, $user, 'Delete success!');
            return response($data, 200);
        } catch (\Exception $exception) {
            $data = returnMessage(-1, '', $exception->getMessage());
            return response($data, 400);
        }
    }

    /**
     * Save user data.
     *
     * @param User $user
     * @param Request $request
     * @return User
     */
    private function save(User $user, Request $request)
    {
        $user->full_name = $request->input('full_name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->address = $request->input('address');
        $user->about = $request->input('about');

        if ($request->input('password')) {
            $password = $request->input('password');
            $passwordHash = Hash::make($password);
            $user->password = $passwordHash;
        }
        $user->status = $request->input('status') ?? UserStatus::INACTIVE;

        $thumbnail = $user->avt;
        if ($request->hasFile('avatar')) {
            $item = $request->file('avatar');
            $itemPath = $item->store('avatars', 'public');
            $thumbnail = asset('storage/' . $itemPath);
        }
        $user->avt = $thumbnail;

        return $user;
    }
}
