import React, { Component } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "react-datepicker/dist/react-datepicker.css";
import Constants from "../../contants/contants";
import axios from "axios";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { IoLogoBuffer } from "@react-icons/all-files/io/IoLogoBuffer";
import BannerAia from "./configWeb/BannerAia";
import Logo from "./configWeb/GameConfig";
import Swal from 'sweetalert2';
let headers = new Headers();
const auth = localStorage.getItem("auth");
headers.append("Authorization", "Bearer " + auth);
headers.append("Content-Type", "application/json");
class ConfigWeb extends Component {
  constructor(props) {
    super(props);

    if(localStorage.type !='2')
    {
      this.state = {
        tabNameConfig: [
         
        ],
        company_id: JSON.parse(localStorage.getItem("user")).company_id
          ? JSON.parse(localStorage.getItem("user")).company_id
          : null,
        poupintro: "",
        pupupSuccess: "",
        popupfail: "",
        fromDate: "",
        todate: "",
        fromtime: "",
        totime: "",
        scoreMax: "",
        title: "nghia",
        slch: "",
        titleProduct: "",
        priceText: "",
        butonText:"",
        imageLink: "",
        minisize: "",
        linkRegister:"",
        score: "",
        dataListBeauty: [],
        dataCompany: []
  
  
      };
    }
    else 
    {
      this.state = {
        tabNameConfig: [
            {
            _id: "4",
            name: "Cài đặt",
            icon: <IoLogoBuffer style={{ width: "24px ", height: "24px " }} />,
          }
      
        ],
        company_id: JSON.parse(localStorage.getItem("user")).company_id
          ? JSON.parse(localStorage.getItem("user")).company_id
          : null,
        poupintro: "",
        pupupSuccess: "",
        popupfail: "",
        image: "",
        fromDate: "",
        todate: "",
        fromtime: "",
        totime: "",
        scoreMax: "",

        score: "",
        dataListBeauty: [],
        dataCompany: []
  
  
      };
    }
   
  }

  ToggleViewConfigWeb(id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    const { tabNameConfig } = this.state;
    for (i = 0; i < tabNameConfig.length; i++) {
      if (tabNameConfig[i]._id === id) {
        // tablinks[i].classList.add("tabcontent-left-active");
      } else {
        // tablinks[i].classList.remove("tabcontent-left-active");
      }
    }
    for (i = 0; i < tabcontent.length; i++) {
      if (tabcontent[i].id.replace("tabcontent", "") === id) {
        tabcontent[i].classList.add("defaultOpen");
        tabcontent[i].style.animation = "hideOpa 1s ease-in-out";
      } else {
        tabcontent[i].classList.remove("defaultOpen");
        tabcontent[i].style.animation = "none";
      }
    }
  }
  onChangeImage = (e, value, valueLink, valueShow) => {
    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ [valueLink]: files[0] });
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({ [value]: e.target.result, [valueShow]: e.target.result });
    };
  };
  async componentDidMount() {
 
      await this.getDataConfigWeb();
 
      this.ToggleViewConfigWeb("4");
  }

  async getAllDataCompany (){
    
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + Constants.List_All_company;
   
    await axios
      .post(url, {
        params: {

        
        },
      })
      .then((res) => {
        
        var data = res.data;
      
      
           this.setState(
          {
        
            dataCompany: data.data.dataCompany
           
          },
          () => {

           
          }
        );
      });

  }

 async dataListBeauty ()
 {

  var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/minisize/getall";
   
    await axios
      .get(url, {
        params: {

        
        },
      })
      .then((res) => {
        
        var data = res.data.data;
      
           this.setState(
          {
        
            dataListBeauty: data
           
          },
          () => {

           
          }
        );
      });

 }
 
 async getDataConfigWeb() {
  
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/minisize/getInfoAdmin";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .get(url, {
        params: {

          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        
        
        var data = res.data.data;
        console.log(data);
           this.setState(
          {

            butonText:data.butonText,
            imageLink: data.imageLink, 
            linkRegister: data.linkRegister,
            priceText: data.priceText, 
            slch:data.slch,
            title:data.title,
            countDown:data.countDown,  
            showUp:data.showUp,  
            titleProduct: data.titleProduct,
            image: data.imageLink,
            minisize: data.minisize
           
           
          },
          () => {

            console.log(this.state);
          }
        );
      });
  }


  async getDataBeautyUser() {
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/get-data-beauty-user";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .get(url, {
        params: {
          company_id: Output_newComany_id,

        },
      })
      .then((res) => {
        
         var data = res.data.data;
          this.setState(
          {
            dataGame1 : data
          },
          () => {

            
          }
        );
      });
  }
  async getDataGame() {
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/get-game-data-1";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .get(url, {
        params: {
          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        
         var data = res.data.data;
          this.setState(
          {
            dataGame : data
          },
          () => {

            console.log(data);
          }
        );
      });
  }

  SaveAllConfigWeb = async (change) => {

    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/minisize/update";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    const bodyRequest = {
      company_id: Output_newComany_id,
      butonText:this.state.butonText,
      imageLink: this.state.image, 
      linkRegister: this.state.linkRegister,
      priceText: this.state.priceText, 
      slch:this.state.slch,
      title:this.state.title,
      minisize: this.state.minisize, 
      countDown: this.state.countDown, 
      showUp: this.state.showUp, 
      
      titleProduct: this.state.titleProduct

};
    

    await axios
    .post(url,bodyRequest )
    .then((res) => {
             Swal.fire({
              title: 'thao tác thành công!',
              timer: 3000,    
            });
    });
 
  };

  setStateByName = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
           <Logo
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
              
                  pupupSuccess={this.state.pupupSuccess}
                  poupintro={this.state.poupintro}
                  popupfail={this.state.popupfail}
                  image =  { this.state.image}
                  butonText={this.state.butonText}
                  imageLink={this.state.imageLink}
                  linkRegister= {this.state.linkRegister}
                  priceText={this.state.priceText}
                  slch={this.state.slch}
                  title= {this.state.title}
                  countDown = {this.state.countDown}
                  showUp = {this.state.showUp}
                  
                  minisize = {this.state.minisize}
                  titleProduct= {this.state.titleProduct}
                />
        
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

export default ConfigWeb;
