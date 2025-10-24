<?php

namespace Modules\DocumentType\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class DocumentType extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'description',
        'required',
        'status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'required' => 'string',
        'status' => 'string',
    ];

    /**
     * Check if document type is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Check if document type is inactive.
     */
    public function isInactive(): bool
    {
        return $this->status === 'inactive';
    }

    /**
     * Check if document type is required.
     */
    public function isRequired(): bool
    {
        return $this->required === 'required';
    }

    /**
     * Check if document type is optional.
     */
    public function isOptional(): bool
    {
        return $this->required === 'optional';
    }

    /**
     * Scope a query to only include active document types.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive document types.
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Scope a query to only include required document types.
     */
    public function scopeRequired($query)
    {
        return $query->where('required', 'required');
    }

    /**
     * Scope a query to only include optional document types.
     */
    public function scopeOptional($query)
    {
        return $query->where('required', 'optional');
    }
}
