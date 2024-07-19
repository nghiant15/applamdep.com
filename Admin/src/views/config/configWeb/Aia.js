import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { Button } from "reactstrap";

export default class Voucher extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  render() {
    return (
      <>
        <div class="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb("aia")}
          >
            Lưu thay đổi
          </Button>
        </div>
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/da-dang-nhap-nhan-voucher-aia.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleGetVoucherAia"
              label="Tiêu đề: Form đã đăng nhập - nhận voucher"
              value={this.props?.titleGetVoucherAia}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName( "titleGetVoucherAia", e.target.value );
              }}
            />
          </div>
        </div> */}
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/danh-sach-thuong-hieu.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleListCam"
              label="Tiêu đề: Danh sách thương hiệu"
              value={this.props?.titleListCam}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("titleListCam",e.target.value);
              }}
            />
          </div>
        </div> */}
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "350px", marginRight: "10px" }}
              src="/assets/image/goi-y-dang-nhap-nhan-voucher-aia.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleSuggestFormLoginGetVoucher"
              label="Tiêu đề: Form gợi ý đăng nhập nhận voucher"
              value={this.props?.titleSuggestFormLoginGetVoucher}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName(
                  "titleSuggestFormLoginGetVoucher", e.target.value
                );
              }}
            />
          </div>
        </div> */}
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/tieu-de-sau-khi-dang-nhap-nhan-voucher-aia.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleFormGetVoucherAfterLoginFormSuggest"
              label="Tiêu đề: Sau khi đăng nhập form gợi ý đăng nhập nhận voucher"
              value={this.props?.titleFormGetVoucherAfterLoginFormSuggest}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName(
                  "titleFormGetVoucherAfterLoginFormSuggest",e.target.value
                );
              }}
            />
          </div>
        </div> */}
      </>
    );
  }
}
