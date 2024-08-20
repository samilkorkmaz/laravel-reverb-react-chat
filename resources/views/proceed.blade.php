@extends('layouts.app')

@section('content')
    <div class="container text-center mt-5">
        <h1>Welcome to the Chat Application</h1>

        <div class="form-group">
            <label for="userSelect">Select User to Chat With:</label>
            <select id="userSelect" class="form-control">
                <option value="" disabled selected>Select user...</option>
                @foreach($users as $user)
                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                @endforeach
            </select>
        </div>

        <p>Click the button below to proceed to the chat.</p>
        <a href="#" id="proceedToChat" class="btn btn-primary">Proceed to Chat</a>
    </div>

    <script>
        document.getElementById('proceedToChat').addEventListener('click', function() {
            const selectedUserId = document.getElementById('userSelect').value;
            if (!selectedUserId) {
                alert('Please select a user!');
                return;
            }

            window.location.href = "{{ url('/chat') }}?user_id=" + selectedUserId;
        });
    </script>
@endsection
