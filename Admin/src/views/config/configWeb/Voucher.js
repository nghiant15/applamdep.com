import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { Button } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
export default class Voucher extends Component {
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
            onClick={() => this.SaveAllConfigWeb("voucher")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img         
              style={{ width: '400px', height: "auto" }}
              src="/assets/image/popup-thong-tin-voucher.png"
              alt="voucher"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
                field="voucherEndow"
                label="Ưu đãi"
                value={this.props?.voucherEndow}
                placeholder={"1.000.000đ"}
                onChange={(e) => {
                  this.setStateByName("voucherEndow", e.target.value);
                }}
              />
              <TextFieldGroup
                field="voucherExpiry"
                label="Hiệu lực"
                value={this.props?.voucherExpiry}
                placeholder={"30 ngày kể từ ngày nhận voucher"}
                onChange={(e) => {
                  this.setStateByName("voucherExpiry", e.target.value);
                }}
              />
              <TextFieldGroup
                field="voucherSupplier"
                label="Nhà cung cấp"
                value={this.props?.voucherSupplier}
                placeholder={"Chưa có"}
                onChange={(e) => {
                  this.setStateByName("voucherSupplier", e.target.value);
                }}
              />
              <TextFieldGroup
                field="voucherCondition"
                label="Điều kiện"
                value={this.props?.voucherCondition}
                placeholder={"Sử dụng một lần"}
                onChange={(e) => {
                  this.setStateByName("voucherCondition", e.target.value);
                }}
              />
               <TextFieldGroup
                field="sendSMS"
                label="Thông báo khách hàng"
                value={this.props?.sendSMS}
                placeholder={"Hãy lưu lại mã voucher, chúng..."}
                onChange={(e) => {
                  this.setStateByName("sendSMS", e.target.value);
                }}
              />
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "300px", marginRight: "10px" }}
              src="/assets/image/hinh-anh-voucher.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="image1"
              label="Hình ảnh voucher (***px * ***px):"
              type={"file"}
              className="mt-5"
              onChange={(e) => {
                this.onChangeImage(
                  e,
                  "imageFormVoucher",
                  "imageFormVoucher_link",
                  "imageFormVoucher_show"
                );
              }}
              onClick={(e) => {
                e.target.value = null;
                this.setStateByName("imageFormVoucher_show", "");
              }}
            />
            <div class="text-center mb-5">
              <img
                alt=""
                style={{ width: "300px", marginBottom: 20 }}
                height="auto"
                src={this.props?.imageFormVoucher}
              />
            </div>
          </div>
        </div>
        <div class="flex-a-center config-box-border">
          <p style={{padding: '0', margin: 'auto 6px auto 0'}}>Tối ưu hóa trên màn hình điện thoại</p>
        <FormGroup>
                <FormControlLabel
                  onChange={(e,v) => {
                    this.setStateByName(
                      "classImageVoucher" , v
                    );
                    console.log(e,v)
                  }}
                  checked={this.props.classImageVoucher}
                  control={<Switch defaultChecked />}
                  label=""
                />
              </FormGroup>
        </div>
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/get-voucher-success.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="receiveVoucherSuccess"
              label="Tiêu đề: Nhận voucher thành công"
              value={this.props?.receiveVoucherSuccess}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("receiveVoucherSuccess", e.target.value);
              }}
            />
          </div>
        </div>
 
     
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/gui-sms.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="sendSMS"
              label="Tiêu đề: Gửi SMS"
              value={this.props?.sendSMS}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("sendSMS", e.target.value);
              }}
            />
          </div>
        </div> */}
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
