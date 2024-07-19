

import { Component } from "react";
import { CButton } from "@coreui/react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
export default class Chats extends Component {
    SaveAllConfigWeb(value) {
        this.props.SaveAllConfigWeb(value);
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
        <h1>Class</h1>
        <TextFieldGroup
            field="classLogo"
            label=""
            value={this.props.classLogo}
            placeholder=""
            type={"text"}
            className="mt-3"
            // value={this.state.image}
            onChange={(e) => {
              this.setStateByName(
                "classLogo", e.target.value
              );
            }}
          />
        <div class="mt-3">
          <h1>Header</h1>
          <TextFieldGroup
            field="image"
            label="Logo :(Tỷ lệ 2:1)"
            type={"file"}
            onChange={(e) => {
              this.onChangeImage(e, "image", "image_link", "image_show");
            }}
            onClick={(e) => {
              e.target.value = null;
              this.setStateByName( "image_show", "" );
            }}
          />
          <div class="text-center">
            <img
              alt=""
              style={{ width: "140px" }}
              height="auto"
              src={this.props.image}
            />
          </div>
          <TextFieldGroup
            field="hrefLogoHeader"
            label="Đường dẫn"
            value={this.props.hrefLogoHeader}
            placeholder=""
            type={"text"}
            className="mt-3"
            // value={this.state.image}
            onChange={(e) => {
              this.setStateByName(
                "hrefLogoHeader", e.target.value
              );
            }}
          />
        </div>
        <hr />
        <h1>Footer</h1>
        <TextFieldGroup
          field="logoFooter"
          label="Logo :(Tỷ lệ 2:1)"
          type={"file"}
          className="mt-5"
          onChange={(e) => {
            this.onChangeImage(
              e,
              "imgLogoFooter",
              "imgLogoFooter_link",
              "imgLogoFooter_show"
            );
          }}
          onClick={(e) => {
            e.target.value = null;
            this.setStateByName( "imgLogoFooter_show", "" );
          }}
        />
        <div className="text-center">
          <img
            alt=""
            style={{ width: "200px", marginBottom: 20 }}
            src={this.props.imgLogoFooter}
          />
        </div>
        <TextFieldGroup
          field="hrefLogoHeader"
          label="Đường dẫn"
          value={this.props.hrefLogoFooter}
          placeholder=""
          type={"text"}
          className="mt-3"
          // value={this.state.image}
          onChange={(e) => {
            this.setStateByName(
              "hrefLogoFooter",e.target.value,
            );
          }}
        />
      </>
    );
  }
}

const styles = {
    mgl5: {
      marginLeft: "5px",
    },
  };
  