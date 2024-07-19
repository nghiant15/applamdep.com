import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { Button } from "reactstrap";
import {
  CButton,
  CLabel,
  CTextarea,
  CSelect,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";

export default class HomePage extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage = (e, name, name_link, name_show) => {
    this.props.onChangeImage(e, name, name_link, name_show);
  };
  render() {
    return (
      <>
        <div class="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb("homepage")}
          >
            Lưu thay đổi
          </Button>
        </div>

        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "300px", marginRight: "10px" }}
              src="/assets/image/homepage_edit2.png"
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
        {/* <div class="flex-a-center config-box-border">
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
              value={this.props.titlePhoto}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("titlePhoto", e.target.value);
              }}
            />
          </div>
        </div> */}
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
              value={this.props.buttonSuggestLogin1}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("buttonSuggestLogin1", e.target.value);
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
              value={this.props.buttonSuggestLogin2}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("buttonSuggestLogin2", e.target.value);
              }}
            />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
        <div>
          <div>
            <img
              style={{ maxWidth: "100%", marginRight: "10px" }}
              src="/assets/image/dang-nhap-xem-ket-qua.png"
              alt="img"
            />
          </div>
          <div className="flex">
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult1"
              label="Gợi ý đăng nhập: Vị trí 1:"
              value={this.props.loginViewResult1}
              placeholder={"Vui lòng"}
              onChange={(e) => {
                this.setStateByName("loginViewResult1", e.target.value);
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult2"
              label="Gợi ý đăng nhập: Vị trí 2:"
              value={this.props.loginViewResult2}
              placeholder={"Để nhận ngay"}
              onChange={(e) => {
                this.setStateByName("loginViewResult2", e.target.value);
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult3"
              label="Gợi ý đăng nhập: Vị trí 3:"
              value={this.props.loginViewResult3}
              placeholder={"E-voucher"}
              onChange={(e) => {
                this.setStateByName("loginViewResult3", e.target.value);
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="loginViewResult4"
              label="Gợi ý đăng nhập: Vị trí 4:"
              value={this.props.loginViewResult4}
              placeholder={"giảm giá 1.000.000 VND"}
              onChange={(e) => {
                this.setStateByName("loginViewResult4", e.target.value);
              }}
            />
          </div>
          </div>
        </div>
        </div>

      </>
    );
  }
}

const styles = {
  icon: {
    fontSize: "16px",
    height: "20px",
    width: "20px",
  },
};
