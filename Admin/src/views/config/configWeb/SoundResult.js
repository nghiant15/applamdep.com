import { Component } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
    Input,
  } from "reactstrap";
  import {
    CLabel,
  } from "@coreui/react";
export default class SoundResult extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  updateColor= (e) => {
    this.props.updateColor(e);
  };
  render() {
    return <>
          <div class="flex-end">
        {this.props.isDisable ? (
        <CButton
            outline
            color="info"
            size="md"
            className="btn-main"
            onClick={async (e) => {
            this.setStateByName( "isDisable", !this.props.isDisable );
            }}
        >
            <CIcon name="cil-pencil" style={{ marginRight: '6px' }} /> Cập nhật
        </CButton>
        ) : (
        <CButton
            outline
            color="info"
            size="md"
            className="btn-main"
            onClick={async (e) => {
            this.SaveAllConfigWeb("sound")
            }}
        >
            <CIcon name="cil-pencil" style={{ marginRight: '6px' }} /> Xác nhận cập nhật
        </CButton>
        )}
        </div>

        <CLabel>Nội dung âm thanh</CLabel>
        <Input
        style={styles.searchInput}
        onChange={(e) => {
        this.setStateByName("soundContent", e.target.value );
        }}
        value={this.props.soundContent}
        readOnly={this.props.isDisable}
        />
        
    </>;
  }
}

const styles = {
  mgl5: {
    marginLeft: "5px",
  },
  searchInput: {
    width: "100%",
    display: "inline-block",
    margin: "1px",
  },
};
