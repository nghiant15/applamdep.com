import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { Button } from "reactstrap";
import {
    CTextarea,
  } from "@coreui/react";
export default class Seo extends Component {
  SaveAllConfigWeb() {
    this.props.SaveAllConfigWeb();
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage=(e, name, name_link, name_show) =>{
    this.props.onChangeImage(e, name, name_link, name_show);
}
  render() {
    return (
      <>
        <div className="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb()}
          >
            Lưu thay đổi
          </Button>
        </div>
        <TextFieldGroup
            field="poupintro"
            label="Poup giới thiệu:"
            value={this.props.poupintro}
            placeholder={""}
            onChange={(e) => {
              this.setStateByName( "poupintro", e.target.value );
            }}
        />
        <TextFieldGroup
            field="pupupSuccess"
            label="Câu thông  báo khi trúng thưởng:"
            value={this.props.pupupSuccess}
            placeholder={""}
            onChange={(e) => {
              this.setStateByName( "pupupSuccess", e.target.value );
            }}
        />
        <TextFieldGroup
            field="introduce"
            label="Câu thông báo khi không trúng thưởng:"
            value={this.props.popupfail}
            placeholder={""}
            onChange={(e) => {
              this.setStateByName( "popupfail", e.target.value );
            }}
        />  
      </>
    );
  }
}
