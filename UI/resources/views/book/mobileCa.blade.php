@if (Session()->has('dataColor'))
@php
$dataColor = session('dataColor', null);
$dataCompany = Cache::get('webinfo');



 $dataCompany_admin                                                                       = Cache::get('webinfo_admin');


$dataSale = session('dataSale', null);
$dataUserSales = session('dataCompany', null);

if($dataColor)                                                                      
{
$dataColor = $dataColor->data;
}

@endphp

@else
@php

@endphp
@endif
<html>
<head>

    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
    <meta property="og:image" content="/images/tikitech_icon.png" />
    <link rel="icon" type="" href="/images/tikitech_icon.png">
    @if (isset($dataCompany))


    @isset($dataCompany->seoInfo->description)
    <meta name="description" content=" 100% Miễn Phí Trọn Đời, Nâng tầm shop mỹ phẩm bạn, với Hệ Thống Soi Da & Tư Vấn Online .Ngay tại nhà, Kiểm tra & tư vấn, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline" />

    @endisset


    @isset($dataCompany->seoInfo->key)

    <meta name="keywords" content="{{ $dataCompany->seoInfo->key }}" />

    @endisset
    @isset($dataCompany->seoInfo->author)

    <meta name="author" content="{{ $dataCompany->seoInfo->author }}">

    @endisset
    @isset($dataCompany->seoInfo->imageShare)
    @endisset
    <title> 100% Miễn Phí Trọn Đời, Nâng tầm shop mỹ phẩm bạn, với Hệ Thống Soi Da & Tư Vấn Online .Ngay tại nhà, Kiểm tra & tư vấn, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline
    </title>
    @endif
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />

    <meta property="og:type" content="article" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/all.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/campaignmobile.css">

    @yield('header')


</head>

<style>

@keyframes example {
  from {color: #ffffff;}
  to {color:    ;}
}
    :root {
        --main_color: #dc3f5d;
    }

    #myVideo {
  
  width: 100%;
  height: auto;
}
</style>

