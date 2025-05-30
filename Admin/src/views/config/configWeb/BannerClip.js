import { Component } from "react";
import { Button } from "reactstrap";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";

export default class BannerClip extends Component {
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
            onClick={() => this.SaveAllConfigWeb("bannerClip")}
          >
           Lưu thay đổi
          </Button>
        </div>
        <div class="mt-3">
          <h1>Video/Image Home </h1>
          <TextFieldGroup
            field="image"
            label="Hình ảnh /Video"
            type={"file"}
            onChange={(e) => this.onChangeImage(
                e,
                "imageVideoClip",
                "imageVideoClip_link",
                "imageVideoClip_show"
              )}
            onClick={(e) => {e.target.value = null;this.setStateByName("imageVideoClip_show", "")}} 
   
          />
         


          <div className="text-center">
        {/\.(mp4|webm|ogg)$/i.test(this.props.imageVideoClip) ? (
        <video
        width="400"
        controls
        style={{ height: "auto" }}
        >
        <source src={this.props.imageVideoClip} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        ) : (
        <img
        alt=""
        style={{ width: "400px", height: "auto" }}
        src={this.props.imageVideoClip}
        />
        )}
        </div>
       
        </div>


        <div class="mt-3">
          <h1>Video/Image Home(mobile) </h1>
          <TextFieldGroup
            field="image"
            label="Hình ảnh /Video"
            type={"file"}
            onChange={(e) => this.onChangeImage(
                e,
                "imageVideoMobileClip",
                "imageVideoMobile_link",
                "imageVideoMobile_show"
              )}
            onClick={(e) => {e.target.value = null;this.setStateByName("imageVideoMobile_show", "")}} 
   
          />
        <div className="text-center">
        {/\.(mp4|webm|ogg)$/i.test(this.props.imageVideoMobileClip) ? (
        <video
        width="400"
        controls
        style={{ height: "auto" }}
        >
        <source src={this.props.imageVideoMobileClip} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        ) : (
        <img
        alt=""
        style={{ width: "400px", height: "auto" }}
        src={this.props.imageVideoMobileClip}
        />
        )}
        </div>
       
        </div>
   
   
       
      </>
    );
  }
}
