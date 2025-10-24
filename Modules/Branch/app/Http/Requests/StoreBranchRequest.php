<?php

namespace Modules\Branch\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'branch_name' => 'required|string|max:255|unique:branches,branch_name',
            'address' => 'required|string|max:1000',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'status' => 'sometimes|in:active,inactive'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'branch_name.required' => 'Branch name is required.',
            'branch_name.unique' => 'A branch with this name already exists.',
            'address.required' => 'Address is required.',
            'city.required' => 'City is required.',
            'state.required' => 'State/Province is required.',
            'country.required' => 'Country is required.',
            'zip_code.required' => 'Zip/Postal code is required.',
            'status.in' => 'Status must be either active or inactive.'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
