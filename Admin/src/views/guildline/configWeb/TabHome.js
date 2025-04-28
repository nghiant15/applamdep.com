import { Component } from "react";
import { Button } from "reactstrap";
import TextFieldGroup from "../../Common/TextFieldGroup";

export default class TabHome extends Component {
  
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  render() {
    return (
      <div>
        <div class="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb("homepage")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <TextFieldGroup
          field="titlePen1"
          label="Heading 1:"
          value={this.props?.titlePen1}
          onChange={(e) => this.setStateName("titlePen1", e)}
        />
        <TextFieldGroup
          field="titlePen2"
          label="Heading 2: "
          value={this.state?.titlePen2}
          onChange={(e) => this.setStateName("titlePen2", e.target.value)}
        />

        <TextFieldGroup
          field="sologan"
          label="Sologan:"
          value={this.state?.sologan}
          placeholder={""}
          onChange={(e) => {
            this.setState({ sologan: e.target.value });
          }}
        />

        <TextFieldGroup
          field="introduce"
          label="Giới thiệu:"
          value={this.state?.introduce}
          placeholder={""}
          onChange={(e) => {
            this.setState({ introduce: e.target.value });
          }}
        />

        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/huong-dan-chup-anh.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="image1"
              label="Hình ảnh hướng dẫn chụp ảnh (400px * 400px):"
              type={"file"}
              className="mt-5"
              onChange={(e) => {
                this.onChangeImage(
                  e,
                  "imagePhoto",
                  "imagePhoto_link",
                  "imagePhoto_show"
                );
              }}
              onClick={(e) => {
                e.target.value = null;
                this.setState({ imagePhoto_show: "" });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "300px", marginRight: "10px" }}
              src="/assets/image/tieu-de-huong-dan-chup-anh.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titlePhoto"
              label="Tiêu đề hình ảnh hướng dẫn chụp ảnh:"
              value={this.state?.titlePhoto}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titlePhoto: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/tieu-de-nut-chup-anh.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleButtonPhoto"
              label="Tiêu đề nút chụp ảnh:"
              value={this.state?.titleButtonPhoto}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleButtonPhoto: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/tieu-de-huong-dan-chon-anh.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleButtonChoose"
              label="Tiêu đề nút chọn ảnh:"
              value={this.state?.titleButtonChoose}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleButtonChoose: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/tieu-de-goi-y-dang-nhap-1.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="buttonSuggestLogin1"
              label="Tiêu đề nút gợi ý đăng nhập - 1:"
              value={this.state?.buttonSuggestLogin1}
              placeholder={""}
              onChange={(e) => {
                this.setState({ buttonSuggestLogin1: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/tieu-de-goi-y-dang-nhap-2.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="buttonSuggestLogin2"
              label="Tiêu đề nút gợi ý đăng nhập - 2:"
              value={this.state?.buttonSuggestLogin2}
              placeholder={""}
              onChange={(e) => {
                this.setState({ buttonSuggestLogin2: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/chup-anh-buoc-1.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleStep1"
              label="Tiều đề : Bước 1 - Chụp ảnh:"
              value={this.state?.titleStep1}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleStep1: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/chup-anh-buoc-2.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleStep2"
              label="Tiều đề : Bước 2 - Đã chụp - tải ảnh:"
              value={this.state?.titleStep2}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleStep2: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/chup-anh-buoc-3.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleStep3"
              label="Tiều đề : Bước 3 - Kết quả:"
              value={this.state?.titleStep3}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleStep3: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/ket-qua-tong-quan.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleResultSkin"
              label="Tiều đề : Kết quả soi da:"
              value={this.state?.titleResultSkin}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleResultSkin: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/ket-qua-tong-quan-2.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="textResultSkin"
              label="Tiêu đề phụ : Kết quả soi da:"
              value={this.state?.textResultSkin}
              placeholder={""}
              onChange={(e) => {
                this.setState({ textResultSkin: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/ket-qua-chuyen-sau.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="titleResultDepthSkin"
              label="Tiều đề : Kết quả chuyên sâu:"
              value={this.state?.titleResultDepthSkin}
              placeholder={""}
              onChange={(e) => {
                this.setState({ titleResultDepthSkin: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/ket-qua-chuyen-sau2.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="textResultDepthSkin"
              label="Tiêu đề phụ : Kết quả chuyên sâu:"
              value={this.state?.textResultDepthSkin}
              placeholder={""}
              onChange={(e) => {
                this.setState({ textResultDepthSkin: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/dang-nhap-xem-ket-qua.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult1"
              label="Gợi ý đăng nhập: Vị trí 1:"
              value={this.state?.loginViewResult1}
              placeholder={"Vui lòng"}
              onChange={(e) => {
                this.setState({ loginViewResult1: e.target.value });
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult2"
              label="Gợi ý đăng nhập: Vị trí 2:"
              value={this.state?.loginViewResult2}
              placeholder={"Để nhận ngay"}
              onChange={(e) => {
                this.setState({ loginViewResult2: e.target.value });
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult3"
              label="Gợi ý đăng nhập: Vị trí 3:"
              value={this.state?.loginViewResult3}
              placeholder={"E-voucher"}
              onChange={(e) => {
                this.setState({ loginViewResult3: e.target.value });
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult4"
              label="Gợi ý đăng nhập: Vị trí 4:"
              value={this.state?.loginViewResult4}
              placeholder={"giảm giá 1.000.000 VND"}
              onChange={(e) => {
                this.setState({ loginViewResult4: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
