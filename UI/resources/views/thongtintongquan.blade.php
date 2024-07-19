@extends('layout')

@section('header')

<title>Xem tổng quan</title>
<meta name="theme-color" content="#d47690">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="/css/soidanew.css">
<link rel="stylesheet" href="/css/reponsive.css">
<script src="/js/main.js"></script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

@endsection
@section('contentpage')


<div class="centerDirect">
    <p>
        3- Tổng quan về làn da của bạn
    </p>
    <img src="/images/start-direct.png">

</div>
<div class="center-text text-bold boldTitle">
    Chọn thành phần để xem kết quả<br> tổng quan
</div>

<div class="content-page">
    <div class="button-menu-button"> 
        <button class="tablink btn1" onclick="openPage('Home', this, 'red')">TUỔI</button>
        <button class="tablink btn2"  onclick="openPage('News', this, 'green')" id="defaultOpen">LOẠI DA</button>
        <button class="tablink btn3" onclick="openPage('Contact', this, 'blue')">TONE MÀU DA</button>
        <button class="tablink btn4" onclick="openPage('About', this, 'orange')">NỐT RUỒI</button>

    </div>
   

    <div id="Home" class="tabcontent">

     

            <div class="content-tab">
                <div class="column-image">
                    <img src="/images/face1.png">

                </div>
                <div class="column-content">

                    <div class="description-contet">
                        <div class="center-div">

                            <p class="title-description-content"> Tuổi da </p>

                            <p class="content-paragraph"> Tuổi da vào khoảng 30</p>
                        </div>
                    </div>
                </div>
            </div>
      

            <div class="nav-button">
      
                <a href="javascript:void(0)" onclick="openResultPage()"> 
                    <img src="/images/arrow.png"> 
                        Nhận kết quả chi tiết
               </a>
        
        </div>

    </div>

    <div id="News" class="tabcontent">

        <div class="content-tab">
            <div class="column-image">
                <img src="/images/face1.png">

            </div>
            <div class="column-content">

                <div class="description-contet">
                    <div class="center-div">

                        <p class="title-description-content"> Da kết hợp giữa khô và dầu </p>

                        <p class="content-paragraph"> Vùng da nhờn với các vùng da khô</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-button">
      
            <a href="javascript:void(0)" onclick="openResultPage()"> 
                <img src="/images/arrow.png"> 
                    Nhận kết quả chi tiết
           </a>
    
    </div>
    </div>

    <div id="Contact" class="tabcontent">
        <div class="content-tab">
            <div class="column-image">
                <img src="/images/face1.png">

            </div>
            <div class="column-content">

                <div class="description-contet">
                    <div class="center-div">

                        <p class="title-description-content"> Nhận diện tone màu da </p>

                        <p class="content-paragraph"> Màu sắc của da: Vàng</p>
                        <p class="content-paragraph"> Độ sáng màu da: Ngăm đen</p>
                        <p class="content-paragraph">Cấp độ bảng màu quốc tế: 96</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-button">
      
            <a href="javascript:void(0)" onclick="openResultPage()"> 
                <img src="/images/arrow.png"> 
                    Nhận kết quả chi tiết
        </a>
        </div>
    </div>

    <div id="About" class="tabcontent">
        <div class="content-tab">
            <div class="column-image">
                <img src="/images/face1.png">

            </div>
            <div class="column-content">

                <div class="description-contet">
                    <div class="center-div">

                        <p class="title-description-content">Nốt ruồi </p>

                        <p class="content-paragraph"> Số nốt ruồi: 0</p>

                    </div>
                </div>
            </div>
        </div>

        <div class="nav-button">
      
            <a href="/result.html"> 
                <img src="/images/arrow.png"> 
             Nhận kết quả chi tiết
           </a>
    
    </div>
    </div>

   
    <div class="poupupContainer">
        <div class="modalpopup">
    
            <p class="maincontent">
                Chúng tôi muốn bạn có thể dễ dàng nắm bắt mọi thông tin và hiểu hơn trước khi vào sâu chi tiết    
            </p>
            <p class="descriptionContent"> 
                Chúng tôi sẽ chia ra thành các thành phần trong phần tổng quan để bạn nắm rõ một số thứ trước khi chúng ta vào các phần chi tiết, hãy đọc hết tất cả các thành phần tổng quan để rõ hơn nhé.
            </p>
         </div> 
    </div>

   

   

</div>


<script>
    function openPage(pageName, elmnt, color) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(pageName).style.display = "block";
        //   elmnt.style.backgroundColor = color;
    }

   function openResultPage() 
   {
            window.location.href = "/DashuVietNam/ket-qua";
   }
   openPage('Home', this, 'red');
</script>
@endsection