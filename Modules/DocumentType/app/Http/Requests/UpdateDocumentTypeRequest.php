<?php

namespace Modules\DocumentType\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentTypeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $documentTypeId = $this->route('document_type');
        
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('document_types', 'name')->ignore($documentTypeId)],
            'description' => ['nullable', 'string'],
            'required' => ['required', 'in:required,optional'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'name' => 'document type name',
            'description' => 'description',
            'required' => 'required field',
            'status' => 'status',
        ];
    }
}