<body>
    @if (Session()->has('dataSale'))
    @include('profile.formCustomer')
    @endif
    @if (Session()->has('dataCompany'))
    @include('profile.update')
    @include('profile.history')
    @include('profile.isVoucher')
    @else
    @include('login.login')

    @endif

  
  
    <div id="alert-web">

    </div>
    <div class="content-page">
          @include("book.header")
          
        <section class="banner_sectionbook">
            <img src ="/bannerbook.png">
        </section>

        <div class ="titlepage">
        <span class= "title1"> KHO SÁCH ONLINE </span> <span>100% DOWLOAD MIỄN PHÍ</span>
    </div>
        <section class ="banner_section3">
        <div class="searchBook">

            <div class ="search-area">
                
                <input type="text" id="txtSearch" name="searchBox"  placeholder="Nhập mã số sách">
                <button onclick="searchBook()"> Tìm kiếm </button>
            </div>
    
      
            

            

    </div>

    <div class ="nav-mobile-cate">
        <span class="right"><a onclick ="opencategoryMobile()">Chọn danh mục sách</a></span><span class="left" id ="nametitle">Sách tiếng anh</span>        
    </div>
        
        <!-- <div class ="bookNavMenubar">

             <a class="fa fa-list nameCategory" >Sách tiếng anh</a><br>
             
    

        </div>
        <div class ="bookNavMenubar">
                <a class ="khac" > Chọn danh mục sách </a>
        </div> -->
        <div class ="bookCategory">
                
                    <p class ="titleCategory">Danh mục</p>
                 
                    <ul> 
                        <li onclick = "getBookData(this, 0)" >Tiếng anh </li>
                        <li onclick = "getBookData(this, 1)" >Nuôi dạy con </li>
                        <li  onclick = "getBookData(this, 2)" >Tạp chí thời trang </li>
                        <li  onclick = "getBookData(this, 3)" >Lý thuyết và sách nói</li>
                        <li  onclick = "getBookData(this, 5)">Tiểu thuyết</li>
                        <li  onclick = "getBookData(this, 6)" >Tryện ngắn</li>
                        <li  onclick = "getBookData(this, 7)">Lịch sử</li>
                        <li  onclick = "getBookData(this, 8)" >Sách văn học</li>
                        <li  onclick = "getBookData(this, 9)" >Sách kinh tế</li>
                        <li  onclick = "getBookData(this, 10)" >Sách thiếu nhi</li>
                        <li  onclick = "getBookData(this, 11)" >Sách kĩ năng sống</li>
                        <li  onclick = "getBookData(this, 12)">Sách bà mẹ- Em bé</li>
                        <li onclick = "getBookData(this, 13)">Sách giáo khoa- giáo trình</li>
                        <li onclick = "getBookData(this, 14)">Sách học ngoại ngữ</li>
                        <li onclick = "getBookData(this, 15)">Sách tham khảo</li>
                        <li onclick = "getBookData(this, 16)">Sách từ điển</li>
                        <li onclick = "getBookData(this, 17)">Sách kiến thức tổng hợp</li>
                        <li onclick = "getBookData(this, 18)">Sách khoa học kỹ thuật</li>
                        <li onclick = "getBookData(this, 19)">Điện ảnh- nhạc - họa</li>
                        <li onclick = "getBookData(this, 20)">Truyện tranh</li>

                        <li onclick = "getBookData(this, 21)">Tôn giáo tâm linh</li>
                        <li onclick = "getBookData(this, 22)">Văn hóa</li>
                        <li onclick = "getBookData(this, 24)">Nông-lâm- ngư nghiệp</li>
                        <li onclick = "getBookData(this, 25)">Công nghệ thông tin</li>
                        <li onclick = "getBookData(this, 26)">Tạp chí- catelogue</li>
                        <li onclick = "getBookData(this, 28)">Tâm lý giới tính</li>
                        <li onclick = "getBookData(this, 29)">Thưởng thức gia đình</li>
                        <li onclick = "getBookData(this, 30)">Thể dục thể thao</li>
                    
                    </ul>
            </div>

        <div class= "bookContainer">
            <div class ="bookCategory">
                    <p class ="titleCategory">Danh mục</p>
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                    <ul> 
                        <li onclick = "getBookData(this, 0)" >Tiếng anh </li>
                        <li onclick = "getBookData(this, 1)" >Nuôi dạy con </li>
                        <li  onclick = "getBookData(this, 2)" >Tạp chí thời trang </li>
                        <li  onclick = "getBookData(this, 3)" >Lý thuyết và sách nói</li>
                        <li  onclick = "getBookData(this, 5)">Tiểu thuyết</li>
                        <li  onclick = "getBookData(this, 6)" >Tryện ngắn</li>
                        <li  onclick = "getBookData(this, 7)">Lịch sử</li>
                        <li  onclick = "getBookData(this, 8)" >Sách văn học</li>
                        <li  onclick = "getBookData(this, 9)" >Sách kinh tế</li>
                        <li  onclick = "getBookData(this, 10)" >Sách thiếu nhi</li>
                        <li  onclick = "getBookData(this, 11)" >Sách kĩ năng sống</li>
                        <li  onclick = "getBookData(this, 12)">Sách bà mẹ- Em bé</li>
                        <li onclick = "getBookData(this, 13)">Sách giáo khoa- giáo trình</li>
                        <li onclick = "getBookData(this, 14)">Sách học ngoại ngữ</li>
                        <li onclick = "getBookData(this, 15)">Sách tham khảo</li>
                        <li onclick = "getBookData(this, 16)">Sách từ điển</li>
                        <li onclick = "getBookData(this, 17)">Sách kiến thức tổng hợp</li>
                        <li onclick = "getBookData(this, 18)">Sách khoa học kỹ thuật</li>
                        <li onclick = "getBookData(this, 19)">Điện ảnh- nhạc - họa</li>
                        <li onclick = "getBookData(this, 20)">Truyện tranh</li>

                        <li onclick = "getBookData(this, 21)">Tôn giáo tâm linh</li>
                        <li onclick = "getBookData(this, 22)">Văn hóa</li>
                        <li onclick = "getBookData(this, 24)">Nông-lâm- ngư nghiệp</li>
                        <li onclick = "getBookData(this, 25)">Công nghệ thông tin</li>
                        <li onclick = "getBookData(this, 26)">Tạp chí- catelogue</li>
                        <li onclick = "getBookData(this, 28)">Tâm lý giới tính</li>
                        <li onclick = "getBookData(this, 29)">Thưởng thức gia đình</li>
                        <li onclick = "getBookData(this, 30)">Thể dục thể thao</li>
                    
                    </ul>
            </div>
            <div class ="bookData"> 
            
 

    <div class ="bookdisplay booksearchResult"  >
        <h6>KẾT QUẢ TÌM KIẾM </h6> 

        <div class="databook " id = "dataBook0Search">

        </div>

    </div>

    <div class ="bookdisplay booksearchNoFound"  >
        <span class ="p1">Không tìm thấy sách có mã sách tương ứng, Vui lòng thử lại mã </span>  <br>
        <span class ="p2" > Hoặc </span>  <br>
        <a onclick= "resetSearch()"> Tìm lại sách </a>
    

    </div>


    <div class ="bookdisplay bookdisplay1"  >
