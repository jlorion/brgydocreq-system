<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAdminsController extends Controller
{

    public function fetchAdminInfo()
    {
        $admins = Admin::with(['barangayOfficer.address:address_id,purok', 'role'])
            ->whereHas('role', function ($query) {
                $query->where('role_name', '!=', 'super_admin');
            })
            ->get();

        $roles = Role::select('role_id', 'role_name')->where('role_name', '!=', 'super admin')->get();

        $flattenAdmins = $admins->map(function ($admin) {
            return [
                'admin_id' => $admin->admin_id,
                'admin_username' => $admin->admin_username,
                'admin_email' => $admin->admin_email,
                'admin_photopath' => $admin->admin_photopath,
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
            ];
        });


        return Inertia::render('admin/Admins', [
            'admins' => $flattenAdmins,
            'roles' => $roles
        ]);
    }

    public function updateAdminInfo(Request $request)
    {
        $validated = $request->validate([
            'admin_id' => 'required|exists:admins,admin_id',
            'admin_username' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'admin_photopath' => 'nullable|string|max:255',
            'admin_role' => 'required|string|max:255',
            'officer_firstname' => 'required|string|max:255',
            'officer_middlename' => 'required|string|max:255',
            'officer_lastname' => 'required|string|max:255',
            'officer_suffix' => 'nullable|string|max:255',
            'officer_birthdate' => 'required|date',
            'officer_precinct' => 'required|string|max:255',
            'officer_householdnum' => 'required|string|max:255',
            'officer_position' => 'required|required|string|max:255',
            'officer_gender' => 'required|string|max:20',
            'officer_purok' => 'required|string|max:255',
        ]);

        $admin = Admin::findOrFail($validated['admin_id']);

        $admin->update([
            'admin_username' => $validated['admin_username'],
            'admin_email' => $validated['admin_email'],
            'admin_photopath' => $validated['admin_photopath'],
            'admin_role' => $validated['admin_role'],
        ]);

        $admin->barangayOfficer->update([
            'officer_firstname' => $validated['officer_firstname'],
            'officer_middlename' => $validated['officer_middlename'],
            'officer_lastname' => $validated['officer_lastname'],
            'officer_suffix' => $validated['officer_suffix'],
            'officer_birthdate' => $validated['officer_birthdate'],
            'officer_precinct' => $validated['officer_precinct'],
            'officer_householdnum' => $validated['officer_householdnum'],
            'officer_position' => $validated['officer_position'],
            'officer_gender' => $validated['officer_gender'],
        ]);

        $admin->barangayOfficer->address->update([
            'purok' => $validated['officer_purok'],
        ]);

        $admin->role->update([
            'role_name' => $validated['admin_role']
        ]);


        return back()->with('success', "Administrator successfully updated");
    }
}
