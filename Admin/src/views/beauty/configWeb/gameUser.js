import { Component } from "react";
import TextFieldGroup from "../../Common/TextFieldGroup";
import { Button } from "reactstrap";
import IframeModal from '../../components/Iframe';
import CIcon from '@coreui/icons-react';
import {
  CButton
} from '@coreui/react'
import {
    CTextarea,
  } from "@coreui/react";
  export default class GameUser extends Component {
   
  SaveAllConfigWeb() {
    this.props.SaveAllConfigWeb();
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage=(e, name, name_link, name_show) =>{
    this.props.onChangeImage(e, name, name_link, name_show);
}


viewHistory = (e) => {

  window.open("/#/lich-su-ca-nhan/"+ e, "_blank");

}
  render() {
    return (
      <>
      
        <table  className="table table-hover table-outline mb-0  d-sm-table">
                  <thead className="thead-light">
                        <tr>
                            <th className="text-center">STT.</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Số điện thoại</th>
                            <th className="text-center">Hình ảnh</th>
                            <th className="text-center">Thông tin kết quả</th>
                            <th className="text-center">Ngày than gia</th>
                            <th className="text-center">Thông tin</th>
                        </tr>
                  </thead>
                  <tbody>
           
                   
                    {
                      this.props.GameData != undefined ?
                      this.props.GameData.map((item, i) => {
                      return (
                             <tr key={i}>
                              <td className="text-center">{i+1}</td>
                                   <td className="text-center">{item.UserName}</td>
                                   <td className="text-center">{item.Phone}</td>
                                   <td className="text-center">
                                         <img src={item.Image} style={{ width: '100px', height: 50 }} />
                                   </td>
                                   <td className="text-left">
                                    
                                         <p>Loại game: <strong>Game tuổi da</strong>  </p>
                                         <p>Độ tuổi trúng game:  <strong>26 </strong>  </p>
                                         <p>Độ tuổi thực:  <strong>{ item.ageGameReal} </strong>  </p>

                                         <p>Trúng thưởng:   <strong>{item.successGame? "Trúng thưởng": "Không" } </strong></p>
                                    </td>
                                   
                                   <td className="text-center">
                                          <p>{(new Date(item.Create_Date)).toLocaleDateString()} </p> 
                                          
                                          <p>{(new Date(item.Create_Date)).toLocaleTimeString()} </p>
                                            
                                    </td>

                                    <td className="text-center">
                                      <CButton outline color="primary" onClick={e => {
                                      this.viewHistory(
                                         item._id
                                      )
                                      }}
                                
                                ><CIcon name="cil-magnifying-glass" /> Xem chi tiết</CButton>
                                     </td>


                              </tr>
                          );
                        }) : ""
                    }
                  </tbody>

               
        </table>
      
   
      </>
    );
  }
}
