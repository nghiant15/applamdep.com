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
      Đầu ra câu hỏi
    </Label>
    <Input
      name ="question"
      placeholder="Nội dung câu hỏi"
      type="text"
      value={this.props.question}
      onChange={(e) => {
        this.setStateByName( "question", e.target.value );
      }}
    />
  </FormGroup>
     


  <FormGroup>
    <Label >
     Phụ, lược bổ, ghi chú thêm
    </Label>
    <Input
      name ="titleProduct"
      placeholder="Giải thích, lược bỏ thêm"
      type="text"
      value={this.props.noted}
      onChange={(e) => {
        this.setStateByName( "noted", e.target.value );
      }}
    />
  </FormGroup>
 

  


 
  
        </>
    );
  }
}
