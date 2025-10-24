<?php

namespace Modules\Designation\Services;

use Modules\Designation\Models\Designation;
use Illuminate\Support\Facades\DB;

class DesignationService
{
    /**
     * Create a new designation.
     */
    public function createDesignation(array $data): Designation
    {
        return DB::transaction(function () use ($data) {
            return Designation::create($data);
        });
    }

    /**
     * Update an existing designation.
     */
    public function updateDesignation(int $id, array $data): Designation
    {
        return DB::transaction(function () use ($id, $data) {
            $designation = Designation::findOrFail($id);
            $designation->update($data);
            return $designation->fresh();
        });
    }

    /**
     * Delete a designation.
     */
    public function deleteDesignation(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $designation = Designation::findOrFail($id);
            return $designation->delete();
        });
    }

    /**
     * Get designation by ID.
     */
    public function getDesignation(int $id): Designation
    {
        return Designation::with('department')->findOrFail($id);
    }

    /**
     * Get all designations with optional filters.
     */
    public function getAllDesignations(array $filters = [])
    {
        $query = Designation::with('department');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['department_id'])) {
            $query->where('department_id', $filters['department_id']);
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
