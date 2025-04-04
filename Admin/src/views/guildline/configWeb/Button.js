import { Component } from "react";
import TextFieldGroup from "../../Common/TextFieldGroup";
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
            onClick={() => this.SaveAllConfigWeb("button")}
          >
            Lưu thay đổi
          </Button>
        </div>
        {/* <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "150px", marginRight: "10px" }}
              src="/assets/image/phan-tich-soi-da.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="btn_soida"
              label="Phân tích tình trạng da"
              value={this.props?.btn_soida}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("btn_soida", e.target.value);
              }}
            />
          </div>
        </div> */}
        <div class="flex-a-center config-box-border">
          <div>
            <img
              style={{ maxWidth: "350px", marginRight: "10px" }}
              src="/assets/image/nut-nhan-ngay-voucher.png"
              alt="img"
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextFieldGroup
              field="btn_get_voucher2"
              label="Nhận quà Voucher"
              value={this.props?.btn_get_voucher2}
              placeholder={""}
              onChange={(e) => {
                this.setStateByName("btn_get_voucher2", e.target.value);
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
