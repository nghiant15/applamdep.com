<div class="status-modal-inputUser">
    <div class="flex-item-center">
        <div class="modal-information">
            <div class="form-information-user">
                <div class="flex-a-center">

                    <svg onclick="ToggleDisplayClass('.status-modal-inputUser',false)" class="mr-5" width="14"
                        height="23" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-0.8" x2="12.0094" y2="-0.8"
                            transform="matrix(0.707659 -0.706554 0.707659 0.706554 2.00146 10.4853)"
                            stroke="var(--main_color)" stroke-width="1.6" />
                        <line y1="-0.8" x2="12.0094" y2="-0.8"
                            transform="matrix(0.706734 0.707479 -0.706734 0.707479 1 9.41422)"
                            stroke="var(--main_color)" stroke-width="1.6" />
                    </svg>
                    <div class="title_nav">
                        <h6>Thông tin khách hàng </h6>
                    </div>
                </div>
                <div class="form-input  mt-3">
                    <form id="frmUpdateUser">
                        <div class="form-group">
                            <input type="text" name="fullName" class="my-form-control" id="inputNameUser"
                                placeholder="Họ tên" />
                            <div id="inputNameUserError" class="errorReward">
                                Họ và tên không được bỏ trống?.
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" name="phoneNumber" class="my-form-control" id="inputNumberUser"
                                placeholder="Số điện liên lạc" />

                            <div id="inputNumberUserError" class="errorReward">
                                Số điện thoại không được bỏ trống.
                            </div>
                        </div>
                        <div class="form-group">

                            <input type="text" name="email" class="my-form-control" id="inputEmailUser"
                                placeholder="Địa chỉ E-mail" />
                        </div>

                    </form>
                    <div class="">
                        <button id="" type="button" style="background:var(--main_color)" class="btn_form"
                            onclick="CreateAccount_Pg()">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="6.71752" y1="3.18195" x2="3.18199" y2="6.71749" stroke="white" />
                                <line x1="6.71752" y1="3.88906" x2="3.18199" y2="0.353527" stroke="white" />
                            </svg>
                            <p>
                                Soi da ngay
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>