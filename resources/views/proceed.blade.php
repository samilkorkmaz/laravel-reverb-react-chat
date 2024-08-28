@extends('layouts.app')

@section('content')
    <div class="container text-center mt-5">
        <h1>Welcome to the Chat Application</h1>

        <div class="form-group">
            <label for="receiverSelectProceed">Select User to Chat With:</label>
            <select id="receiverSelectProceed" class="form-control">
                <option value="" disabled selected>Select receiver...</option>
                @foreach($users as $user)
                    <option value="{{ $user->id }}">Receiver: {{ $user->name }}</option>
                @endforeach
            </select>
        </div>

        <p>Click the button below to proceed to the chat.</p>
        <a href="#" id="proceedToChat" class="btn btn-primary">Proceed to Chat</a>
    </div>

    <script>
        document.getElementById('proceedToChat').addEventListener('click', function() {
            const selectedReceiverId = document.getElementById('receiverSelectProceed').value;
            if (!selectedReceiverId) {
                alert('Please select a user!');
                return;
            }

            window.location.href = "{{ url('/chat') }}?selected_receiver_id=" + selectedReceiverId;
        });
    </script>
@endsection
