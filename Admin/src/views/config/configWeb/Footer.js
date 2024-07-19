import { Component } from "react";
import { Button } from "reactstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


export default class Footer extends Component {
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
            onClick={() => this.SaveAllConfigWeb("footer")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <div className="config_footer_box">
          <h1>Tiêu đề trái</h1>
          <div className="flex-a-center">
            <p style={{ marginRight: "10px" }}>Căn giữa</p>
            <div className="">
              <FormGroup>
                <FormControlLabel
                  onChange={(e) => {
                    this.setStateByName(
                      "centerFooterLeft" , !this.props.centerFooterLeft,
                    );
                  }}
                  checked={this.props.centerFooterLeft}
                  control={<Switch defaultChecked />}
                  label=""
                />
              </FormGroup>
            </div>
          </div>

          <CKEditor
            editor={ClassicEditor}
            data={this.props.footerLeft}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setStateByName(
                "footerLeft",data
              );
            }}
          />
        </div>
        <div className="config_footer_box">
          <h1>Tiêu đề phải</h1>
          <div className="flex-a-center">
            <p style={{ marginRight: "10px" }}>Căn giữa</p>
            <div className="">
              <FormGroup>
                <FormControlLabel
                  onChange={(e) => {
                    console.log(this.props.centerFooterRight);
                    this.setStateByName(
                      "centerFooterRight", !this.props.centerFooterRight,
                    );
                  }}
                  checked={this.props.centerFooterRight}
                  control={<Switch defaultChecked />}
                  label=""
                />
              </FormGroup>
            </div>
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={this.props.footerRight}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setStateByName(
                "footerRight" ,data
              );
            }}
          />
        </div>
      </>
    );
  }
}