<div class="databook" id = "dataBook0">
</div>
</div>

<div class ="viewpdf">
<a class ="btnBack" onclick="backToHomePage()" style ="color: var(--main_color) !important;background-color: transparent;font-weight: bolder;text-decoration: underline !important;"> 
Danh mục sách
</a>


</div>

<div class ="viewpdf">

<div class="display-title">
  <p class="title" id ="titleid">KHÔNG CÓ GÌ CHẾT ĐI BAO GIỜ </p>
  <p class="title1" id ="title1id" >Việt nam và ký ức chiến tranh </p>
  <p class="author" id ="authorid">   NGUYỄN THANH VIỆT</p>
</div>
<div>
<div id="pdfviewer"></div>



</div>

        
           </div>
        
        </div>
      </section>
     

    
    </div>
    @include('book.footer')
    @include('book.layout')
    <div class="status-backToTop-campaign">
        <div class="back-to-top-campaign" onclick="BackToTop()">
            <div class="flex-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z">
                    </path>
                </svg>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/contant.js"></script>
    <script src="/js/campaign/bannerCampaignHome.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/general.js"></script>

    <script src="/js/login.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
    <script>
        setTimeout(() => {
            hideIntroSkinCare();
        }, 10000);
        function hideIntroSkinCare(){
            $('.intro__skin-care').hide();
        }
        function renderCarousel2() {
            let data = {!!json_encode($dataGlobal->bannerSmall) !!};
        var li = ``;
        var itemCarousel = ``;
        var html = ``;
        data.forEach((item, i) => {
      
            var imageLink = "https://api-soida.applamdep.com/public/image_brand/" +item.image_link;
        if (i === 0) {
        li +=
        `<li data-target="#carouselExampleIndicators2" data-slide-to=${i} class="active"></li>`;
        } else {
        li += `<li data-target="#carouselExampleIndicators2" data-slide-to=${i}></li>`;
        };

        if (i === 0) {
        itemCarousel += `
        <div class="carousel-item banner-box-img active  ">
            <a href=${item.hrefLink} target="_blank">        
                <div class="bg-image banner-box-img" style= "background-size: contain; background-image:url('${imageLink}')">
                
                </div>
            </a>
        </div>
        `;
        } else {
        itemCarousel += `
        <div class="carousel-item banner-box-img  ">
     
            <a href=${item.href} target="_blank" >     
                <div class="banner-box-img bg-image"  style="background-size: contain; background-image:url('${imageLink}')">
    
                </div>
            </a>
        </div>

        `;
        };
        });
        html += `
        <ol class="carousel-indicators carousel-indicators1">
            ${li}
        </ol>
        <div class="carousel-inner" style='border-radius:15px'>
            ${itemCarousel}
        </div>
        

        `
        let idRender = document.querySelector(".classRenderCarousel2");

        if (idRender) {
        idRender.innerHTML = html;
        }
    }
    renderCarousel2();
    function renderCarousel1() {
        return;
        let data = {!!json_encode($dataGlobal->bannermain) !!};
        var li = ``;
        var itemCarousel = ``;
        var html = ``;
        data.forEach((item, i) => {
           

        var imageLink = "https://api-soida.applamdep.com/public/image_brand/" +item.image_link;
        if (i === 0) {
        li +=
        `<li data-target="#carouselExampleIndicators1" data-slide-to=${i} class="active"></li>`;
        } else {
        li += `<li data-target="#carouselExampleIndicators1" data-slide-to=${i}></li>`;
        };

        if (i === 0) {
        itemCarousel += `
        <div class="carousel-item carousel-item-banner1 active banner1-box-img ">
            <a href=${item.hrefLink} target="_blank">
                <div class="bg-image carousel-item-banner1" style="background-image:url('${imageLink}')">
                        
                </div>
            </a>
        </div>
        `;
        } else {
        itemCarousel += `
        <div class="carousel-item carousel-item-banner1 banner1-box-img">
            <a href=${item.hrefLink} target="_blank">
                <div class=" carousel-item-banner1  bg-image" style="background-image:url('${imageLink}')">
            

                </div>
            </a>
        </div>

        `;
        };
        });
        html += `
        <ol class="carousel-indicators carousel-indicators1 carousel-indicators2">
            ${li}
        </ol>
        <div class="carousel-inner">
            ${itemCarousel}
        </div>
        <a class="carousel-control-prev a-none-hover" href="#carouselExampleIndicators1" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next a-none-hover" href="#carouselExampleIndicators1" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        `
        let idRender = document.querySelector(".classRenderCarousel1");

        if (idRender) {
        idRender.innerHTML = html;
        }
    }
    renderCarousel1();

    $('.carousel').carousel({
        interval: 2000
    });
    async function callApiWeb(){
 
    // await getAllCampaign("renderBanner-new", "1");
   
    };


    var dataWeb = {!!json_encode($dataGlobal) !!};
    // callApiWeb();
        
    
