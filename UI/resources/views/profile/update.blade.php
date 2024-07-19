@if (Session()->has('dataCompany'))

<div class="status-modal-information">
    <div class="flex-item-center">
        <div class="modal-information">
            <div class="form-information-user">
                <div class="status-loader-22-info">
                    <div class="border-loading-spin">
                        <svg class="loading-spin" viewBox="0 0 100 100">
                            <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                        </svg>
                    </div>
                </div>
                <div class="status_form_isInfo">
                    <div class="flex-a-center">
                        <div class="title_nav">
                            <h6>
                                @if(isset($dataCompany->form->titleUpdate))
                                {{ $dataCompany->form->titleUpdate }}
                                @else
                                THÔNG TIN CÁ NHÂN
                                @endif
                                
                            </h6>
                            <div class="position-close2" onclick="changeFormInfo()">
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

                        </div>

                    </div>
                    <div class="form-input  mt-3">
                        <form id="frmUpdateUser" class="formReward">


                            <div class="form-group">
                                @if (isset($dataUser->name))
                                <input type="text" value="{{ $dataUser->name }}" name="fullName" class="my-form-control"
                                    id="myNameInfo" placeholder="Họ và tên" />
                                @else
                                <input type="text" name="fullName" class="my-form-control" id="myNameInfo"
                                    placeholder="Họ và tên" />
                                @endif

                                <div id="myNameInfoError" class="errorReward">
                                    Họ và tên không được bỏ trống?.
                                </div>
                            </div>
                            <div class="form-group">
                                @if (isset($dataUser->phone))
                                <input type="text" name="phoneNumber" class="my-form-control" id="idphoneNumber"
                                    placeholder="Số điện liên lạc" readonly disable value="{{ $dataUser->phone }}" />
                                @else
                                <input type="text" name="phoneNumber" readonly disable class="my-form-control" id="idphoneNumber"
                                    placeholder="Số điện liên lạc" />
                                @endif


                                <div id="idphoneNumberError" class="errorReward">
                                    Số điện thoại không được bỏ trống.
                                </div>
                            </div>
                            <div class="form-group">
                                @if (isset($dataUser->email))
                                <input type="text" name="email" class="my-form-control" id="emailInfo"
                                    placeholder="Địa chỉ E-mail" value="{{ $dataUser->email }}" />
                                @else
                                <input type="text" name="email" class="my-form-control" id="emailInfo"
                                    placeholder="Địa chỉ E-mail" />
                                @endif

                            </div>
                            <div class="form-group">
                                @if (isset($dataUser->addressHome))
                                <input type="text" name="addressHome" class="my-form-control"
                                    value="{{$dataUser->addressHome}}" placeholder="Địa chỉ (nếu có)" />
                                @else
                                <input type="text" name="addressHome" class="my-form-control"
                                    placeholder="Địa chỉ(nếu có)" />
                                @endif

                            </div>

                            <div class="form-group">
                                @if (isset($dataUser->introduction))
                                <input type="text" name="introduction" value="{{ $dataUser->introduction }}"
                                    class="my-form-control " placeholder="Ghi chú" />
                                @else
                                <input type="text" name="introduction" class="my-form-control " placeholder="Ghi chú" />
                                @endif

                            </div>

                            <div class="mt-4">

                                <button type="button" class="btn_form btn-shadow" onclick="updateInfoUser()">

                                    <p>
                                        @if(isset($dataCompany->form->btn_update))
                                        {{ $dataCompany->form->btn_update }}
                                        @else
                                        Cập nhật tài khoản
                                        @endif
                                    </p>
                                </button>

                            </div>


                        </form>
                    </div>
                </div>
                <div class="status_form_isChangePass">
                    <div class="flex">

                        <svg class="mr-5" onclick="toChangeInfo()" width="11" height="18" viewBox="0 0 11 18"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.8" x2="12.0094" y2="-0.8"
                                transform="matrix(0.707659 -0.706554 0.707659 0.706554 2.00146 10.4853)"
                                stroke="var(--main_color)" stroke-width="1.6" />
                            <line y1="-0.8" x2="12.0094" y2="-0.8"
                                transform="matrix(0.706734 0.707479 -0.706734 0.707479 1 9.41422)"
                                stroke="var(--main_color)" stroke-width="1.6" />
                        </svg>


                        <div class="title_nav">
                            <h6>Thay đổi mật khẩu</h6>

                        </div>
                    </div>
                    <div class="form-input  mt-3">
                        <form id="frmUpdateUser">

                            <div class="form-group">
                                <div style="position: relative;">
                                    <input type="password" class="my-form-control" id="old_pass"
                                        placeholder="Nhập mật khẩu cũ" />
                                    <div class="eye__form-login">
                                        <svg id="hidePassOld" onclick="showPassOld()" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"
                                            class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M12 7.91667C11.632 7.92271 11.2667 7.98409 10.9153 8.09896C11.0778 8.39913 11.1644 8.73804 11.1667 9.08333C11.1667 9.35145 11.1164 9.61694 11.0187 9.86465C10.9209 10.1124 10.7777 10.3374 10.5971 10.527C10.4166 10.7166 10.2022 10.867 9.96632 10.9696C9.73041 11.0722 9.47757 11.125 9.22222 11.125C8.89336 11.1226 8.57059 11.0317 8.28471 10.861C8.05917 11.6824 8.08546 12.5574 8.35985 13.3622C8.63425 14.1669 9.14284 14.8607 9.8136 15.3451C10.4843 15.8295 11.2832 16.08 12.0971 16.0612C12.911 16.0424 13.6987 15.7551 14.3484 15.2402C14.9982 14.7252 15.4772 14.0086 15.7176 13.192C15.958 12.3753 15.9475 11.4999 15.6877 10.6898C15.428 9.87968 14.932 9.17593 14.2702 8.67823C13.6083 8.18052 12.8141 7.91409 12 7.91667ZM21.8792 11.4677C19.9962 7.61005 16.2684 5 12 5C7.73159 5 4.00276 7.61188 2.12081 11.4681C2.04138 11.633 2 11.8153 2 12.0002C2 12.185 2.04138 12.3673 2.12081 12.5323C4.0038 16.3899 7.73159 19 12 19C16.2684 19 19.9972 16.3881 21.8792 12.5319C21.9586 12.3669 22 12.1847 22 11.9998C22 11.815 21.9586 11.6327 21.8792 11.4677ZM12 17.25C8.57465 17.25 5.43436 15.2448 3.73853 12C5.43436 8.75521 8.5743 6.75 12 6.75C15.4257 6.75 18.5656 8.75521 20.2615 12C18.566 15.2448 15.4257 17.25 12 17.25Z">
                                            </path>
                                        </svg>
                                        <svg id="showPassOld" onclick="showPassOld()" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"
                                            class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M22.7934 19.5586L2.2378 3.1234C2.18142 3.07723 2.1167 3.04287 2.04733 3.02229C1.97797 3.0017 1.90532 2.99529 1.83354 3.00342C1.76175 3.01154 1.69223 3.03406 1.62895 3.06966C1.56567 3.10527 1.50987 3.15327 1.46473 3.21094L1.12099 3.65004C1.07574 3.70772 1.04206 3.77397 1.02187 3.84498C1.00168 3.91599 0.995384 3.99037 1.00333 4.06388C1.01128 4.13738 1.03333 4.20856 1.0682 4.27334C1.10308 4.33812 1.1501 4.39523 1.20658 4.44141L21.7622 20.8766C21.8186 20.9228 21.8833 20.9571 21.9527 20.9777C22.022 20.9983 22.0947 21.0047 22.1665 20.9966C22.2382 20.9885 22.3078 20.9659 22.371 20.9303C22.4343 20.8947 22.4901 20.8467 22.5353 20.7891L22.879 20.35C22.9243 20.2923 22.9579 20.226 22.9781 20.155C22.9983 20.084 23.0046 20.0096 22.9967 19.9361C22.9887 19.8626 22.9667 19.7914 22.9318 19.7267C22.8969 19.6619 22.8499 19.6048 22.7934 19.5586ZM11.2022 8.14934L15.8354 11.8541C15.7591 9.74684 14.0789 8.0625 12 8.0625C11.7318 8.06301 11.4644 8.09212 11.2022 8.14934ZM12.7978 15.851L8.16455 12.1462C8.24121 14.2532 9.92141 15.9375 12 15.9375C12.2681 15.9369 12.5355 15.9079 12.7978 15.851ZM12 6.9375C15.391 6.9375 18.4998 8.87109 20.1786 12C19.7671 12.7701 19.2586 13.4816 18.6661 14.1164L19.9634 15.1535C20.6857 14.3633 21.2976 13.4747 21.7818 12.5129C21.8604 12.3538 21.9014 12.1781 21.9014 11.9998C21.9014 11.8216 21.8604 11.6458 21.7818 11.4867C19.916 7.76684 16.2256 5.25 12 5.25C10.7385 5.25 9.53504 5.49609 8.40345 5.91129L9.99875 7.18711C10.6498 7.03594 11.3166 6.9375 12 6.9375ZM12 17.0625C8.60901 17.0625 5.50057 15.1289 3.82141 12C4.23347 11.23 4.74254 10.5185 5.33558 9.88395L4.03831 8.84684C3.31616 9.63697 2.70435 10.5255 2.22027 11.4871C2.14163 11.6462 2.10066 11.8219 2.10066 12.0002C2.10066 12.1784 2.14163 12.3542 2.22027 12.5133C4.08437 16.2332 7.77475 18.75 12 18.75C13.2615 18.75 14.465 18.5021 15.5965 18.0887L14.0013 16.8132C13.3502 16.9641 12.6837 17.0625 12 17.0625Z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div id="old_passError" class="errorReward">
                                    Hãy nhập mật khẩu cũ
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="position: relative">
                                    <input type="password" class="my-form-control" id="new_pass"
                                        placeholder="Nhập mật khẩu mới" />
                                    <div class="eye__form-login">
                                        <svg id="hidePassNew" onclick="showPassNew()" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"
                                            class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M12 7.91667C11.632 7.92271 11.2667 7.98409 10.9153 8.09896C11.0778 8.39913 11.1644 8.73804 11.1667 9.08333C11.1667 9.35145 11.1164 9.61694 11.0187 9.86465C10.9209 10.1124 10.7777 10.3374 10.5971 10.527C10.4166 10.7166 10.2022 10.867 9.96632 10.9696C9.73041 11.0722 9.47757 11.125 9.22222 11.125C8.89336 11.1226 8.57059 11.0317 8.28471 10.861C8.05917 11.6824 8.08546 12.5574 8.35985 13.3622C8.63425 14.1669 9.14284 14.8607 9.8136 15.3451C10.4843 15.8295 11.2832 16.08 12.0971 16.0612C12.911 16.0424 13.6987 15.7551 14.3484 15.2402C14.9982 14.7252 15.4772 14.0086 15.7176 13.192C15.958 12.3753 15.9475 11.4999 15.6877 10.6898C15.428 9.87968 14.932 9.17593 14.2702 8.67823C13.6083 8.18052 12.8141 7.91409 12 7.91667ZM21.8792 11.4677C19.9962 7.61005 16.2684 5 12 5C7.73159 5 4.00276 7.61188 2.12081 11.4681C2.04138 11.633 2 11.8153 2 12.0002C2 12.185 2.04138 12.3673 2.12081 12.5323C4.0038 16.3899 7.73159 19 12 19C16.2684 19 19.9972 16.3881 21.8792 12.5319C21.9586 12.3669 22 12.1847 22 11.9998C22 11.815 21.9586 11.6327 21.8792 11.4677ZM12 17.25C8.57465 17.25 5.43436 15.2448 3.73853 12C5.43436 8.75521 8.5743 6.75 12 6.75C15.4257 6.75 18.5656 8.75521 20.2615 12C18.566 15.2448 15.4257 17.25 12 17.25Z">
                                            </path>
                                        </svg>
                                        <svg id="showPassNew" onclick="showPassNew()" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"
                                            class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M22.7934 19.5586L2.2378 3.1234C2.18142 3.07723 2.1167 3.04287 2.04733 3.02229C1.97797 3.0017 1.90532 2.99529 1.83354 3.00342C1.76175 3.01154 1.69223 3.03406 1.62895 3.06966C1.56567 3.10527 1.50987 3.15327 1.46473 3.21094L1.12099 3.65004C1.07574 3.70772 1.04206 3.77397 1.02187 3.84498C1.00168 3.91599 0.995384 3.99037 1.00333 4.06388C1.01128 4.13738 1.03333 4.20856 1.0682 4.27334C1.10308 4.33812 1.1501 4.39523 1.20658 4.44141L21.7622 20.8766C21.8186 20.9228 21.8833 20.9571 21.9527 20.9777C22.022 20.9983 22.0947 21.0047 22.1665 20.9966C22.2382 20.9885 22.3078 20.9659 22.371 20.9303C22.4343 20.8947 22.4901 20.8467 22.5353 20.7891L22.879 20.35C22.9243 20.2923 22.9579 20.226 22.9781 20.155C22.9983 20.084 23.0046 20.0096 22.9967 19.9361C22.9887 19.8626 22.9667 19.7914 22.9318 19.7267C22.8969 19.6619 22.8499 19.6048 22.7934 19.5586ZM11.2022 8.14934L15.8354 11.8541C15.7591 9.74684 14.0789 8.0625 12 8.0625C11.7318 8.06301 11.4644 8.09212 11.2022 8.14934ZM12.7978 15.851L8.16455 12.1462C8.24121 14.2532 9.92141 15.9375 12 15.9375C12.2681 15.9369 12.5355 15.9079 12.7978 15.851ZM12 6.9375C15.391 6.9375 18.4998 8.87109 20.1786 12C19.7671 12.7701 19.2586 13.4816 18.6661 14.1164L19.9634 15.1535C20.6857 14.3633 21.2976 13.4747 21.7818 12.5129C21.8604 12.3538 21.9014 12.1781 21.9014 11.9998C21.9014 11.8216 21.8604 11.6458 21.7818 11.4867C19.916 7.76684 16.2256 5.25 12 5.25C10.7385 5.25 9.53504 5.49609 8.40345 5.91129L9.99875 7.18711C10.6498 7.03594 11.3166 6.9375 12 6.9375ZM12 17.0625C8.60901 17.0625 5.50057 15.1289 3.82141 12C4.23347 11.23 4.74254 10.5185 5.33558 9.88395L4.03831 8.84684C3.31616 9.63697 2.70435 10.5255 2.22027 11.4871C2.14163 11.6462 2.10066 11.8219 2.10066 12.0002C2.10066 12.1784 2.14163 12.3542 2.22027 12.5133C4.08437 16.2332 7.77475 18.75 12 18.75C13.2615 18.75 14.465 18.5021 15.5965 18.0887L14.0013 16.8132C13.3502 16.9641 12.6837 17.0625 12 17.0625Z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div id="new_passError" class="errorReward">
                                    Hãy nhập mật khẩu mới
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="position: relative">
                                    <input type="password" class="my-form-control" id="reNew_pass"
                                        placeholder="Nhập lại mật khẩu mới" />
                                    <div class="eye__form-login">
                                        <svg id="hideReNewPass" onclick="showReNewPass()"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px"
                                            width="24px" viewBox="0 0 24 24" class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M12 7.91667C11.632 7.92271 11.2667 7.98409 10.9153 8.09896C11.0778 8.39913 11.1644 8.73804 11.1667 9.08333C11.1667 9.35145 11.1164 9.61694 11.0187 9.86465C10.9209 10.1124 10.7777 10.3374 10.5971 10.527C10.4166 10.7166 10.2022 10.867 9.96632 10.9696C9.73041 11.0722 9.47757 11.125 9.22222 11.125C8.89336 11.1226 8.57059 11.0317 8.28471 10.861C8.05917 11.6824 8.08546 12.5574 8.35985 13.3622C8.63425 14.1669 9.14284 14.8607 9.8136 15.3451C10.4843 15.8295 11.2832 16.08 12.0971 16.0612C12.911 16.0424 13.6987 15.7551 14.3484 15.2402C14.9982 14.7252 15.4772 14.0086 15.7176 13.192C15.958 12.3753 15.9475 11.4999 15.6877 10.6898C15.428 9.87968 14.932 9.17593 14.2702 8.67823C13.6083 8.18052 12.8141 7.91409 12 7.91667ZM21.8792 11.4677C19.9962 7.61005 16.2684 5 12 5C7.73159 5 4.00276 7.61188 2.12081 11.4681C2.04138 11.633 2 11.8153 2 12.0002C2 12.185 2.04138 12.3673 2.12081 12.5323C4.0038 16.3899 7.73159 19 12 19C16.2684 19 19.9972 16.3881 21.8792 12.5319C21.9586 12.3669 22 12.1847 22 11.9998C22 11.815 21.9586 11.6327 21.8792 11.4677ZM12 17.25C8.57465 17.25 5.43436 15.2448 3.73853 12C5.43436 8.75521 8.5743 6.75 12 6.75C15.4257 6.75 18.5656 8.75521 20.2615 12C18.566 15.2448 15.4257 17.25 12 17.25Z">
                                            </path>
                                        </svg>
                                        <svg id="showReNewPass" onclick="showReNewPass()"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px"
                                            width="24px" viewBox="0 0 24 24" class="sc-16r8icm-0 jZwKai">
                                            <path
                                                d="M22.7934 19.5586L2.2378 3.1234C2.18142 3.07723 2.1167 3.04287 2.04733 3.02229C1.97797 3.0017 1.90532 2.99529 1.83354 3.00342C1.76175 3.01154 1.69223 3.03406 1.62895 3.06966C1.56567 3.10527 1.50987 3.15327 1.46473 3.21094L1.12099 3.65004C1.07574 3.70772 1.04206 3.77397 1.02187 3.84498C1.00168 3.91599 0.995384 3.99037 1.00333 4.06388C1.01128 4.13738 1.03333 4.20856 1.0682 4.27334C1.10308 4.33812 1.1501 4.39523 1.20658 4.44141L21.7622 20.8766C21.8186 20.9228 21.8833 20.9571 21.9527 20.9777C22.022 20.9983 22.0947 21.0047 22.1665 20.9966C22.2382 20.9885 22.3078 20.9659 22.371 20.9303C22.4343 20.8947 22.4901 20.8467 22.5353 20.7891L22.879 20.35C22.9243 20.2923 22.9579 20.226 22.9781 20.155C22.9983 20.084 23.0046 20.0096 22.9967 19.9361C22.9887 19.8626 22.9667 19.7914 22.9318 19.7267C22.8969 19.6619 22.8499 19.6048 22.7934 19.5586ZM11.2022 8.14934L15.8354 11.8541C15.7591 9.74684 14.0789 8.0625 12 8.0625C11.7318 8.06301 11.4644 8.09212 11.2022 8.14934ZM12.7978 15.851L8.16455 12.1462C8.24121 14.2532 9.92141 15.9375 12 15.9375C12.2681 15.9369 12.5355 15.9079 12.7978 15.851ZM12 6.9375C15.391 6.9375 18.4998 8.87109 20.1786 12C19.7671 12.7701 19.2586 13.4816 18.6661 14.1164L19.9634 15.1535C20.6857 14.3633 21.2976 13.4747 21.7818 12.5129C21.8604 12.3538 21.9014 12.1781 21.9014 11.9998C21.9014 11.8216 21.8604 11.6458 21.7818 11.4867C19.916 7.76684 16.2256 5.25 12 5.25C10.7385 5.25 9.53504 5.49609 8.40345 5.91129L9.99875 7.18711C10.6498 7.03594 11.3166 6.9375 12 6.9375ZM12 17.0625C8.60901 17.0625 5.50057 15.1289 3.82141 12C4.23347 11.23 4.74254 10.5185 5.33558 9.88395L4.03831 8.84684C3.31616 9.63697 2.70435 10.5255 2.22027 11.4871C2.14163 11.6462 2.10066 11.8219 2.10066 12.0002C2.10066 12.1784 2.14163 12.3542 2.22027 12.5133C4.08437 16.2332 7.77475 18.75 12 18.75C13.2615 18.75 14.465 18.5021 15.5965 18.0887L14.0013 16.8132C13.3502 16.9641 12.6837 17.0625 12 17.0625Z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div id="reNew_passError" class="errorReward">

                                </div>
                            </div>


                            <div class="mt-4" style="margin-bottom:30px;">

                                <button type="button" class="btn_form" onclick="toSuccessChangePass()">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="6.71752" y1="3.18195" x2="3.18199" y2="6.71749" stroke="white" />
                                        <line x1="6.71752" y1="3.88906" x2="3.18199" y2="0.353527" stroke="white" />
                                    </svg>
                                    <p>Thay đổi mật khẩu</p>
                                </button>

                            </div>


                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>





