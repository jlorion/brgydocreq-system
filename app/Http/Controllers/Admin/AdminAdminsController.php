<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Admin;
use App\Models\Role;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAdminsController extends Controller
{

    public function fetchAdminInfo()
    {
        $admins = Admin::with(['barangayOfficer.address:address_id,purok', 'role:role_id,role_name'])->get();
        $roles = Role::select('role_id', 'role_name')->get();
        $puroks = Address::get(['address_id', 'purok']);
        $status = Status::select('status_id', 'status_name')
            ->whereIn('status_name', ['Active', 'Inactive', 'Revoke', 'Suspend'])
            ->get();

        $flattenAdmins = $admins->map(function ($admin) {
            return [
                'admin_id' => $admin->admin_id,
                'admin_username' => $admin->admin_username,
                'admin_email' => $admin->email,
                'admin_photopath' => $admin->admin_photopath,
                'admin_status' => $admin->status_id,
                'admin_phonenum' => $admin->admin_phonenum,
                'admin_roleid' => $admin->role->role_id,
                'admin_role' => $admin->role->role_name,
                'officer_firstname' => $admin->barangayOfficer->officer_firstname,
                'officer_middlename' => $admin->barangayOfficer->officer_middlename,
                'officer_lastname' => $admin->barangayOfficer->officer_lastname,
                'officer_suffix' => $admin->barangayOfficer->officer_suffix,
                'officer_birthdate' => $admin->barangayOfficer->officer_birthdate,
                'officer_precinct' => $admin->barangayOfficer->officer_precinct,
                'officer_householdnum' => $admin->barangayOfficer->officer_householdnum,
                'officer_position' => $admin->barangayOfficer->officer_position,
                'officer_gender' => $admin->barangayOfficer->officer_gender,
                'officer_purok' => $admin->barangayOfficer->address->purok,
                'officer_purokid' => $admin->barangayOfficer->address->address_id,
            ];
        });


        // dd($roles);


        return Inertia::render('admin/Admins', [
            'admins' => $flattenAdmins,
            'roles' => $roles,
            'puroks' => $puroks,
            'status' => $status
        ]);
    }

    public function updateAdminInfo(Request $request)
    {
        $validate = $request->validate([
            'admin_id' => 'required|exists:admins,admin_id',
            'admin_username' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'admin_phonenum' => 'required|string|max:100',
            'admin_roleid' => 'required|exists:roles,role_id',
            'officer_firstname' => 'required|string|max:255',
            'officer_middlename' => 'required|string|max:255',
            'officer_lastname' => 'required|string|max:255',
            'officer_suffix' => 'nullable|string|max:255',
            'officer_birthdate' => 'required|date',
            'officer_precinct' => 'required|string|max:255',
            'officer_householdnum' => 'required|string|max:255',
            'officer_position' => 'required|required|string|max:255',
            'officer_gender' => 'required|string|max:20',
            'officer_purokid' => 'required|exists:addresses,address_id',
        ]);

        $admin = Admin::findOrFail($validate['admin_id']);

        $admin->update([
            'admin_username' => $validate['admin_username'],
            'admin_email' => $validate['admin_email'],
            'admin_phonenum' => $validate['admin_phonenum'],
            'role_id' => $validate['admin_roleid'],
        ]);

        $admin->barangayOfficer->update([
            'officer_firstname' => $validate['officer_firstname'],
            'officer_middlename' => $validate['officer_middlename'],
            'officer_lastname' => $validate['officer_lastname'],
            'officer_suffix' => $validate['officer_suffix'],
            'officer_birthdate' => $validate['officer_birthdate'],
            'officer_precinct' => $validate['officer_precinct'],
            'officer_householdnum' => $validate['officer_householdnum'],
            'officer_position' => $validate['officer_position'],
            'officer_gender' => $validate['officer_gender'],
            'address_id' => $validate['officer_purokid'],
        ]);
    }
}
