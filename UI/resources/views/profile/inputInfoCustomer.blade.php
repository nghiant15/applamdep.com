<div class="status-modal-inputUser">
    <div class="flex-item-center">
        <div class="modal-information">
            <div class="form-information-user">
                <div class="status_form_isInfo">
                    <div class="flex-a-center">
                        <svg onclick="changeFormInfo()" class="mr-5" width="14" height="23" viewBox="0 0 11 18"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.8" x2="12.0094" y2="-0.8"
                                transform="matrix(0.707659 -0.706554 0.707659 0.706554 2.00146 10.4853)"
                                stroke="var(--main_color)" stroke-width="1.6" />
                            <line y1="-0.8" x2="12.0094" y2="-0.8"
                                transform="matrix(0.706734 0.707479 -0.706734 0.707479 1 9.41422)"
                                stroke="var(--main_color)" stroke-width="1.6" />
                        </svg>

                        <div class="title_nav">
                            <h6>Thông tin người dùng </h6>

                        </div>

                    </div>
                    <div class="form-input  mt-3">
                        <form id="frmUpdateUser">


                            <div class="form-group">
                                <input type="text" value="{{ $dataUser->name }}" name="fullName" class="my-form-control"
                                    id="myNameInfo" placeholder="Họ và tên" />
                                <div id="myNameInfoError" class="errorReward">
                                    Họ và tên không được bỏ trống?.
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" readonly name="phoneNumber" class="my-form-control"
                                    id="idphoneNumber" placeholder="Số điện liên lạc" value="{{ $dataUser->phone }}" />

                                <div id="idphoneNumberError" class="errorReward">
                                    Số điện thoại không được bỏ trống.
                                </div>
                            </div>
                            <div class="form-group">

                                <input type="text" name="email" class="my-form-control" id="emailInfo"
                                    placeholder="Địa chỉ E-mail" value="{{ $dataUser->email }}" />
                            </div>
                            <div class="form-group">

                                <input type="text" name="addressHome" class="my-form-control"
                                    value="{{$dataUser->addressHome}}" placeholder="Địa chỉ(nếu có)" />
                            </div>
                            
                            <div class="form-group">

                                <input type="text" name="introduction" value="{{ $dataUser->introduction }}"
                                    class="my-form-control " placeholder="Ghi chú" />
                            </div>
                          
                            <div class="mt-4">

                                <button type="button" class="btn_form" id="btnRewardClick" onclick="updateInfoUser()">

                                    <p>Cập nhật tài khoản</p>
                                </button>
                           
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>