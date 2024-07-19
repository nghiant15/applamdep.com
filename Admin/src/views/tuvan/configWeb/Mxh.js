import { Component } from "react";
import { Button } from "reactstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextFieldGroup from "../../Common/TextFieldGroup";

export default class Mxh extends Component {
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
            onClick={() => this.SaveAllConfigWeb("mxh")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <div class="mt-3"></div>
        {this.props.configData.map((product, i) => {
          return (
            <div class="configData_item">
              <div class="">
                <strong>{product.label}</strong>
              </div>
              <div class="">
                <FormGroup>
                  <FormControlLabel
                    onChange={(e) => {
                      let x = [...this.props.configData];
                      x[i].value = !x[i].value;
                      this.setStateByName(
                        "configData", x
                      );
                    }}
                    checked={product.value}
                    control={<Switch defaultChecked />}
                    label=""
                  />
                </FormGroup>
                <span>{product.value ? "Kích hoạt" : "Tắt"}</span>
              </div>
            </div>
          );
        })}
        <div class="text-center">
          <p>Facebook</p>
        </div>
        <div class="col-md-12 mt-3">
          <div>
            <TextFieldGroup
              field=""
              label="Mã ứng dụng"
              value={this.props.keyAppFb}
              onChange={(e) => {
                this.setStateByName("keyAppFb", e.target.value );
              }}
            />

            <TextFieldGroup
              field=""
              label="Mật khẩu"
              value={this.props.PassFb}
              onChange={(e) => {
                this.setStateByName("PassFb", e.target.value );
              }}
            />
            <TextFieldGroup
              field=""
              label="Đường dẫn"
              value={this.props.hrefFb}
              onChange={(e) => {
                this.setStateByName( "hrefFb", e.target.value );
              }}
            />
          </div>
        </div>
        <div class="text-center">
          <p>Google</p>
        </div>
        <div class="col-md-12 mt-3">
          <div>
            <TextFieldGroup
              field=""
              label="Mã ứng dụng"
              value={this.props.keyAppGg}
              placeholder={"Mã app"}
              onChange={(e) => {
                this.setStateByName("keyAppGg", e.target.value );
              }}
            />

            <TextFieldGroup
              field=""
              label="Mật khẩu"
              value={this.props.PassGg}
              placeholder={"Mật khẩu"}
              onChange={(e) => {
                this.setStateByName("PassGg", e.target.value );
              }}
            />
            <TextFieldGroup
              field=""
              label="Đường dẫn"
              value={this.props.hrefGg}
              onChange={(e) => {
                this.setStateByName( "hrefGg", e.target.value );
              }}
            />
          </div>
        </div>
        <div class="text-center">
          <p>Zalo</p>
        </div>
        <div class="col-md-12 mt-3">
          <div>
            <TextFieldGroup
              field=""
              label="Mã ứng dụng"
              value={this.props.keyAppZalo}
              placeholder={"Mã app"}
              onChange={(e) => {
                this.setStateByName( "keyAppZalo", e.target.value );
              }}
            />

            <TextFieldGroup
              field=""
              label="Mật khẩu"
              value={this.props.PassZalo}
              placeholder={"Mật khẩu"}
              onChange={(e) => {
                this.setStateByName( "PassZalo", e.target.value );
              }}
            />
            <TextFieldGroup
              field=""
              label="Đường dẫn"
              value={this.props.hrefZalo}
              onChange={(e) => {
                this.setStateByName("hrefZalo", e.target.value );
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
