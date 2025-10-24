<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Apps/Index');
    }

    public function kanban()
    {
        $faker = \Faker\Factory::create();
        
        // Generate tasks for each column
        $todoTasks = [];
        $inProgressTasks = [];
        $doneTasks = [];
        
        // Generate 50 tasks distributed across columns for better performance
        for ($i = 1; $i <= 50; $i++) {
            $task = [
                'id' => $i,
                'title' => $faker->sentence(3, true),
                'description' => $faker->sentence(6, true),
                'assignee' => $faker->name,
                'priority' => $faker->randomElement(['low', 'medium', 'high']),
                'dueDate' => $faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
                'tags' => $faker->randomElements(['frontend', 'backend', 'design', 'testing', 'bug', 'feature'], $faker->numberBetween(1, 3)),
            ];
            
            $column = $faker->randomElement(['todo', 'in-progress', 'done']);
            
            if ($column === 'todo') {
                $todoTasks[] = $task;
            } elseif ($column === 'in-progress') {
                $inProgressTasks[] = $task;
            } else {
                $doneTasks[] = $task;
            }
        }

        $columns = [
            [
                'id' => 'todo',
                'title' => 'To Do',
                'tasks' => $todoTasks
            ],
            [
                'id' => 'in-progress',
                'title' => 'In Progress',
                'tasks' => $inProgressTasks
            ],
            [
                'id' => 'done',
                'title' => 'Done',
                'tasks' => $doneTasks
            ]
        ];

        return Inertia::render('Admin/Apps/Kanban', [
            'columns' => $columns,
        ]);
    }

    public function calendar()
    {
        $faker = \Faker\Factory::create();
        $events = [];
        
        // Generate 200 events
        for ($i = 1; $i <= 200; $i++) {
            $startDate = $faker->dateTimeBetween('-60 days', '+60 days');
            $endDate = (clone $startDate)->modify('+' . $faker->numberBetween(1, 4) . ' hours');
            
            $events[] = [
                'id' => $i,
                'title' => $faker->sentence(3),
                'description' => $faker->sentence(8),
                'start' => $startDate->format('Y-m-d H:i:s'),
                'end' => $endDate->format('Y-m-d H:i:s'),
                'color' => $faker->randomElement(['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']),
                'location' => $faker->boolean(60) ? $faker->address : null,
                'attendees' => $faker->numberBetween(1, 15),
            ];
        }

        return Inertia::render('Admin/Apps/Calendar', [
            'events' => $events,
        ]);
    }

    public function mail(Request $request)
    {
        $faker = \Faker\Factory::create();
        
        // Generate 200 emails
        $allEmails = collect();
        for ($i = 1; $i <= 200; $i++) {
            $allEmails->push([
                'id' => $i,
                'from' => $faker->safeEmail,
                'fromName' => $faker->name,
                'subject' => $faker->sentence(6),
                'preview' => $faker->sentence(12),
                'date' => $faker->dateTimeBetween('-30 days', 'now')->format('M j, g:i A'),
                'read' => $faker->boolean(70),
                'starred' => $faker->boolean(20),
                'hasAttachment' => $faker->boolean(30),
                'important' => $faker->boolean(15),
                'category' => $faker->randomElement(['inbox', 'sent', 'draft', 'spam', 'trash']),
            ]);
        }

        // Apply filters
        $emails = $allEmails;
        
        if ($request->has('search') && $request->search) {
            $search = strtolower($request->search);
            $emails = $emails->filter(function ($email) use ($search) {
                return str_contains(strtolower($email['fromName']), $search) ||
                       str_contains(strtolower($email['subject']), $search) ||
                       str_contains(strtolower($email['preview']), $search);
            });
        }

        if ($request->has('category') && $request->category) {
            $emails = $emails->where('category', $request->category);
        } else {
            $emails = $emails->where('category', 'inbox');
        }

        // Paginate
        $perPage = 15;
        $currentPage = $request->get('page', 1);
        $total = $emails->count();
        $emails = $emails->forPage($currentPage, $perPage)->values();

        $paginatedEmails = [
            'data' => $emails->toArray(),
            'current_page' => (int) $currentPage,
            'last_page' => (int) ceil($total / $perPage),
            'per_page' => $perPage,
            'total' => $total,
        ];

        return Inertia::render('Admin/Apps/Mail', [
            'emails' => $paginatedEmails,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Admin/Apps/Show', [
            'app' => ['id' => $id, 'name' => 'Sample App'],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Apps/Create');
    }

    public function store(Request $request)
    {
        // Handle app creation logic
        return redirect()->route('admin.apps.index')
            ->with('success', 'App created successfully.');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Apps/Edit', [
            'app' => ['id' => $id, 'name' => 'Sample App'],
        ]);
    }

    public function update(Request $request, $id)
    {
        // Handle app update logic
        return redirect()->route('admin.apps.index')
            ->with('success', 'App updated successfully.');
    }

    public function destroy($id)
    {
        // Handle app deletion logic
        return redirect()->route('admin.apps.index')
            ->with('success', 'App deleted successfully.');
    }
}
