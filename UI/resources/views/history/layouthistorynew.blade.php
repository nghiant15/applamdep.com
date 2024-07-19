{{-- <html>

<head>
    @php
    $dataColor = Cache::get('dataColor');

    @endphp
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title>Lịch sử soi da</title>
    <link rel="stylesheet" href="/css/global.css" />
    <link rel="icon" type="" href="/images/faviconLogo.png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    @yield('header')
    <meta name="description" content="Xây dựng chiến dịch Soi Da & Trang Điểm: 100% Online
    Xây dựng chiến dịch Soi Da & chuẩn đoán 100% Online, Thử Trang Điểm & tư vấn 100% Online" />
    <meta name="keywords" content="Soi da online" />
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />
    <style> 
    
        :root{
            --main_color : #1a214f;
            --color_button_dark: #015C92;
            --color_button_light: #53A6D8;
            --color_title: #53A6D8;
            --color_title_section: #015C92;
            --color_letter_white: #FFFFFF;
            --main_letter_dark: #212326;
            --main_letter_blue: #53A6D8;
            --gralident1: #7DC387;
            --gralident2: #6CFF95;
            --white: #FFFFFF;
            --circle-small: #E5E5E5;
            --bg-white: #FAFAFA;
            --black-50: #F2F2F2;
            --success_color: #3bb54a;
            --error_color: #3d0d13;
    }
        </style>
    
</head>

<body>

    <script>
        var isLogin = true;
    </script>

    @if (Session()->has('dataCompany'))
    <script>
        var isLogin = true;
    </script>


    @endif

    <script>
        var slugGlobal = "chosieucerin";
        var dataUser = {!! json_encode($dataUser) !!};
         var companyIdGlobal = {!! json_encode($companyGlobalId) !!};
    </script>
    @if (Session()->has('dataCompany'))

    @else

    @endif
    <div class="content-page">

        <div class="content-plugin">
            @yield('contentpage')
        </div>
    </div>

    <div id="box_notify">

    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/formAccount.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/history.js"></script>
  

</body>

</html> --}}