@extends('templates.application')
@section('title', $title)
@section('content')
    <p>This is appended to the master sidebar.</p>
@endsection
@section('js')
$(document).ready(function(){
});
@endsection