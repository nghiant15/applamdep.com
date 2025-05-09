import { Component } from "react";

import CIcon from '@coreui/icons-react';

import {

CSelect
} from "@coreui/react";
import axios from "axios";
import TextFieldGroup from "../../Common/TextFieldGroup";
import { Button } from "reactstrap";
import {
  CButton
} from '@coreui/react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  ModalHeader, ModalBody, ModalFooter, Modal,

} from 'reactstrap';
import Swal from 'sweetalert2';
export default class Voucher extends Component {
  
  
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }

  constructor(props) {
    super(props);
    this.state = {
     
      modalCom: false,
      scoreInput: 0,
      scoreMaxInput: 0,
      statusInput: 0

    };
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  getstatusItem = (status)=> {
    if(status =="1")
    {
      return "Hoạt động";
    }
    return "Không hoạt động";
  }

  openModal() {
    this.setState({
      modalCom: !this.state.modalCom,
    
    })
    
  }

  editdata (item){
    console.log(item);
 

    this.setState({
      modalCom: !this.state.modalCom,
      scoreMaxInput:  item.scoreMax,
      id: item._id,
      statusInput: item.status,
      scoreInput:  item.score
    
    })
  }

  changeCompanySet (valueselect)
  {

  }
  onChange(key, val) {
    this.setState({ [key]: val })
  }
  reloadPage() {
    
   
    this.openModal();
    window.location.reload();

  }

  saveBeauty() {

    
  var baseUrlapi = "https://soida-api.placentor.com.vn";
    let url = baseUrlapi + "/api/gameBeauty/adminUpdate";
    
    const bodyRequest = {
        id: this.state.id,
      status: this.state.statusInput,
      score: this.state.scoreInput,
      scoreMax: this.state.scoreMaxInput
    };
     axios
    .post(url,bodyRequest )
    .then((res) => {
             Swal.fire({
              title: 'thao tác thành công!',
              timer: 3000,    
            }
            
            );
            this.reloadPage();
    });
 
};
  render() {
    return (
      <>
      
       
        <div class="flex-a-center config-box-border">
        
        <table  className="table table-hover table-outline mb-0  d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      <th className="text-center">Tên công ty</th>
                      <th className="text-center">Điểm mỗi lươt soi</th>
                      <th className="text-center">Điểm tối đa	</th>
                         
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Danh sách</th>
                      <th className="text-center">Chỉnh sửa</th>
                          </tr>
                  </thead>
                  <tbody>
             
                    {
                      this.props.dataListBeauty.map((item, i) => {
                    
                        var x =  this.props.dataCompany.find(x => x._id ===  item.companyId);

                        const dataCompany = this.props.dataCompany;
              
                        var compnayName ="";
                        if(x)
                        {
                          compnayName  = x.Name;
                        }
                        if(compnayName )
                        {
                        }
                        else 
                        {
                          return;
                        }
                        return (
                              <tr >
                                      <td className="text-center">1 </td>
                                      <td className="text-center">{compnayName}</td>
                                      <td className="text-center">{item.score}</td>
                                      <td className="text-center">{item.scoreMax}</td>
                                      <td className="text-center">{this.getstatusItem(item.status)}</td>
                                        
                                      <td className="text-center">
                                          <CButton outline color="primary" ><CIcon name="cil-magnifying-glass" /> Xem chi tiết</CButton>
                                      </td>
                                      <td className="text-center">
                                          <CButton outline color="primary"  onClick={e => this.editdata(item)} ><CIcon name="cis-update" /> Sửa</CButton>
                                      
                                      </td>
                            </tr>
                        )

                      })
                     }
                            
                 
                  </tbody>

                </table>
         
        </div>


        <Modal isOpen={this.state.modalCom} >
            <ModalHeader>{'new' == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="scoreInput"
                label="Điểm mỗi lượt soi"
              value ={this.state.scoreInput}
              onChange={e => this.onChange("scoreInput", e.target.value)}
              />

              <TextFieldGroup
                field="scoreMaxInput"
                label="Điểm tối đa"
                value ={this.state.scoreMaxInput}
                onChange={e => this.onChange("scoreMaxInput", e.target.value)}
              />
               <CSelect
                 onChange={e => this.onChange("statusInput", e.target.value)}   custom size="sm" name="company_idSearch" 
                 value ={this.state.statusInput}
                 id="company_idSearch">
                     
                          <option   value ="1">
                          Hoạt động
                          </option>
                          <option   value ="0">
                          không hoạt động
                          </option>
                    
                    </CSelect>

            
            </ModalBody>

            <ModalFooter>
              <CButton color="primary"  onClick={e => this.saveBeauty()} >Lưu</CButton>
              <CButton color="secondary" onClick={e => this.openModal()} >Đóng</CButton>
            </ModalFooter>
          </Modal>
       
        
      </>
    );
  }
}
