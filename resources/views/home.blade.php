@extends('layouts.app')

@section('content')
    <div class="container">
        <div id="main" data-user="{{ json_encode($user) }}" data-messages="{{ json_encode($messages) }}"></div>
    </div>
@endsection
