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
  onChangeImage=(e, name, name_link, name_show) =>{
    this.props.onChangeImage(e, name, name_link, name_show);
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
      Link tư vấn messenger:
    </Label>
    <Input
      name ="messengerLink"
      placeholder="Tư vấn messenger"
      type="text"
      value={this.props.messengerLink}
      onChange={(e) => {
        this.setStateByName( "messengerLink", e.target.value );
      }}
    />
  </FormGroup>
     
  <FormGroup>
    <Label >
    Link tư vấn Zalo:
    </Label>
    <Input
      name ="zaloLink"
      placeholder="Tư vấn zalo"
      type="text"
      value={this.props.zaloLink}
      onChange={(e) => {
        this.setStateByName( "zaloLink", e.target.value );
      }}
    />
  </FormGroup>



        </>
    );
  }
}
