@extends('layouts.app')

@section('content')
    <div class="container">
        <div id="main"
             data-loggedInUser="{{ json_encode($loggedInUser) }}"
             data-selectedUser="{{ json_encode($selectedUser) }}"
             data-messages="{{ json_encode($messages) }}">
        </div>
    </div>
@endsection
