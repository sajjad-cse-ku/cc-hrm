<?php

namespace Modules\Branch\Services;

use Modules\Branch\Models\Branch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Exception;

class BranchService
{
    /**
     * Get all branches with optional filters
     */
    public function getAllBranches(array $filters = []): Collection
    {
        $query = Branch::query();

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['country'])) {
            $query->where('country', $filters['country']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('branch_name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('state', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        return $query->latest()->get();
    }

    /**
     * Get paginated branches
     */
    public function getPaginatedBranches(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Branch::query();

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['country'])) {
            $query->where('country', $filters['country']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('branch_name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('state', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }

    /**
     * Find branch by ID
     */
    public function findBranch(int $id): ?Branch
    {
        return Branch::find($id);
    }

    /**
     * Find branch by ID or fail
     */
    public function findBranchOrFail(int $id): Branch
    {
        return Branch::findOrFail($id);
    }

    /**
     * Create a new branch
     */
    public function createBranch(array $data): Branch
    {
        try {
            DB::beginTransaction();

            // Validate required fields
            $this->validateBranchData($data);

            $branch = Branch::create([
                'branch_name' => $data['branch_name'],
                'address' => $data['address'],
                'city' => $data['city'],
                'state' => $data['state'],
                'country' => $data['country'],
                'zip_code' => $data['zip_code'],
                'status' => $data['status'] ?? 'active'
            ]);

            DB::commit();
            return $branch;

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Update branch
     */
    public function updateBranch(int $id, array $data): Branch
    {
        try {
            DB::beginTransaction();

            $branch = $this->findBranchOrFail($id);
            
            // Validate required fields
            $this->validateBranchData($data, $id);

            $branch->update([
                'branch_name' => $data['branch_name'],
                'address' => $data['address'],
                'city' => $data['city'],
                'state' => $data['state'],
                'country' => $data['country'],
                'zip_code' => $data['zip_code'],
                'status' => $data['status'] ?? $branch->status
            ]);

            DB::commit();
            return $branch->fresh();

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Delete branch (soft delete)
     */
    public function deleteBranch(int $id): bool
    {
        try {
            $branch = $this->findBranchOrFail($id);
            return $branch->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * Restore soft deleted branch
     */
    public function restoreBranch(int $id): bool
    {
        $branch = Branch::withTrashed()->findOrFail($id);
        return $branch->restore();
    }

    /**
     * Force delete branch
     */
    public function forceDeleteBranch(int $id): bool
    {
        $branch = Branch::withTrashed()->findOrFail($id);
        return $branch->forceDelete();
    }

    /**
     * Get active branches only
     */
    public function getActiveBranches(): Collection
    {
        return Branch::active()->get();
    }

    /**
     * Get inactive branches only
     */
    public function getInactiveBranches(): Collection
    {
        return Branch::inactive()->get();
    }

    /**
     * Get branches by country
     */
    public function getBranchesByCountry(string $country): Collection
    {
        return Branch::where('country', $country)->get();
    }

    /**
     * Get branches by state
     */
    public function getBranchesByState(string $state): Collection
    {
        return Branch::where('state', $state)->get();
    }

    /**
     * Toggle branch status
     */
    public function toggleBranchStatus(int $id): Branch
    {
        $branch = $this->findBranchOrFail($id);
        $newStatus = $branch->status === 'active' ? 'inactive' : 'active';
        
        $branch->update(['status' => $newStatus]);
        return $branch->fresh();
    }

    /**
     * Get branch statistics
     */
    public function getBranchStatistics(): array
    {
        return [
            'total' => Branch::count(),
            'active' => Branch::active()->count(),
            'inactive' => Branch::inactive()->count(),
            'by_country' => Branch::select('country', DB::raw('count(*) as total'))
                ->groupBy('country')
                ->pluck('total', 'country')
                ->toArray()
        ];
    }

    /**
     * Validate branch data
     */
    private function validateBranchData(array $data, ?int $excludeId = null): void
    {
        $requiredFields = ['branch_name', 'address', 'city', 'state', 'country', 'zip_code'];
        
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                throw new Exception("The {$field} field is required.");
            }
        }

        // Check for duplicate branch name
        $query = Branch::where('branch_name', $data['branch_name']);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        
        if ($query->exists()) {
            throw new Exception('A branch with this name already exists.');
        }
    }
}
