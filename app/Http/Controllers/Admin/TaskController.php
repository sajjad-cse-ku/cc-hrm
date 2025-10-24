<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $faker = \Faker\Factory::create();
        
        // Generate 200 tasks with new structure
        $allTasks = collect();
        for ($i = 1; $i <= 200; $i++) {
            $assigneeName = $faker->name;
            $allTasks->push([
                'id' => $i,
                'task_id' => 'TSK-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'title' => $faker->sentence(4),
                'description' => $faker->sentence(8),
                'status' => $faker->randomElement(['todo', 'in_progress', 'completed', 'cancelled']),
                'priority' => $faker->randomElement(['low', 'medium', 'high', 'urgent']),
                'assignee_name' => $assigneeName,
                'assignee_avatar' => $faker->imageUrl(32, 32, 'people'),
                'due_date' => $faker->dateTimeBetween('now', '+60 days')->format('Y-m-d'),
                'created_at' => $faker->dateTimeBetween('-30 days', 'now')->format('Y-m-d H:i:s'),
                'updated_at' => $faker->dateTimeBetween('-7 days', 'now')->format('Y-m-d H:i:s'),
            ]);
        }

        // Apply search filter
        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $allTasks = $allTasks->filter(function ($task) use ($search) {
                return str_contains(strtolower($task['task_id']), $search) ||
                       str_contains(strtolower($task['title']), $search) ||
                       str_contains(strtolower($task['description']), $search) ||
                       str_contains(strtolower($task['assignee_name']), $search);
            });
        }

        // Apply status filter
        if ($request->filled('status')) {
            $allTasks = $allTasks->where('status', $request->status);
        }

        // Apply priority filter
        if ($request->filled('priority')) {
            $allTasks = $allTasks->where('priority', $request->priority);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        $allowedSorts = ['task_id', 'title', 'status', 'priority', 'assignee_name', 'due_date', 'created_at'];
        if (in_array($sortBy, $allowedSorts)) {
            $allTasks = $allTasks->sortBy($sortBy, SORT_REGULAR, $sortDirection === 'desc');
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        
        $currentPage = $request->get('page', 1);
        $total = $allTasks->count();
        $tasks = $allTasks->forPage($currentPage, $perPage)->values();

        $paginatedTasks = [
            'data' => $tasks->toArray(),
            'current_page' => (int) $currentPage,
            'last_page' => (int) ceil($total / $perPage),
            'per_page' => (int) $perPage,
            'total' => $total,
            'from' => (($currentPage - 1) * $perPage) + 1,
            'to' => min($currentPage * $perPage, $total),
        ];

        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => $paginatedTasks,
            'filters' => $request->only(['search', 'status', 'priority', 'sort_by', 'sort_direction', 'per_page']),
        ]);
    }

    public function show($id)
    {
        // Mock single task data
        $task = [
            'id' => $id,
            'title' => 'Update user dashboard',
            'description' => 'Implement new features for the user dashboard including analytics and user management',
            'status' => 'todo',
            'priority' => 'high',
            'assignee' => 'John Doe',
            'dueDate' => now()->addDays(3)->format('Y-m-d'),
            'createdAt' => now()->subDays(2)->format('Y-m-d H:i:s'),
            'updatedAt' => now()->subHours(2)->format('Y-m-d H:i:s'),
        ];

        return Inertia::render('Admin/Tasks/Show', [
            'task' => $task,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tasks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,done',
            'priority' => 'required|in:low,medium,high',
            'assignee' => 'required|string|max:255',
            'dueDate' => 'nullable|date',
        ]);

        // In a real app, you would save to database
        // Task::create($validated);

        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task created successfully.');
    }

    public function edit($id)
    {
        // Mock task data for editing
        $task = [
            'id' => $id,
            'title' => 'Update user dashboard',
            'description' => 'Implement new features for the user dashboard',
            'status' => 'todo',
            'priority' => 'high',
            'assignee' => 'John Doe',
            'dueDate' => now()->addDays(3)->format('Y-m-d'),
        ];

        return Inertia::render('Admin/Tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,done',
            'priority' => 'required|in:low,medium,high',
            'assignee' => 'required|string|max:255',
            'dueDate' => 'nullable|date',
        ]);

        // In a real app, you would update the database
        // $task = Task::findOrFail($id);
        // $task->update($validated);

        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    public function destroy($id)
    {
        // In a real app, you would delete from database
        // Task::findOrFail($id)->delete();

        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task deleted successfully.');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:todo,in-progress,done',
        ]);

        // In a real app, you would update the database
        // $task = Task::findOrFail($id);
        // $task->update(['status' => $validated['status']]);

        return response()->json(['success' => true]);
    }
}
