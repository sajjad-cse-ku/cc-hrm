<?php

namespace Modules\DocumentType\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'required' => $this->required,
            'status' => $this->status,
            'is_active' => $this->isActive(),
            'is_inactive' => $this->isInactive(),
            'is_required' => $this->isRequired(),
            'is_optional' => $this->isOptional(),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
