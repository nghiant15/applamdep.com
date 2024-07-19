import React, { Component } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from "reactstrap";

import {
  CLabel,
  CTooltip,
  CSelect,
  CButton,
  CTextarea,
  CRow,
  CCol,
} from "@coreui/react";
import CreatableSelect from "react-select/creatable";
import TextFieldGroup from "../../views/Common/TextFieldGroup";
import CIcon from "@coreui/icons-react";
import "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../contants/contants";
import axios from "axios";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as actionProductSuggest from "../../redux/actionsForder/productSuggest";
import API_CONNECT from "../../functions/callAPI";
let headers = new Headers();
const auth = localStorage.getItem("auth");
headers.append("Authorization", "Bearer " + auth);
headers.append("Content-Type", "application/json");
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      action : "new",
      modalCom: false,
      updated: "",
      dataApi: [],
      delete: null,
      hidden: true,
      token: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      role: localStorage.getItem("role"),
      type: localStorage.getItem("type"),
      company_id: localStorage.getItem("user"),
      current_slug: "",
      companyID: "",
      arrTotalPackage: [],
      isChange: true,
      isChangeSlug: true,
      currentPassword: "",
      isLoading: false,
      isDisable: true,
      Email: "",
      Name: "",
      Phone: "",
      Address: "",
      UserName: "",
      Message_Code: "",
      productsSuggest: ["k5", "k6", "k7", "k8", "k9"],
      listK5: [],
      Current : "",
      listK6: [],
      listK7: [],
      listK8: [],
      listK9: [],
      updateLevel : "",

      updateId : "",
      updateName : "",
      updateDesc : "",
      updategroupProduct : "",
      updateTitle : "",
      modalEdit : null,
      modal: null,
      statusModal : true,
      statusModalUpdate : false,
      valueModal : {
        title : "",
        content : "",
        level : "",
        priorites : "",
        type : "",
        groupProduct : "",
        icon :"",
        status: ""
      },
      image :"",
      link  :"",
      image_show : "",
      image_link : "",

    };
  }
  async getDataConfigDisplay (){
    var baseUrlapi = Constants.BASE_URL+ "/" 
    let url =baseUrlapi+ "/api/get-conclude";
    await axios.get(
      url,{
        params : {
          "companyId": this.state.companyID,
          "level" : 1,
          "typeFilter" : 1
        }    
      }
    ).then((res)=>{
      
    })
  }
  async componentDidMount() {
    this.getDataConfigDisplay();
    this.getProductsSuggestRequest("0");
    this.getData();
    let arr = JSON.parse(localStorage.getItem("url"));
    for (let i = 0; i < arr.length; i++) {
      if ("#" + arr[i].to == window.location.hash) {
        if (arr[i].hidden == true) {
          window.location.href = "#/";
        }
      }
    }
  }
  getProductsSuggestRequest = async (number) => {

    let companyId = this.state.companyID;

    if(this.state.companyID == null || this.state.companyID == "" )
    {
      companyId = JSON.parse(localStorage.user).company_id;
    }
    let list5 = null;
    let list6 = null;
    let list7 = null;
    let list8 = null;
    let list9 = null;
    var url = Constants.BASE_URL+ "/"
    list5 = await axios.get(
      `${url}api/paramenterRecomed/getAll`,
      {
        params: {
          typeFilter: number,
          company_id: companyId,
          groupProduct: "K5",
        },
      }
    );
    list6 = await axios.get(
      `${url}api/paramenterRecomed/getAll`,
      {
        params: {
          typeFilter: number,
          company_id: companyId,
          groupProduct: "K6",
        },
      }
    );
    list7 = await axios.get(
      `${url}api/paramenterRecomed/getAll`,
      {
        params: {
          typeFilter: number,
          company_id: companyId,
          groupProduct: "K7",
        },
      }
    );
    list8 = await axios.get(
      `${url}api/paramenterRecomed/getAll`,
      {
        params: {
          typeFilter: number,
          company_id: companyId,
          groupProduct: "K8",
        },
      }
    );
    list9 = await axios.get(
      `${url}api/paramenterRecomed/getAll`,
      {
        params: {
          typeFilter: number,
          company_id: companyId,
          groupProduct: "K9",
        },
      }
    );
    this.setState({
      listK5: list5.data.data,
      listK6: list6.data.data,
      listK7: list7.data.data,
      listK8: list8.data.data,
      listK9: list9.data.data,
    });
  };
  getData = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.PLUGIN_GET_USER_BYID,
      method: "POST",
      headers: this.state.token,
    });
    let val = res.data.data;

    this.setState({
      dataApi: val,
      data: val,
      currentPassword: val.Password,
      isLoading: false,
      current_slug:
        val.Company_Id == null || val.Company_Id == undefined
          ? null
          : val.Company_Id.Slug,
      companyID:
        val.Company_Id == null || val.Company_Id == undefined
          ? null
          : val.Company_Id._id,
      Email: val.Email,
      Name: val.Name,
      Phone: val.Phone,
      Address: val.Address,
      UserName: val.UserName,
      Message_Code: val.Message_Code,
      isDisable: true,
    });
  };
  async addBrand() {

    const { name, image, link, image_link, image_mobile_link} = this.state
    if (name == null || name == '' ||
      image == null || image == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const form = new FormData();
    form.append("image", image_link);
    await API_CONNECT(Constants.UPLOAD_IMAGE_BRAND, form, "", "POST")
    const form2 = new FormData();
    form2.append("image", image_mobile_link);
    
    await API_CONNECT(Constants.UPLOAD_IMAGE_BRAND, form2, "", "POST")

    const body = {
      name: name,
      image: image,
      image_link: image_link.name,
      image_mobile_link: image_mobile_link == undefined  || image_mobile_link == "" ? "" : image_mobile_link.name,
      company_id: this.state.type == '0' || this.state.type == '1' ? "" : JSON.parse(this.state.user).company_id,
      link: link
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.ADD_Banner,
      method: 'POST',
      data: body
    });
 
    if (res.status == 200) {
        
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      }
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert("Thêm thương hiệu thất bại");
      this.setState({ isLoading: false });
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val });
      console.log(key,val)
  }
  onChangeModal = (e) => {
  
    var target = e.target;
    var name = target.name;
    var value = target.value;
  console.log(value);

    this.setState({
      [name]: value,
    });
  
    
  };
  openUpdate(name_link) {
    this.setState({
      [name_link]: !this.state[name_link],
    });
  }

  changeLevel = (e) => {
    e.preventDefault();
    this.setState({
      updateLevel: e.target.value,
    });
  };
  getPackageName = async (package_id) => {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.PLUGIN_DATA_PACKAGE,
      method: "POST",
      data: {
        package_id: package_id,
      },
    });
    return resPackage.data.data;
  };

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async updatePassword(id, password) {
    const res = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.PLUGIN_UPDATE_PASSWORD,
      method: "POST",
      data: {
        id: id,
        new_password: password,
      },
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ isChange: true });
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  async updateSlug() {
    const res = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.UPDATE_SLUG,
      method: "POST",
      data: {
        id: this.state.companyID,
        Slug: this.state.current_slug,
      },
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ isChangeSlug: true });
    } else {
      alert(res.data.message);
      this.setState({ isChangeSlug: false });
    }
  }

  async updateCompany() {
    const { Email, Name, Phone, Address, UserName, data, Message_Code } =
      this.state;

    if (
      Name == null ||
      Name == "" ||
      Phone == null ||
      Phone == "" ||
      UserName == null ||
      UserName == ""
    ) {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return;
    }

    const body = {
      isHash: false,
      Name: Name == "" ? data.Name : Name,
      Email: Email == "" ? data.Email : Email,
      Phone: Phone == "" ? data.Phone : Phone,
      Address: Address == "" ? data.Address : Address,
      UserName: UserName == "" ? data.UserName : UserName,
      Message_Code:
        Message_Code == "" || Message_Code == null
          ? data.Message_Code
          : Message_Code,
      Password: data.Password,
      Status: data.Status,
      id: data._id,
    };

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL+ "/",
      url: Constants.PLUGIN_UPDATE_USER_COMPANY,
      method: "POST",
      data: body,
    });

    if (res.data.is_success == true) {
      this.getData();
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }
  onChangeImage(e) {
    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ image_link: files[0] });
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({ image: e.target.result, image_show: e.target.result });
    };
    
  }
  openFormAdd = (k) => {
    this.setState({ 
      action: "new", 
      updateLevel: "1",
      statusModalUpdate : true ,
      updateId : "",
      updateName : "",
      updateDesc : "",
      updategroupProduct: k,
      updateTitle : "",
      image :"",
      link  :"",
      image_show : "",
      image_link : "",
    
    });
    
  };
  async openFormEdit(item){

    this.setState({
      image : item.Icon,
      updateLevel : item.Level,
      action: "edit", 
      updategroupProduct : item.GroupProduct,
      updateTitle : item.Title,
      image_show : item.Icon,
      updateDesc : item.Content,
      statusModalUpdate : true,
      updateId : item._id
    })
    
    
  }
 
  closeFormEdit=()=>{
    this.setState({ statusModalUpdate: false });

  }
 
  async saveAdd(){
    const {
      updateId ,
      updateName ,
      updateLevel,
      updateDesc  ,
      updategroupProduct ,
      updateTitle ,
      image ,
      link  ,
      image_show  ,
      image_link  ,
    } = this.state;
    let url = Constants.BASE_URL+ "/"

    console.log("333",this.state );
    await axios.post(

      `${url}api/paramenterRecomed/add`,{
        "title": updateTitle,
        "content": updateDesc,
        "companyId": this.state.companyID,
        "level": updateLevel,
        "priorites" : "1",
        "type": "0",
        "groupProduct": updategroupProduct,
        "icon":image_show,
        "status":"1"
      }
    ).then(()=>{
      this.setState({ statusModalUpdate: false });


      this.getProductsSuggestRequest("0")
    });
  }
  async saveEdit(){
    const {
      updateId ,
      updateName ,
      updateDesc  ,
      updategroupProduct ,
      updateTitle ,
      updateLevel,
      image,
      link  ,
      image_show  ,
      image_link  ,
    } = this.state;
   

  
    let url = Constants.BASE_URL+ "/"
    await axios.post(

      `${url}api/paramenterRecomed/update`,{
      "id":updateId,
          "title" : updateTitle,
          "content": updateDesc,
          "level": updateLevel,
          "companyId":this.state.companyID,
          "priorites": "1",
          "type": "0",
          "groupProduct": updategroupProduct,
          "icon":image_show,
        
      }
    ).then(()=>{
      this.setState({ statusModalUpdate: false });
      this.getProductsSuggestRequest("0")
    })
  }
  async removeItem(id,k){
    let url = Constants.BASE_URL+ "/"
    await axios.post(

      `${url}api/paramenterRecomed/delete`,{
        id: id,
      }
    ).then(()=>{
   
      this.getProductsSuggestRequest("0")
    })
  }
  closeAdd=()=>{
    this.setState({ modal: null });
  }

  closeForm=()=>{
    this.setState({ statusModalUpdate: false });
    
  }
  
  renderProductsSuggest(products,idSelect,idSelect2,name,activeCollapse,valueK){
    if(products){
      let x = products.map((item,i) => {
        return (
                  <tbody>
                    <td
                      colSpan="10"
                      hidden={this.state.hidden}
                      className="text-center"
                    >
                      Không tìm thấy dữ liệu
                    </td>
                                     
                            <tr key={i}>
                              <td className="text-center">
                                {i + 1}
                              </td>
                              <td className="text-center">
                                {item.Title}
                                 
                              </td>
                              {/* <td className="text-center">{item.name}</td> */}
                              {/* <td className="text-center">
                               
                                  <img
                                    src={`${item.Icon}`}
                               
                                    height={"100px"}
                                    alt=""
                                  />
                              
                                
                              </td> */}
                              {/* <td className="text-center" >
                                  {item.Content}
                                 
                              </td> */}
                              <td className="text-center">
                              {item.Level === "1" ? "Nhẹ" : item.Level === "2" ? "Trung bình" : item.Level === "3" ? "Nặng" : "Không có"}

                              </td>
                              {/* <td className="text-center">
                                {Number(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ
                              </td> */}
                              <td className="">
                              <CButton
                                  outline
                                  color="success"
                                  size="sm"
                                  onClick={() => this.openFormEdit(item)}
                                >
                                  {/* <CIcon name="cilTrash" /> */}
                                  Chỉnh sửa
                                </CButton>{" "}
                                <CButton
                                  style={styles.mgl5}
                                  outline
                                  color="danger"
                                  size="sm"
                                  onClick={() =>
                                     this.removeItem(item._id, item.GroupProduct)
                                  }
                                >
                                  {/* <CIcon name="cilPencil" /> */}
                                 Xóa
                                </CButton>
                               
                              </td>
                            </tr>
                  </tbody>         
                          
                )
      })         
      let idSelectActive = `#${idSelect2}`     
  
 
      let render = (
        <div class="accordion-item">
            <h2 class="accordion-header" id={idSelect}>
            {
              activeCollapse ? <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={idSelectActive}
                aria-expanded="true"
                aria-controls={idSelect2}
              >
                {name}
              </button> : <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={idSelectActive}
                aria-expanded="true"
                aria-controls={idSelect2}
              >
                {name}
              </button>
            }
              
            </h2>
            {
              activeCollapse ? <div
              id={idSelect2}
              class="accordion-collapse collapse show"
              aria-labelledby={idSelect}
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
              <div class="flex-center">

              <CButton
                                  style={styles.mgl5}
                                  outline
                                  color="primary"
                                  size="md"
                                  onClick={() =>
                                     this.openFormAdd(valueK)
                                  }
                                >
                                  {/* <CIcon name="cilPencil" /> */}
                                 Thêm mới
                                </CButton>

              </div>
                <table
                  ble
                  className="table table-hover mt-3 table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      {/* <th className="text-center">Tên</th> */}
                      <th className="text-center">Tiêu đề</th>
                      {/* <th className="text-center">Ảnh</th>
   */}
                      {/* <th className="text-center">Nội dung</th> */}
                  
                      {/* <th className="text-center">Thương hiệu</th> */}
                      {/* <th className="text-center">Ảnh thương hiệu</th> */}
                      {/* <th className="text-center">Loại</th>
                      <th className="text-center">Loại SDK </th> */}
                      <th className="text-center">Mức độ</th>
                      {/* <th className="text-center">Giá</th> */}
                      <th className="text-center">#</th>
                    </tr>
                  </thead>
                    {x}
                  </table>
              </div>
            </div> : 
            <div
              id={idSelect2}
              class="accordion-collapse collapse"
              aria-labelledby={idSelect}
              data-bs-parent="#accordionExample"
            >
            
              <div class="accordion-body">
              <div class="flex-center">
              <CButton
                                  style={styles.mgl5}
                                  outline
                                  color="primary"
                                  size="md"
                                  onClick={() =>
                                     this.openFormAdd(valueK)
                                  }
                                >
                                  {/* <CIcon name="cilPencil" /> */}
                                 Thêm mới
                                </CButton>
              </div>
                <table
                  ble
                  className="table table-hover mt-3 table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      {/* <th className="text-center">Tên</th> */}
                      <th className="text-center">Tiêu đề</th>
                      {/* <th className="text-center">Ảnh</th>
                      <th className="text-center">Nội dung</th> */}
  
                      {/* <th className="text-center">Chi tiết</th> */}
                      {/* <th className="text-center">Thương hiệu</th> */}
                      {/* <th className="text-center">Ảnh thương hiệu</th> */}
                      {/* <th className="text-center">Loại</th>
                      <th className="text-center">Loại SDK </th> */}
                      <th className="text-center">Mức độ</th>
                      {/* <th className="text-center">Giá</th> */}
                      <th className="text-center">#</th>
                    </tr>
                  </thead>
                    {x}
                  </table>
              </div>
            </div>
            }
            
        </div>
      )
      return render
    } 
  }
  render() {
    
    const {
      data,
      current_slug,
      isChange,
      currentPassword,
      isChangeSlug,
      type,
      isDisable,
      Email,
      Name,
      Phone,
      Address,
      UserName,
      Message_Code,
    } = this.state;

    const arrLevel = [
      {
        item : "1"
      },
      {
        item : "2"
      },
      {
        item : "3"
      },
    ];
   
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          

          <div class="accordion" id="accordionExample">
            {this.renderProductsSuggest(this.state.listK5,"headingOne","collapser1","Hỗ trợ giảm lão hóa da",true,"K5")}
            {this.renderProductsSuggest(this.state.listK6,"headingTwo","collapser2","Hỗ trợ điều trị mụn",false,"K6")}
            {this.renderProductsSuggest(this.state.listK7,"headingThree","collapser3","Hỗ trợ giảm quầng thâm mắt",false,"K7")}
            {this.renderProductsSuggest(this.state.listK8,"headingFour","collapser4","Hỗ trợ giảm lỗ chân lông",false,"K8")}
            {this.renderProductsSuggest(this.state.listK9,"headingFive","collapser5","Hỗ trợ giảm thâm nám da",false,"K9")}
                                  
          </div>
    

          <Modal
        size="xl"
        isOpen={this.state.statusModalUpdate}
        className={this.props.className}
      >
        <ModalHeader>
        {this.state.action === 'new' ? `Tạo mới` : `Cập nhật`}
        </ModalHeader>
        <ModalBody>
        <TextFieldGroup
            field="updateTitle"
            label="Tiêu đề"
            value={this.state.updateTitle}
            placeholder={"Tiêu đề"}
            onChange={e => {
            this.setState({ updateTitle: e.target.value });
            
           
       }}

            />
          

        <br></br>

          <label className="control-label">Mô tả</label>
          <CKEditor
                    editor={ ClassicEditor }
                    data={
                      this.state.updateDesc
                    }
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                       
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                       
                        this.setState({ updateDesc: data });
                    } }
                    onBlur={ ( event, editor ) => {
                        
                    } }
                    onFocus={ ( event, editor ) => {
                        
                    } }
                />
          {/* <CTextarea
            name="updateDesc"
            rows="4"
            value={this.state.updateDesc}
            onChange={(e) => {
              this.setState({ updateDesc: e.target.value });
            }}
            
          /> */}

          
         
          <div style={{ width: "100%" }} className="mt-3">
                <CLabel>Mức độ:</CLabel>
                {
                  arrLevel != undefined ? (
                    <CSelect onChange={
                      async e => {this.changeLevel(e)}
                      
                    } custom size="sm" name="updateLevel" id="SelectLm">
                      {
                        arrLevel.map((item, i) => {
                          if(item.item === this.state.updateLevel){
                            return (
                              <option selected key={i} value={item.item}>
                                {item.item === "1" ? "Nhẹ" : item.item === "2" ? "Trung" : "Nặng"}
                              </option>
                            );
                          }
                            else {
                            return (
                              <option key={i} value={item.item}>
                                {item.item == "1" ? "Nhẹ" : item.item == "2" ? "Trung" : "Nặng"}
                              </option>
                            );
                          
                          }                         
                            
                          })
                      }
                    </CSelect>
                  ) : null
                }
              </div>

        
        </ModalBody>
        <ModalFooter>
          <CButton
            color="primary"
            onClick={
              ()=>{ this.state.action === 'new' ? this.saveAdd() : this.saveEdit() }}
            disabled={this.state.isLoading}
          >
            Lưu
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={()=>{this.closeForm()}}
          >
            Đóng
          </CButton>
        </ModalFooter>
      </Modal>
        </div>
      );
    }

    return (
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={50}
          color={"#123abc"}
          loading={this.state.isLoading}
          speedMultiplier={1.5}
        />
      </div>
    );
  }
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  datePicker: {
    marginBottom: 20,
  },
  wa10: {
    width: "5%",
    float: "left",
    height: "80px",
  },
  pagination: {
    marginRight: "5px",
  },
  flexLabel: {
    width: 100,
  },
  flexOption: {
    width: 200,
    margin: "1px",
  },
  a: {
    textDecoration: "none",
  },
  floatRight: {
    float: "right",
    marginTop: "3px",
  },
  spinner: {
    width: "30px",
  },
  center: {
    textAlign: "center",
  },
  tbody: {
    height: "380px",
    overflowY: "auto",
  },
  wh12: {
    width: "10%",
    float: "left",
    height: "80px",
  },
  wh15: {
    width: "15%",
    float: "left",
    height: "80px",
  },
  w5: {
    width: "12%",
    float: "left",
    height: "80px",
  },
  row: {
    float: "left",
    width: "100%",
  },
  success: {
    color: "green",
  },
  danger: {
    color: "red",
  },
  mgl5: {
    marginLeft: "5px",
  },
  tags: {
    float: "right",
    marginRight: "5px",
  },
  searchInput: {
    width: "100%",
    display: "inline-block",
    margin: "1px",
  },
  userActive: {
    color: "green",
  },
  userPending: {
    color: "red",
  },
  nagemonNameCol: {
    width: "328px",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "99999px",
  },
};

export default Users;
