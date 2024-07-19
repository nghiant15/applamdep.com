import { Component } from "react";
import moment from 'moment'
import TextFieldGroup from "../../Common/TextFieldGroup";
import { Button, FormGroup, Label,Input  } from "reactstrap";
import {

  CLabel, CSelect, CRow, CCol
} from "@coreui/react";


export default class Seo extends Component {
  SaveAllConfigWeb() {
    this.props.SaveAllConfigWeb();
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };

  onChangeImage(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setStateByName( "image", e.target.result );
 
    }
  }

  onChangeImage2(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setStateByName( "minisize", e.target.result );
 
    }
  }

getTimeConver = (datetime) => {
  if(datetime ==null )
          return '';
   return  moment(datetime).format('YYYY-MM-DD');

}




  render() {
    
    return (
      <>
        <div className="text-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => this.SaveAllConfigWeb()}
          >
            Lưu thay đổi
          </Button>
        </div>

       
      <FormGroup>
    <Label >
      Tiêu đề
    </Label>
    <Input
      name ="title"
      placeholder=" Tiêu đề"
      type="text"
      value={this.props.title}
      onChange={(e) => {
        this.setStateByName( "title", e.target.value );
      }}
    />
  </FormGroup>
     
  <FormGroup>
    <Label >
    Số lượng có hạn
    </Label>
    <Input
      name ="slch"
      placeholder="Số lượng có hạn"
      type="text"
      value={this.props.slch}
      onChange={(e) => {
        this.setStateByName( "slch", e.target.value );
      }}
    />
  </FormGroup>

  <FormGroup>
    <Label >
    Tên sản phẩm
    </Label>
    <Input
      name ="titleProduct"
      placeholder="Tên sản phẩm"
      type="text"
      value={this.props.titleProduct}
      onChange={(e) => {
        this.setStateByName( "titleProduct", e.target.value );
      }}
    />
  </FormGroup>
 

  <FormGroup>
    <Label >
    Giá sản phẩm
    </Label>
    <Input
      name ="priceText"
      placeholder="Giá sản phẩm"
      type="text"
      value={this.props.priceText}
      onChange={(e) => {
        this.setStateByName( "priceText", e.target.value );
      }}
    />
  </FormGroup>

  <FormGroup>
    <Label >
    buton Đăng ký
    </Label>
    <Input
      name ="butonText"
      placeholder="buton Đăng ký"
      type="text"
      value={this.props.butonText}
      onChange={(e) => {
        this.setStateByName( "butonText", e.target.value );
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label >
    Link đăng ký
    </Label>
    <Input
      name ="linkRegister"
      placeholder="Link đăng ký"
      type="text"
      value={this.props.linkRegister}
      onChange={(e) => {
        this.setStateByName( "linkRegister", e.target.value );
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label >
    Thời gian hiện nút tắt(giây)
    </Label>
    <Input
      name ="countDown"
      placeholder=" Thời gian hiện nút tắt"
      type="number"
      value={this.props.countDown}
      onChange={(e) => {
        this.setStateByName( "countDown", e.target.value );
      }}
    />
  </FormGroup>

  <FormGroup>
    <Label >
    Thời gian bắt đầu hiện popup
    </Label>
    <Input
      name ="countDown"
      placeholder="thời gian bắt đầu hiện popup"
      type="number"
      value={this.props.showUp}
      onChange={(e) => {
        this.setStateByName( "showUp", e.target.value );
      }}
    />
  </FormGroup>

  <FormGroup>
  <TextFieldGroup
                field="image"
                label="Link hình ảnh"
                type={"file"}
                strongText = " (300 x 380)"
                // error={errors.title}
                onChange={e => { this.onChangeImage(e) }}
                onClick={(e) => { e.target.value = null }}
              // rows="5"
              />
            
            {
                this.props.image == "" ? "" :
                  <img width="250" height="300" src={this.props.image} style={{ marginBottom: 20 }} />
              }
  </FormGroup>


  <FormGroup>
  <TextFieldGroup
                field="minisize"
                label="Link hình ảnh minisize"
                type={"file"}
                strongText = " (800 *150)"
                // error={errors.title}
                onChange={e => { this.onChangeImage2(e) }}
                onClick={(e) => { e.target.value = null }}
              // rows="5"
              />
            
            {
                this.props.minisize == "" ? "" :
                  <img width="800" height="200" src={this.props.minisize} style={{ marginBottom: 20 }} />
              }
  </FormGroup>



 
  
        </>
    );
  }
}
