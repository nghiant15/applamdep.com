


    
    <div class="modal-information"  id="popupGame" style ="display:none" >
        <div class="form-information-user" >
            <div class="status-loader-22">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>
            <div class="position-close2">
                <svg viewBox="0 0 24 24"  onclick="CloseFormPopupGame()"  size="24" class="sc-11csm01-0 fivNSm">
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


            <div class="form-login-account popupgamedisplay">
            
        

           <h6>Chúc mừng bạn đã trúng thưởng </h6>

           <p>Xin vui lòng Đăng ký/Đăng nhập  </p>
           <p>Để chúng tôi liên hệ trả thưởng sớm  </p>

            <form id="formRegister" class="formReward">
                            <div class="form-group">
                                <input type="text" class="my-form-control userName" id="fullNamePoupGame"
                                    placeholder="Tên của bạn" name="name" />
                                <div id="fullNamePoupGameError" class="errorReward">
                                    Bạn chưa nhập tên của bạn
                                </div>
                            </div>

                            <div class="form-group">
                                <input type="text" class="my-form-control phoneNumber" id="phoneNumberPoupGame"
                                    placeholder="Số điện thoại của bạn" required />

                                <div id="phoneNumberPoupGameErro" class="errorReward">
                                     Bạn chưa nhập số điện thoại tương ứng hoặc không hợp lệ
                                </div>
                            </div>

                            <div class="mt-4">
                                <button type="button" class="btn_form btn-shadow" onclick="registerGame()">
                                    <p>Tiếp tục</p>
                                </button>
                            </div>

                          

                           
                        </form>
                </div>
            </div>
    </div>



