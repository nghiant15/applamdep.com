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
      Nội dung
    </Label>
    <Input
      name ="title"
      placeholder=" Nội dung âm thanh"
      type="text"
      value={this.props.title}
      onChange={(e) => {
        this.setStateByName( "title", e.target.value );
      }}
    />
  </FormGroup>
     
  
        </>
    );
  }
}
