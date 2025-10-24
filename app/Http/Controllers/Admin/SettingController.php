<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.settings.profile');
    }

    public function profile()
    {
        $user = auth()->user();
        
        return Inertia::render('Admin/Settings/Profile', [
            'user' => $user,
        ]);
    }

    public function account()
    {
        $user = auth()->user();
        
        return Inertia::render('Admin/Settings/Account', [
            'user' => $user,
        ]);
    }

    public function appearance()
    {
        return Inertia::render('Admin/Settings/Appearance');
    }

    public function notifications()
    {
        $settings = [
            'emailNotifications' => true,
            'pushNotifications' => false,
            'smsNotifications' => true,
            'marketingEmails' => false,
            'securityAlerts' => true,
        ];

        return Inertia::render('Admin/Settings/Notifications', [
            'settings' => $settings,
        ]);
    }

    public function display()
    {
        $settings = [
            'theme' => 'light',
            'language' => 'en',
            'timezone' => 'UTC',
            'dateFormat' => 'MM/DD/YYYY',
            'timeFormat' => '12h',
        ];

        return Inertia::render('Admin/Settings/Display', [
            'settings' => $settings,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'bio' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
        ]);

        auth()->user()->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function updateAccount(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|string|min:8|confirmed',
        ]);

        auth()->user()->update([
            'password' => bcrypt($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Password updated successfully.');
    }
}
