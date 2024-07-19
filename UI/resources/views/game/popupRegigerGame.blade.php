
<style>
 .popupGameResult{
    display:block !important;
 } 
 .popupGameResult .titlepopup {

    color: var(--main_color);
    font-family: var(--font-main);
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    
 }
 .popupGameResult p{
    color: var(--main_color);
    font-family: var(--font-main);
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    
 }
</style>

<div class="status-modal-popupgame" style ="display:none" id ="status-modal-popupgame">
    
    <div class="modal-information">
        <div class="form-information-user" id="formAccountReq">
            <div class="status-loader-22">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>
            <div class="position-close2" onclick="changeFormLogin()">
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

            <div class="status__isLogin">
                <div class="">
                    <div class="flex-a-center">
                        <div class="title_nav popupGameResult" id ="contentPopup">
                           
                        </div>
                    </div>

                    <form class="formReward" id="formLogin" style="overflow: hidden">
                        <div class="form-group">
                            <input name="fullName" type="text" class="my-form-control fullName" id="nameLoginGame"
                                placeholder="Tên của bạn" />

                            <div class="errorMesssage" id="fullNameerrorMesssageGame">
                                Không dược bỏ trống
                            </div>
                        </div>

                        <div class="form-group">
                            <div id="toggleNumber">
                                <input name="phoneNumber" type="text" class="my-form-control userName" id="phoneNumberGame"
                                    placeholder="Số điện thoại của bạn" />
                                <div class="errorMesssage" id="phoneNumbererrorMesssageGame">
                                    Không dược bỏ trống
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div id="togglePassPj">
                                <input name="passwordPj" type="password" class="my-form-control" id="passwordPj"
                                    placeholder="Mật khẩu của bạn" />
                                <div class="errorMesssage" id="passwordPjError">
                                    Không dược bỏ trống
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="button" id="roleReward" onclick="loginGame()" class="btn_form btn-shadow">
                                <p>
                                    Đăng nhập/Đăng ký
                                <p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

         
        </div>
    </div>
</div>

<script>
        function openPopupgame() {

        document.getElementById("status-modal-popupgame").style.display = "block";

        }
</script>