function skinSoida() {

// $(".bookdisplay").hide();
// $(".bg-smoke").hide();
// $(".viewpdf").hide();
// $(".bg-smoke").hide();
// $("#b-placeholder").show();
// hideTips();
// $(".bg-light").hide();
// haldleOpenCamera();



}
function showsearchResult()
{
     $(".bookdisplay1").hide();
    setTimeout(() => {
        $(".booksearchResult").show(); 
    }, 1000);

}

function shownotFoundSearch()
{
        $(".bookdisplay1").hide();
    setTimeout(() => {
        $(".booksearchNoFound").show();
    }, 1000);

}
function resetSearch() {
    $(".booksearchResult").hide();
    $(".booksearchNoFound").hide();
    $(".booksearchResult").hide();

    $("#txtSearch").val('');
    $(".bookdisplay1").show();
    $(".bookData").css("width","84%");
    $(".bookCategory").show();
;}
function openBook(itembook)
{  
    
    return;
    var linkhref = itembook.linkFiePdf;
    sessionStorage.setItem("linkhref", linkhref);
    var titleTemp=  itembook.title;
    var title1Temp=  itembook.title2;
    var authorTemp=  itembook.author;

    if(titleTemp != "")
    {
        $("#titleid").text(titleTemp);
    }
    else 
    {
        $("#titleid").hide();
    }

    if(title1Temp != "")
    {
        $("#title1id").text(title1Temp);
    }
    else 
    {
        $("#title1id").hide();
    }

    if(authorTemp != "")
    {
        $("#authorid").text(authorTemp);
    }
    else 
    {
        $("#authorid").hide();
    }
    $(".bookdisplay").hide();
    
    $(".bg-smoke").hide();

    adobeDCView.previewFile(
    {
        content:  {location: {url: linkhref}},
        metaData: {fileName: itembook.title}
    });

    setTimeout(() => {
        $(".viewpdf").show();
        $(".bg-smoke").show();
        $(".bg-light").show();
        
    }, 2000);
}


function backToHomePage()
{      $(".viewpdf").hide();
        $(".bg-light").hide();
        $(".bg-smoke").hide();
   
            setTimeout(() => {
                
            $(".bookdisplay").show();
            $(".bg-smoke").show();

        
                
            }, 500);

}

function searchBook () { 

   var inputsearch =  $("#txtSearch").val();

   if(inputsearch.length < 1)
   {
     getAllBook();
     return;

    // return;
   }
   searchItems(inputsearch);

}


