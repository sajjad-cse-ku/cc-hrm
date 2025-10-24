<?php

namespace Modules\DocumentType\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\DocumentType\Models\DocumentType;
use Modules\DocumentType\Services\DocumentTypeService;
use Modules\DocumentType\Http\Requests\StoreDocumentTypeRequest;
use Modules\DocumentType\Http\Requests\UpdateDocumentTypeRequest;

class DocumentTypeController extends Controller
{
    protected $documentTypeService;

    public function __construct(DocumentTypeService $documentTypeService)
    {
        $this->documentTypeService = $documentTypeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DocumentType::query();

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

        // Required filter
        if ($request->filled('required')) {
            $query->where('required', $request->get('required'));
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? $perPage : 10;
        
        $documentTypes = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('DocumentType/Index', [
            'documentTypes' => $documentTypes,
            'filters' => $request->only(['search', 'status', 'required', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('DocumentType/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentTypeRequest $request)
    {
        $documentType = $this->documentTypeService->createDocumentType($request->validated());

        return redirect()->route('admin.document-types.index')
            ->with('success', 'Document type created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show(DocumentType $documentType)
    {
        return Inertia::render('DocumentType/Show', [
            'documentType' => $documentType
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentType $documentType)
    {
        return Inertia::render('DocumentType/Edit', [
            'documentType' => $documentType
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentTypeRequest $request, DocumentType $documentType)
    {
        $this->documentTypeService->updateDocumentType($documentType->id, $request->validated());

        return redirect()->route('admin.document-types.index')
            ->with('success', 'Document type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentType $documentType)
    {
        $this->documentTypeService->deleteDocumentType($documentType->id);

        return redirect()->route('admin.document-types.index')
            ->with('success', 'Document type deleted successfully.');
    }
}
