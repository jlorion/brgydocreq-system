<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\BarangayOfficer;
use App\Models\Document;
use App\Models\DocumentArchive;
use App\Models\RequestedDocument;
use App\Models\Resident;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function show()
    {
        $requestAndRevenue = RequestedDocument::selectRaw("
        DATE_FORMAT(requested_documents.created_at, '%M') as month,
        COUNT(*) as total,
        SUM(documents.price) as total_revenue
    ")
            ->join('documents', 'requested_documents.document_id', '=', 'documents.document_id')
            ->groupBy("month")
            ->orderBy("month")
            ->get();

        $totalRevenue = $requestAndRevenue->sum('total_revenue');
        $totalRequest = $requestAndRevenue->sum('total');


        $residentStats = Resident::selectRaw("
        DATE_FORMAT(created_at, '%M %Y') as month,
        COUNT(*) as total,
        MAX(updated_at) as last_updated
    ")
            ->groupByRaw("DATE_FORMAT(created_at, '%M %Y')")
            ->orderByRaw("STR_TO_DATE(DATE_FORMAT(created_at, '%M %Y'), '%M %Y')")
            ->first();

        $totalResidents = $residentStats->total;



        $adminStats = Admin::selectRaw("
        DATE_FORMAT(created_at, '%M %Y') as month,
        COUNT(*) as total,
        MAX(updated_at) as last_updated,
        SUM(CASE WHEN status_id = 3 THEN 1 ELSE 0 END) as active
    ")
            ->groupByRaw("DATE_FORMAT(created_at, '%M %Y')")
            ->orderByRaw("STR_TO_DATE(DATE_FORMAT(created_at, '%M %Y'), '%M %Y')")
            ->first();

        $officerStats = BarangayOfficer::selectRaw("
        DATE_FORMAT(created_at, '%M %Y') as month,
        COUNT(*) as total,
        MAX(updated_at) as last_updated
    ")
            ->groupByRaw("DATE_FORMAT(created_at, '%M %Y')")
            ->orderByRaw("STR_TO_DATE(DATE_FORMAT(created_at, '%M %Y'), '%M %Y')")
            ->first();

        $archiveStats = DocumentArchive::selectRaw("
    DATE_FORMAT(created_at, '%M %Y') as month,
    COUNT(*) as total,
    MAX(updated_at) as last_updated,
    SUM(CASE WHEN status_id = 2 THEN 1 ELSE 0 END) as claimed,
    SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) as rejected
")
            ->groupByRaw("DATE_FORMAT(created_at, '%M %Y')")
            ->orderByRaw("STR_TO_DATE(DATE_FORMAT(created_at, '%M %Y'), '%M %Y')")
            ->first();

        $documentStats = Document::selectRaw("
    DATE_FORMAT(created_at, '%M %Y') as month,
    COUNT(*) as total,
    MAX(updated_at) as last_updated,
    SUM(CASE WHEN status_id = 8 THEN 1 ELSE 0 END) as available
")
            ->groupByRaw("DATE_FORMAT(created_at, '%M %Y')")
            ->orderByRaw("STR_TO_DATE(DATE_FORMAT(created_at, '%M %Y'), '%M %Y')")
            ->first();



        $totalUsers = User::count();

        $archives = DocumentArchive::selectRaw("
        DATE_FORMAT(created_at, '%M') as month,
        COUNT(*) as total
            ")
            ->groupBy("month")
            ->orderBy("month")
            ->get();

        $totalArchives = $archives->sum('total');

        // return \response()->json($residentStats);

        $totalBarangayOfficers = BarangayOfficer::count();

        return Inertia::render('admin/Dashboard', [
            'residentStats' => $residentStats,
            'archiveStats' => $archiveStats,
            'officerStats' => $officerStats,
            'adminStats' => $adminStats,
            'documentStats' => $documentStats,
            'totalResidents' => $totalResidents,
            'totalRevenue' => $totalRevenue,
            'totalRequest' => $totalRequest,
            'totalUsers' => $totalUsers,
            'totalArchives' => $totalArchives,
            'totalBarangayOfficers' => $totalBarangayOfficers,
            'monthlyArchives' => $archives->toArray(),
            'monthlyRequestAndRevenue' => $requestAndRevenue->toArray(),
        ]);
    }
}
