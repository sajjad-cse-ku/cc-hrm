<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Department\Models\Department;
use Modules\Department\Services\DepartmentService;
use Modules\Department\Http\Requests\StoreDepartmentRequest;
use Modules\Department\Http\Requests\UpdateDepartmentRequest;
use Modules\Branch\Models\Branch;

class DepartmentController extends Controller
{
    protected $departmentService;

    public function __construct(DepartmentService $departmentService)
    {
        $this->departmentService = $departmentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Department::with('branch');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Branch filter
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->get('branch_id'));
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        
        $departments = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Department/Index', [
            'departments' => $departments,
            'branches' => Branch::active()->get(['id', 'branch_name']),
            'filters' => $request->only(['search', 'status', 'branch_id', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Department/Create', [
            'branches' => Branch::active()->get(['id', 'branch_name'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        $department = $this->departmentService->createDepartment($request->validated());

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show(Department $department)
    {
        $department->load('branch');
        
        return Inertia::render('Department/Show', [
            'department' => $department
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        return Inertia::render('Department/Edit', [
            'department' => $department,
            'branches' => Branch::active()->get(['id', 'branch_name'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $this->departmentService->updateDepartment($department->id, $request->validated());

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $this->departmentService->deleteDepartment($department->id);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}
