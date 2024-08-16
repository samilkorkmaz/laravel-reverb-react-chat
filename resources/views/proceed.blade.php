@extends('layouts.app')

@section('content')
    <div class="container text-center mt-5">
        <h1>Welcome to the Chat Application</h1>
        <p>Click the button below to proceed to the chat.</p>
        <a href="{{ route('chat') }}" class="btn btn-primary">Proceed to Chat</a>
    </div>
@endsection
