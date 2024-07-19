import { Component } from "react";
import { CButton } from "@coreui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default class GuideVoucher extends Component {
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
        <div class="mb-3 text-center">
          <CButton
            onClick={() => this.SaveAllConfigWeb("guideVoucher")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            {/* <CIcon name="cilPencil" /> */}
            Lưu thay đổi
          </CButton>
        </div>
        <h1>Nội dung page hướng dẫn sử dụng voucher</h1>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.guideVoucher}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          style={{ height: "300px" }}
          onChange={(event, editor) => {
            const data = editor.getData();

            this.setStateByName( "guideVoucher", data );
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
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
