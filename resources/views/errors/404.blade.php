@extends('errors::minimal')

@section('title', ('404'))
@section('code', ('404'))
@section('message', $exception->getMessage() ?: 'Page not found')
