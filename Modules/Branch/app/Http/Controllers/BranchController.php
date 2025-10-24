<?php

namespace Modules\Branch\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Branch\Models\Branch;
use Modules\Branch\Services\BranchService;
use Modules\Branch\Http\Requests\StoreBranchRequest;
use Modules\Branch\Http\Requests\UpdateBranchRequest;
use Modules\Branch\Http\Resources\BranchResource;

class BranchController extends Controller
{
    protected $branchService;

    public function __construct(BranchService $branchService)
    {
        $this->branchService = $branchService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Branch::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('branch_name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('state', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Country filter
        if ($request->filled('country')) {
            $query->where('country', $request->get('country'));
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        
        $branches = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Branch/Index', [
            'branches' => $branches,
            'filters' => $request->only(['search', 'status', 'country', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Branch/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $branch = $this->branchService->createBranch($request->validated());

        return redirect()->route('admin.branches.index')
            ->with('success', 'Branch created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show(Branch $branch)
    {
        return Inertia::render('Branch/Show', [
            'branch' => new BranchResource($branch)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        return Inertia::render('Branch/Edit', [
            'branch' => new BranchResource($branch)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $this->branchService->updateBranch($branch->id, $request->validated());

        return redirect()->route('admin.branches.index')
            ->with('success', 'Branch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $this->branchService->deleteBranch($branch->id);

        return redirect()->route('admin.branches.index')
            ->with('success', 'Branch deleted successfully.');
    }
}
