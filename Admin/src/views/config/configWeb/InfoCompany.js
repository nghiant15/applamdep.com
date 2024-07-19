import { Component } from "react";
import { CButton } from "@coreui/react";
import {
  Input,
} from "reactstrap";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
export default class InfoCompany extends Component {
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
}
  render() {
    return (
      <>
        <div class="text-center">
          <CButton
            onClick={() => this.SaveAllConfigWeb("embeds")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            {/* <CIcon name="cilPencil" /> */}
            Lưu thay đổi
          </CButton>
        </div>
        <div className="">
          <div className="mt-3">
            <p>Mã nhúng facebook (nếu có) :</p>
          </div>
           <textarea
            name="embeddFacebook"
            value={this.props.embeddFacebook}
            onChange={(e) => this.setStateByName("embeddFacebook", e.target.value)}
            class="mt-3"
            cols="60"
            rows="8"
          ></textarea>
          
        </div>
    

        <div className="">
          <div className="mt-3">
            <p>Mã nhúng Zalo (nếu có) :</p>
          </div>
           <textarea
            name="embeddFacebook"
            value={this.props.embeddZalo}
            onChange={(e) => this.setStateByName("embeddZalo", e.target.value)}
            class="mt-3"
            cols="60"
            rows="8"
          ></textarea>
        </div>
        <div className="">
          <div className="mt-3">
            <p>Hotline(nếu có): </p>
          </div>
          
          <TextFieldGroup
              name="embedHotline"
              
              value={this.props.embedHotline}
              onChange={(e) => {
                this.setStateByName("embedHotline", e.target.value );
              }}
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
