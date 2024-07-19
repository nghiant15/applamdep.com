import { Component } from "react";
import { CButton } from "@coreui/react";

export default class Chats extends Component {
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
            onClick={() => this.SaveAllConfigWeb("chats")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            {/* <CIcon name="cilPencil" /> */}
            Lưu thay đổi
          </CButton>
        </div>
        <div className="text-center">
            <div className="mt-3">
              <p>Mã chat tawk (nếu có) :</p>
            </div>
            <textarea
                  name="codeChat"
                  value={this.props.codeChat}
                  onChange={(e) => this.setStateByName("codeChat", e.target.value)}
                  class="mt-3"
                  rows="8"
                  cols="60"
             >
              
             </textarea>
        </div>
        <div class="text-center">
          <div className="mt-3">
            <p>Mã chat message (nhắn tin với khách hàng) :</p>
          </div>

          <textarea
            name="codeMess"
            value={this.props.codeMess}
            onChange={(e) => this.setStateByName("codeMess", e.target.value)}
            class="mt-3"
            cols="60"
            rows="8"
          ></textarea>
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
