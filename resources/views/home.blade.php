@extends('layouts.app')

@section('content')
    <div class="container">
        <div id="main"
             data-loggedInUser="{{ json_encode($loggedInUser) }}"
             data-selectedReceiver="{{ json_encode($selectedReceiver) }}"
             data-messages="{{ json_encode($messages) }}">
        </div>
    </div>
@endsection
