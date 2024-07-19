@php
$dataColor = Cache::get('dataColor');
$dataServer = session('dataBanner', null);
@endphp
@extends('layout')
 
@section('header')
<meta charset="UTF-8">
<meta name="theme-color" content="#d47690">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
<link rel="stylesheet" href="/css/all.css">
<title>Soi da Online</title>
@endsection

@section('contentpage')




<div id="alert-web">

</div>
<div class="history_newSoida ">
    <div class="text-center">
        <h1>LỊCH SỬ SOI DA </h1>
    </div>
    <div class="table_newSoida" id="table_newSoida">
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script type="text/javascript" src="/js/contant.js"></script>

<script src="/js/form.js"></script>
{{-- <script src="/js/history.js"></script> --}}

<script src="/js/templateForm.js"></script>
<script type="text/javascript" src="/js/login.js"></script>
<script type="text/javascript" src="/js/welcome.js"></script>
<script type="text/javascript" src="/js/main.js"></script>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


<script>
    $(document).ready(function(){ 
       
    
        callApiMyHistory();
    });
    
</script>
@endsection

