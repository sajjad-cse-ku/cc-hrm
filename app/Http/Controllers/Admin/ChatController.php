<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $chats = [
            [
                'id' => 1,
                'name' => 'John Doe',
                'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
                'lastMessage' => 'Hey, how are you doing?',
                'lastMessageTime' => now()->subMinutes(5)->format('g:i A'),
                'unreadCount' => 2,
                'online' => true,
            ],
            [
                'id' => 2,
                'name' => 'Jane Smith',
                'avatar' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
                'lastMessage' => 'Can we schedule a meeting?',
                'lastMessageTime' => now()->subHours(1)->format('g:i A'),
                'unreadCount' => 0,
                'online' => false,
            ],
            [
                'id' => 3,
                'name' => 'Team Chat',
                'avatar' => null,
                'lastMessage' => 'Great work everyone!',
                'lastMessageTime' => now()->subHours(3)->format('g:i A'),
                'unreadCount' => 5,
                'online' => true,
                'isGroup' => true,
            ],
        ];

        return Inertia::render('Admin/Chats/Index', [
            'chats' => $chats,
        ]);
    }

    public function show($id)
    {
        $chat = [
            'id' => $id,
            'name' => 'John Doe',
            'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            'online' => true,
        ];

        $messages = [
            [
                'id' => 1,
                'senderId' => 2,
                'senderName' => 'John Doe',
                'message' => 'Hey, how are you doing?',
                'timestamp' => now()->subMinutes(10)->format('g:i A'),
                'isOwn' => false,
            ],
            [
                'id' => 2,
                'senderId' => 1,
                'senderName' => 'You',
                'message' => 'I\'m doing great! How about you?',
                'timestamp' => now()->subMinutes(8)->format('g:i A'),
                'isOwn' => true,
            ],
            [
                'id' => 3,
                'senderId' => 2,
                'senderName' => 'John Doe',
                'message' => 'Pretty good! Working on some exciting projects.',
                'timestamp' => now()->subMinutes(5)->format('g:i A'),
                'isOwn' => false,
            ],
        ];

        return Inertia::render('Admin/Chats/Show', [
            'chat' => $chat,
            'messages' => $messages,
        ]);
    }

    public function sendMessage(Request $request, $chatId)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        // In a real app, you would save the message to database
        // and potentially broadcast it via websockets

        return response()->json([
            'success' => true,
            'message' => [
                'id' => rand(1000, 9999),
                'senderId' => auth()->id(),
                'senderName' => 'You',
                'message' => $validated['message'],
                'timestamp' => now()->format('g:i A'),
                'isOwn' => true,
            ],
        ]);
    }
}
