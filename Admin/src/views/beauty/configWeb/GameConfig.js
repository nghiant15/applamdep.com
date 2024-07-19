import { Component } from "react";
import moment from 'moment'
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
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
      Điểm mỗi lượt soi
    </Label>
    <Input
      name ="score"
      placeholder="Điểm mỗi lượt soi"
      type="number"
      value={this.props.score}
      onChange={(e) => {
        this.setStateByName( "score", e.target.value );
      }}
    />
  </FormGroup>
     
  <FormGroup>
    <Label >
      Điểm tối đa ( theo ngày)
    </Label>
    <Input
      name ="scoreMax"
      placeholder="Điểm tối đa ( theo ngày)"
      type="number"
      value={this.props.scoreMax}
      onChange={(e) => {
        this.setStateByName( "scoreMax", e.target.value );
      }}
    />
  </FormGroup>
  <CSelect
                 onChange={(e) => {
                  this.setStateByName( "status", e.target.value );
                }}   custom size="sm" name="status" 
                        value ={this.props.status}
                 >
                     
                          <option   value ="1" >
                          Hoạt động
                          </option>
                          <option   value ="0" >
                          không hoạt động
                          </option>
                    
                    </CSelect>


        </>
    );
  }
}
