import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { Button } from "reactstrap";
import {
    CTextarea,
  } from "@coreui/react";
export default class Seo extends Component {
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
        <div className="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb("seoInfo")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <TextFieldGroup
          field="titleSeo"
          label="Tiêu đề:"
          value={this.props.titleSeo}
          placeholder={""}
          onChange={(e) => {
            this.setStateByName( "titleSeo", e.target.value );
          }}
        />
        <TextFieldGroup
          field="titleSeo2"
          label="Tiêu đề 2:"
          value={this.props.titleSeo2}
          placeholder={""}
          onChange={(e) => {
            this.setStateByName( "titleSeo2", e.target.value );
          }}
        />
        <TextFieldGroup
          field="introduce"
          label="Giới thiệu:"
          value={this.props.introduce}
          placeholder={""}
          onChange={(e) => {
            this.setStateByName( "introduce", e.target.value );
          }}
        />
        <TextFieldGroup
          field="image1"
          label="Hình ảnh share (***px * ***px):"
          type={"file"}
          className="mt-5"
          onChange={(e) => {
            this.onChangeImage(
              e,
              "imageShareSeo",
              "imageShareSeo_link",
              "imageShareSeo_show"
            );
          }}
          onClick={(e) => {
            e.target.value = null;
            this.setStateByName( "imageShareSeo_show", "" );
          }}
        />
        <div class="text-center mb-5">
          <img
            alt=""
            style={{ width: "200px", marginBottom: 20 }}
            height="auto"
            src={this.props?.imageShareSeo}
          />
        </div>
        <TextFieldGroup
          field="keywordSeo"
          label="Từ khóa:"
          value={this.props.keywordSeo}
          placeholder={""}
          onChange={(e) => {
            this.setStateByName("keywordSeo", e.target.value );
          }}
        />
        <label className="control-label">Mô tả:</label>
        <CTextarea
          name="descSeo"
          rows="4"
          value={this.props.descSeo}
          onChange={(e) => {
            this.setStateByName("descSeo",e.target.value );
          }}
        />
        <TextFieldGroup
          field="authorSeo"
          label="Tác giả:"
          value={this.props.authorSeo}
          placeholder={""}
          onChange={(e) => {
            this.setStateByName("authorSeo", e.target.value);
          }}
        />
        <TextFieldGroup
          field="imgLayout"
          label="Hình ảnh favicon: (20px * 20px)"
          type={"file"}
          className="mt-5"
          onChange={(e) => {
            this.onChangeImage(
              e,
              "imgLayout",
              "imgLayout_link",
              "imgLayout_show"
            );
          }}
          onClick={(e) => {
            e.target.value = null;
            this.setStateByName("imgLayout_show", "" );
          }}
        />
        <div className="text-center">
          <img
            alt=""
            style={{ width: "140px", marginBottom: 20 }}
            src={this.props.imgLayout}
          />
        </div>
      </>
    );
  }
}