function searchItems(searchCode,turnon =true ) 
{
    $.ajax({
                type: "GET",
                url: "https://api-soida.applamdep.com/api/book/fe/getAll",
                data:{
                 
                    code: searchCode
                },
             
              
                complete: function(data) {
                  
                    if(turnon ==true)
                    {
                            Swal.fire({
                            title: 'Đang tìm sách...',
                            html: 'Vui lòng chờ...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                            Swal.showLoading()
                            }
                            });
                    }
                  
                    $("#dataBook0Search").empty();
                
                   
                    var dataDraw = data.responseJSON.data;

                   
                    for (let i = 0; i < dataDraw.length; i++) {
                         let itemBook = dataDraw[i];
                         var imagecover =  itemBook.linkCover;
                         var  title = itemBook.title;
                         var linkFile = itemBook.linkFiePdf;

                         var hrefLink = " /book/"+ itemBook.slug;
                         
                         var stringifiedObj = JSON.stringify(itemBook);
                         let div1 =  document.createElement('div');
                         div1.className = "book-item";
                         div1.innerHTML = ' <a href="'+hrefLink+'"><img src ="'+imagecover+'"/></a>   <a class="titlenava" href="'+hrefLink+'" ><p>'+title+' </p></a>';
                         div1.onclick = 

                         div1.addEventListener( 'click', function(event){
                           
                            doSomething(event,itemBook);
                        }, false );

                        function doSomething(event, greeting) {
                             openBook(greeting);
                        
                        }
                         $("#dataBook0Search").append(div1);
                         
                    }
                    // $(".bookCategory").hide();
                    // $(".bookData").css("width","100%");
                    $(".nav-mobile-cate").hide();
                    if(dataDraw.length <1)
                     {
                        shownotFoundSearch();
                     }
                     else {
                        showsearchResult();
                     }
                    setTimeout(() => {
                        swal.close();
                        
                    }, 1000);
                

                },
            });

          


        }


function getAllBook(type =0, turnon = true) 
{
    $.ajax({
                type: "GET",
                url: "https://api-soida.applamdep.com/api/book/fe/getAll",
                data:{
                 
                    Type: type
                },
             
              
                complete: function(data) {
                  
                    if(turnon ==true)
                    {
                            Swal.fire({
                            title: 'Đang lấy dữ liệu...',
                            html: 'Vui lòng chờ...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                            Swal.showLoading()
                            }
                            });
                    }
                  
                    $("#dataBook0").empty();
                
                   
                    var dataDraw = data.responseJSON.data;
                    for (let i = 0; i < dataDraw.length; i++) {
                         let itemBook = dataDraw[i];
                         var imagecover =  itemBook.linkCover;
                         var  title = itemBook.title;
                         var codeBook = itemBook.code;
                         var linkFile = itemBook.linkFiePdf;

                         var hrefLink = " /book/"+ itemBook.slug;
                         
                         var stringifiedObj = JSON.stringify(itemBook);
                         let div1 =  document.createElement('div');
                         div1.className = "book-item";
                         div1.innerHTML = ' <a href="'+hrefLink+'"><img src ="'+imagecover+'"/></a>   <a class="titlenava" href="'+hrefLink+'" ><p>'+ codeBook+ ': '+title+' </p></a>';
                         div1.onclick = 

                         div1.addEventListener( 'click', function(event){
                           
                            doSomething(event,itemBook);
                        }, false );

                        function doSomething(event, greeting) {
                             openBook(greeting);
                        
                        }
                         $("#dataBook0").append(div1);
                         
                    }
                    setTimeout(() => {
                        swal.close();
                        
                    }, 1000);
                

                },
            });

          


        }

var typeInput= 0;
function getData(type)
{
   
    if(typeInput != type)
    {
        typeInput = type;
        getAllBook(type,true);

        
    }
  
}

function getBookData(element, type) {
    var textcontent = element.textContent;
    $("#nametitle").text(textcontent);

    
    
     $( ".bookCategory li" ).removeClass( "activemenu" );
     element.className ="activemenu";
     getData(type);
     setTimeout(() => {
              $(".bookCategory").hide();
     }, 1000);
}
window.addEventListener('load', function () {

   
    getAllBook(0, true);
   
})

document.addEventListener("adobe_dc_view_sdk.ready", function()
   {
      adobeDCView = new AdobeDC.View({clientId: "f2ca61bb930e452f94e2a43f779e5261", divId: "pdfviewer"});
     
   });

   function closeNav() {
    $(".bookCategory").hide();
   }

   function opencategoryMobile() {

        $(".bookCategory").show();
   }
    </script>
</body>

</html>