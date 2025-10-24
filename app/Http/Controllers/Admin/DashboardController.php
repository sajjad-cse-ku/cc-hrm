<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mock data for dashboard
        $stats = [
            'totalUsers' => 1234,
            'totalRevenue' => 45231.89,
            'totalOrders' => 234,
            'totalProducts' => 567,
        ];

        $recentSales = [
            ['id' => 1, 'customer' => 'John Doe', 'email' => 'john@example.com', 'amount' => 250.00, 'date' => now()->subDays(1)],
            ['id' => 2, 'customer' => 'Jane Smith', 'email' => 'jane@example.com', 'amount' => 150.00, 'date' => now()->subDays(2)],
            ['id' => 3, 'customer' => 'Bob Johnson', 'email' => 'bob@example.com', 'amount' => 350.00, 'date' => now()->subDays(3)],
        ];

        $chartData = [
            'revenue' => [
                ['month' => 'Jan', 'desktop' => 186, 'mobile' => 80],
                ['month' => 'Feb', 'desktop' => 305, 'mobile' => 200],
                ['month' => 'Mar', 'desktop' => 237, 'mobile' => 120],
                ['month' => 'Apr', 'desktop' => 73, 'mobile' => 190],
                ['month' => 'May', 'desktop' => 209, 'mobile' => 130],
                ['month' => 'Jun', 'desktop' => 214, 'mobile' => 140],
            ]
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentSales' => $recentSales,
            'chartData' => $chartData,
        ]);
    }
}
