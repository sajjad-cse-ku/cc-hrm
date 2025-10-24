<?php

namespace Modules\Designation\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Designation\Models\Designation;
use Modules\Designation\Services\DesignationService;
use Modules\Designation\Http\Requests\StoreDesignationRequest;
use Modules\Designation\Http\Requests\UpdateDesignationRequest;
use Modules\Department\Models\Department;

class DesignationController extends Controller
{
    protected $designationService;

    public function __construct(DesignationService $designationService)
    {
        $this->designationService = $designationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Designation::with('department.branch');

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

        // Department filter
        if ($request->filled('department_id')) {
            $query->where('department_id', $request->get('department_id'));
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        
        $designations = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Designation/Index', [
            'designations' => $designations,
            'departments' => Department::active()->with('branch')->get(['id', 'name', 'branch_id']),
            'filters' => $request->only(['search', 'status', 'department_id', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Designation/Create', [
            'departments' => Department::active()->with('branch')->get(['id', 'name', 'branch_id'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesignationRequest $request)
    {
        $designation = $this->designationService->createDesignation($request->validated());

        return redirect()->route('admin.designations.index')
            ->with('success', 'Designation created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show(Designation $designation)
    {
        $designation->load('department.branch');
        
        return Inertia::render('Designation/Show', [
            'designation' => $designation
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Designation $designation)
    {
        return Inertia::render('Designation/Edit', [
            'designation' => $designation,
            'departments' => Department::active()->with('branch')->get(['id', 'name', 'branch_id'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesignationRequest $request, Designation $designation)
    {
        $this->designationService->updateDesignation($designation->id, $request->validated());

        return redirect()->route('admin.designations.index')
            ->with('success', 'Designation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designation $designation)
    {
        $this->designationService->deleteDesignation($designation->id);

        return redirect()->route('admin.designations.index')
            ->with('success', 'Designation deleted successfully.');
    }
}
