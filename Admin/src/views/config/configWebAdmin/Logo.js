import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { CButton } from "@coreui/react";

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
          <CButton
            onClick={() => this.SaveAllConfigWeb("logos")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            {/* <CIcon name="cilPencil" /> */}
            Lưu thay đổi
          </CButton>
        </div>
        <div className="mt-3"></div>
        <h1>Web Admin</h1>
        <TextFieldGroup
          field="imgLogoAdmin"
          label="Logo (Tỷ lệ 2:1)"
          type={"file"}
          className="mt-5"
          onChange={(e) => {
            this.onChangeImage(
              e,
              "imgLogoAdmin",
              "imgLogoAdmin_link",
              "imgLogoAdmin_show"
            );
          }}
          onClick={(e) => {
            e.target.value = null;
            this.setStateByName( "imgLogoAdmin_show", "" );
          }}
        />
        <div className="text-center">
          <img
            alt=""
            style={{ width: "200px", marginBottom: 20 }}
            src={this.props.imgLogoAdmin}
          />
        </div>
      </>
    );
  }
}
const styles = {
  mgl5: {
    marginLeft: "5px",
  },
};
