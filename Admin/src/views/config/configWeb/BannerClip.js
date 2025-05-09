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
          <div class="text-center">
            <img
              alt=""
              style={{ width: "400px" }}
              height="auto"
              src={this.props.imageVideoClip}
            />
          </div>
       
        </div>
   
       
      </>
    );
  }
}
