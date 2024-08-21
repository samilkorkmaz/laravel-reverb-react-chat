<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request) {
        // Get the logged-in user ID
        $currentUserId = Auth::id();

        // Fetch the user
        $user = User::find($currentUserId);

        // Get the user ID from the query parameter
        $selectedUserId = $request->query('selected_user_id'); // e.g. http://127.0.0.1:8000/chat?selected_user_id=2

        // Fetch messages between the logged-in user and the selected user
        $messages = Message::where(function($query) use ($currentUserId, $selectedUserId) {
            $query->where('user_id', $currentUserId)
                ->where('to_id', $selectedUserId);
        })
            ->orWhere(function($query) use ($currentUserId, $selectedUserId) {
                $query->where('user_id', $selectedUserId)
                    ->where('to_id', $currentUserId);
            })
            ->with(['sender', 'recipient']) // Eager load both sender and recipient relationships
            ->get();



        // Pass the messages to the view
        return view('home', compact('user', 'messages'));
    }

    public function proceed() {
        // Fetch all users except the currently logged-in user
        $users = User::where('id', '!=', Auth::id())->get();

        // Pass the users to the proceed view
        return view('proceed', compact('users'));
    }

    public function users(): JsonResponse {
        $users = User::all();
        return response()->json($users);
    }

    public function messages(): JsonResponse {
        $messages = Message::with('user')->get()->append('time');

        return response()->json($messages);
    }

    public function message(Request $request): JsonResponse {
        $message = Message::create([
            'user_id' => auth()->id(),
            'to_id' => $request->get('to_id'),
            'text' => $request->get('text'),
        ]);

        SendMessage::dispatch($message);

        return response()->json([
            'success' => true,
            'message' => "Message created and job dispatched.",
        ]);
    }
}
