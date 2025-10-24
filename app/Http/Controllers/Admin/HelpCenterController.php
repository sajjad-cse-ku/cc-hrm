<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HelpCenterController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.help-center.overview');
    }

    public function overview()
    {
        $articles = [
            [
                'id' => 1,
                'title' => 'Getting Started',
                'description' => 'Learn the basics of using our platform',
                'category' => 'Basics',
                'readTime' => '5 min read',
                'views' => 1234,
            ],
            [
                'id' => 2,
                'title' => 'User Management',
                'description' => 'How to manage users and permissions',
                'category' => 'Administration',
                'readTime' => '8 min read',
                'views' => 856,
            ],
            [
                'id' => 3,
                'title' => 'API Documentation',
                'description' => 'Complete guide to our REST API',
                'category' => 'Development',
                'readTime' => '15 min read',
                'views' => 2341,
            ],
            [
                'id' => 4,
                'title' => 'Troubleshooting',
                'description' => 'Common issues and their solutions',
                'category' => 'Support',
                'readTime' => '10 min read',
                'views' => 1567,
            ],
        ];

        $categories = [
            ['name' => 'Basics', 'count' => 12],
            ['name' => 'Administration', 'count' => 8],
            ['name' => 'Development', 'count' => 15],
            ['name' => 'Support', 'count' => 6],
        ];

        return Inertia::render('Admin/HelpCenter/Overview', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function support()
    {
        $tickets = [
            [
                'id' => 1,
                'subject' => 'Login Issues',
                'status' => 'open',
                'priority' => 'high',
                'created' => now()->subDays(1)->format('M j, Y'),
                'lastUpdate' => now()->subHours(2)->format('M j, Y g:i A'),
            ],
            [
                'id' => 2,
                'subject' => 'Feature Request',
                'status' => 'in-progress',
                'priority' => 'medium',
                'created' => now()->subDays(3)->format('M j, Y'),
                'lastUpdate' => now()->subDays(1)->format('M j, Y g:i A'),
            ],
            [
                'id' => 3,
                'subject' => 'Bug Report',
                'status' => 'resolved',
                'priority' => 'low',
                'created' => now()->subWeeks(1)->format('M j, Y'),
                'lastUpdate' => now()->subDays(2)->format('M j, Y g:i A'),
            ],
        ];

        return Inertia::render('Admin/HelpCenter/Support', [
            'tickets' => $tickets,
        ]);
    }
}
