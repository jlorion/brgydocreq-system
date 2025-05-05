<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BarangayOfficer;
use App\Models\DocumentArchive;
use App\Models\RequestedDocument;
use App\Models\Resident;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function show()
    {

        $totalUsers = User::latest()->get()->count();
        $totalRequests = RequestedDocument::latest()->get()->count();
        $totalArchives = DocumentArchive::latest()->get()->count();

        $totalResidents = Resident::latest()->get();
        $totalBarangayOfficers = BarangayOfficer::latest()->get()->count();



        return  Inertia::render('admin/Dashboard', []);
    }
}
