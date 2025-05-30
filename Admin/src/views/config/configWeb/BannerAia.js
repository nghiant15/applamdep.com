import { Component } from "react";
import { Button } from "reactstrap";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";

export default class BannerAia extends Component {
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
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb("banner")}
          >
            Lưu thay đổi
          </Button>
        </div>
        <div class="mt-3">
          <h1>Banner Desktop </h1>
          <TextFieldGroup
            field="image"
            label="Hình ảnh"
            type={"file"}
            onChange={(e) => this.onChangeImage(
                e,
                "imageBannerDesktop",
                "imageBannerDesktop_link",
                "imageBannerDesktop_show"
              )}
            onClick={(e) => {e.target.value = null;this.setStateByName("imageBannerDesktop_show", "")}} 
   
          />
      

            <div className="text-center">
        {/\.(mp4|webm|ogg)$/i.test(this.props.imageBannerDesktop) ? (
        <video
        width="400"
        controls
        style={{ height: "auto" }}
        >
        <source src={this.props.imageBannerDesktop} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        ) : (
        <img
        alt=""
        style={{ width: "400px", height: "auto" }}
        src={this.props.imageBannerDesktop}
        />
        )}
        </div>
          <TextFieldGroup
            field="hrefImageBannerDesktop"
            label="Đường dẫn"
            value={this.props.hrefImageBannerDesktop}
            placeholder=""
            type={"text"}
            className="mt-3"
            onChange={(e) => {
                this.setStateByName("hrefImageBannerDesktop", e.target.value);
              }}
            
          />
        </div>
        <hr />
        <div class="mt-3">
          <h1>Banner Mobile</h1>
          <TextFieldGroup
            field="image"
            label="Hình ảnh"
            type={"file"}
            onChange={(e) => {
              this.onChangeImage(
                e,
                "imageBannerMobile",
                "imageBannerMobile_link",
                "imageBannerMobile_show"
              );
            }}
            onClick={(e) => {e.target.value = null;this.setStateByName("imageBannerMobile_show", "")}} 

          
          />
         

            <div className="text-center">
        {/\.(mp4|webm|ogg)$/i.test(this.props.imageBannerMobile) ? (
        <video
        width="400"
        controls
        style={{ height: "auto" }}
        >
        <source src={this.props.imageBannerMobile} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        ) : (
        <img
        alt=""
        style={{ width: "400px", height: "auto" }}
        src={this.props.imageBannerMobile}
        />
        )}
        </div>
          <TextFieldGroup
            field="hrefImageBannerMobile"
            label="Đường dẫn"
            value={this.props.hrefImageBannerMobile}
            placeholder=""
            type={"text"}
            className="mt-3"
            onChange={(e) => {
              this.setStateByName("hrefImageBannerMobile", e.target.value);
            }}
          />
        </div>
      </>
    );
  }
}
