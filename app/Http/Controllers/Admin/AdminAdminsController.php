<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminAdminsController extends Controller
{
    public function index()
    {
        $roles = Role::select('role_id', 'role_name')->where('role_name', '!=', 'super admin')->get();

        Log::info('Roles fetched successfully', [
            'roles' => $roles,
        ]);

        return Inertia::render('admin/Admins', [
            'roles' => $roles,
        ]);
    }
}
