<?php

namespace Modules\Branch\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Branch\Models\Branch;
use App\Models\User;

class BranchPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Branch $branch): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Branch $branch): bool
    {
        return true;
    }

    public function delete(User $user, Branch $branch): bool
    {
        return true;
    }

    public function restore(User $user, Branch $branch): bool
    {
        return true;
    }

    public function forceDelete(User $user, Branch $branch): bool
    {
        return true;
    }
}
