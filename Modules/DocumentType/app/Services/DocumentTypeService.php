<?php

namespace Modules\DocumentType\Services;

use Modules\DocumentType\Models\DocumentType;
use Illuminate\Support\Facades\DB;

class DocumentTypeService
{
    /**
     * Create a new document type.
     */
    public function createDocumentType(array $data): DocumentType
    {
        return DB::transaction(function () use ($data) {
            return DocumentType::create($data);
        });
    }

    /**
     * Update an existing document type.
     */
    public function updateDocumentType(int $id, array $data): DocumentType
    {
        return DB::transaction(function () use ($id, $data) {
            $documentType = DocumentType::findOrFail($id);
            $documentType->update($data);
            return $documentType->fresh();
        });
    }

    /**
     * Delete a document type.
     */
    public function deleteDocumentType(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $documentType = DocumentType::findOrFail($id);
            return $documentType->delete();
        });
    }

    /**
     * Get document type by ID.
     */
    public function getDocumentType(int $id): DocumentType
    {
        return DocumentType::findOrFail($id);
    }

    /**
     * Get all document types with optional filters.
     */
    public function getAllDocumentTypes(array $filters = [])
    {
        $query = DocumentType::query();

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['required'])) {
            $query->where('required', $filters['required']);
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