<script>
    var passOld = true;

function showPassOld() {
    if (passOld) {
        document.getElementById("old_pass").type = "text";
        document.getElementById("hidePassOld").style.display = "block";
        document.getElementById("showPassOld").style.display = "none";
        passOld = false;
    } else {
        document.getElementById("old_pass").type = "password";
        document.getElementById("hidePassOld").style.display = "none";
        document.getElementById("showPassOld").style.display = "block";
        passOld = true;
    }
}

var passNew = true;

function showPassNew() {
    if (passNew) {
        document.getElementById("new_pass").type = "text";
        document.getElementById("hidePassNew").style.display = "block";
        document.getElementById("showPassNew").style.display = "none";
        passNew = false;
    } else {
        document.getElementById("new_pass").type = "password";
        document.getElementById("hidePassNew").style.display = "none";
        document.getElementById("showPassNew").style.display = "block";
        passNew = true;
    }
}

var reNew_pass = true;

function showReNewPass() {
    if (reNew_pass) {
        document.getElementById("reNew_pass").type = "text";
        document.getElementById("hideReNewPass").style.display = "block";
        document.getElementById("showReNewPass").style.display = "none";
        reNew_pass = false;
    } else {
        document.getElementById("reNew_pass").type = "password";
        document.getElementById("hideReNewPass").style.display = "none";
        document.getElementById("showReNewPass").style.display = "block";
        reNew_pass = true;
    }
}
</script>
@endif