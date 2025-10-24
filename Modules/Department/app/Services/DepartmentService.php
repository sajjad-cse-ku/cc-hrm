<?php

namespace Modules\Department\Services;

use Modules\Department\Models\Department;
use Illuminate\Support\Facades\DB;

class DepartmentService
{
    /**
     * Create a new department.
     */
    public function createDepartment(array $data): Department
    {
        return DB::transaction(function () use ($data) {
            return Department::create($data);
        });
    }

    /**
     * Update an existing department.
     */
    public function updateDepartment(int $id, array $data): Department
    {
        return DB::transaction(function () use ($id, $data) {
            $department = Department::findOrFail($id);
            $department->update($data);
            return $department->fresh();
        });
    }

    /**
     * Delete a department.
     */
    public function deleteDepartment(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $department = Department::findOrFail($id);
            return $department->delete();
        });
    }

    /**
     * Get department by ID.
     */
    public function getDepartment(int $id): Department
    {
        return Department::with('branch')->findOrFail($id);
    }

    /**
     * Get all departments with optional filters.
     */
    public function getAllDepartments(array $filters = [])
    {
        $query = Department::with('branch');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['branch_id'])) {
            $query->where('branch_id', $filters['branch_id']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return $query->latest()->get();
    }
}
