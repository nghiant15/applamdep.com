<div id="box_notify">

</div>
<a href="tel:0906606986" title="" class="left-hotline">
    <strong>0906 606 986</strong>
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
          </svg>
    </span>
</a>

<a href="/zasaly" target="_blank" title="" class=" left-hotline1 left-hotline  "  style="bottom: 200px">
 
    <span style ="width: 70px; height:70px;background: unset !important;">
       <img style="width:100%" src ="/iconskin.png"> 
    </span>
</a>

{{-- <a href="/soida" target="_blank" title="" class=" left-hotline1 left-hotline  "  style="bottom: 300px">
 
    <span style ="width: 70px; height:70px;background: unset !important;">
       <img style="width:100%" src ="/zalo.png"> 
    </span>
</a> --}}

<div id="alert-web">

</div>

<div id="fb-root"></div>

<!-- Your Plugin chat code -->
<div id="fb-customer-chat" class="fb-customerchat">
</div>

<script>
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "106007668343244");
    chatbox.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function() {
        FB.init({
            xfbml: true,
            version: 'v11.0'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>