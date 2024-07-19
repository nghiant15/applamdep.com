@php
$dataColor = Cache::get('dataColor');
$dataServer = session('dataBanner', null);
@endphp
@extends('layout.layout')
 
@section('header')
<meta charset="UTF-8">
<meta name="theme-color" content="#d47690">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="/css/all.css">
<title>Thông tin voucher</title>
@endsection


@section('contentpage')


<div id="alert-web">

</div>
<div class="history_newSoida ">
    <div class="text-center">
        <h1>Thông tin voucher của bạn</h1>
    </div>
    <div class="table_newSoida" id="table_info-voucher">
    </div>
    <div class="status__info-voucher">
        <div class="modal-gift">
            <div class="popup__info-voucher" style="display : block">
              <div class="position-close2" onclick="toggleFormByClass(false,'.status__info-voucher')">
                <svg viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
                  <path
                    d="M14.8284 12L19.4142 16.5858C20.1953 17.3668 20.1953 18.6332 19.4142 19.4142
                            C18.6332 20.1953 17.3668 20.1953 16.5858 19.4142L12 14.8284L7.41421 19.4142
                            C6.63317 20.1953 5.36684 20.1953 4.58579 19.4142C3.80474 18.6332 3.80474 17.3668 4.58579 16.5858L9.17157 12
                            L4.58579 7.41421C3.80474 6.63317 3.80474 5.36684 4.58579 4.58579
                            C5.36684 3.80474 6.63317 3.80474 7.41421 4.58579L12 9.17157L16.5858 4.58579
                            C17.3668 3.80474 18.6332 3.80474 19.4142 4.58579C20.1953 5.36684 20.1953 6.63317 19.4142 7.41421L14.8284 12Z"
                    transform=""></path>
                </svg>
              </div>
              <div class="status__loading-info-voucher">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>
              <div id="render__info-voucher">

              </div>
            </div>

            </div>
    </div>
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script type="text/javascript" src="/js/contant.js"></script>

<script src="/js/form.js"></script>
<script src="/js/history.js"></script>
<script src="/js/table.js"></script>
<script>
    callApiInfoVoucher()
</script>
<script src="/js/templateForm.js"></script>
<script type="text/javascript" src="/js/welcome.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


@endsection

