import React, { Component } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../contants/contants";
import axios from "axios";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { IoLogoBuffer } from "@react-icons/all-files/io/IoLogoBuffer";
import BannerAia from "./configWeb/BannerAia";
import Logo from "./configWeb/GameConfig";
import Seo from "./configWeb/Content";
import DataGame from "./configWeb/gameUser";
import { BiSlideshow } from "react-icons/bi";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";

import Swal from 'sweetalert2';
let headers = new Headers();
const auth = localStorage.getItem("auth");
headers.append("Authorization", "Bearer " + auth);
headers.append("Content-Type", "application/json");
class ConfigWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNameConfig: [
       
       

        {
          _id: "9",
          name: "Banner game",
          icon: <BiSlideshow style={{ width: "24px ", height: "24px " }} />,
        },
        {
          _id: "12",
          name: "Danh sách tham gia ",
          icon: <BiSlideshow style={{ width: "24px ", height: "24px " }} />,
        },
        
        {
          
          _id: "13",
          name: "Danh sách trúng thưởng ",
          icon: <BiSlideshow style={{ width: "24px ", height: "24px " }} />,
        },
      
        {
          _id: "4",
          name: "Cấu hình game",
          icon: <IoLogoBuffer style={{ width: "24px ", height: "24px " }} />,
        },
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
      skinNumber: "",
      dataGame:  [],
      statusGame: "",
    };
  }

  ToggleViewConfigWeb(id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    const { tabNameConfig } = this.state;
    for (i = 0; i < tabNameConfig.length; i++) {
      if (tabNameConfig[i]._id === id) {
        tablinks[i].classList.add("tabcontent-left-active");
      } else {
        tablinks[i].classList.remove("tabcontent-left-active");
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
      await this.getDataGame();
      await this.getDataGame1();
      this.ToggleViewConfigWeb("9");
  }

  async getDataConfigWeb() {
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/game/getInfo";
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
          gameType: "1",

          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        
        var data = res.data.data;
        console.log(data);
        
           this.setState(
          {
            idUpdate: data._id,
            poupintro: data.poupintro,
            pupupSuccess: data.pupupSuccess,
            popupfail: data.popupfail,
            fromDate: data.fromDate,
            todate: data.todate,
            fromtime: data.fromtime,
            totime: data.totime,
            skinNumber: data.skinNumber,
            statusGame: data.statusGame,
            imageBannerDesktop: data.imageBannerDesktop,
            imageBannerMobile: data.imageBannerMobile,
            hrefImageBannerMobile: data.hrefImageBannerMobile,
            hrefImageBannerDesktop: data.hrefImageBannerDesktop
          },
          () => {

            console.log(this.state);
          }
        );
      });
  }

  async getDataGame1() {
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/get-game-data-11";
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
    let url = baseUrlapi + "/api/game/update";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    const bodyRequest = {
      gameType: "1",
      company_id: Output_newComany_id,
      poupintro: this.state.poupintro,
      pupupSuccess: this.state.pupupSuccess,
      popupfail: this.state.popupfail,
      fromDate: this.state.fromDate,
      todate: this.state.todate, 
      fromtime: this.state.fromtime,
      totime: this.state.totime, 
      skinNumber: this.state.skinNumber,
      statusGame: this.state.statusGame,
      typeGame: "1",
      imageBannerDesktop: this.state.imageBannerDesktop,
      hrefImageBannerDesktop: this.state.hrefImageBannerDesktop,
      imageBannerMobile: this.state.imageBannerMobile,
      hrefImageBannerMobile: this.state.hrefImageBannerMobile


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
          <div className="flex-tabs">
            <div className="tab">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {this.state.tabNameConfig
                  ? this.state.tabNameConfig.map((item, i) => {
                      return (
                        <ListItemButton
                          key={item._id}
                          className={
                            i === 0
                              ? " tablinks tabcontent-left-active"
                              : " tablinks"
                          }
                          onClick={() => this.ToggleViewConfigWeb(item._id)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText
                            className="tabcontent-left"
                            style={{
                              fontSize: "14px !important",
                              color: "rgb(52, 71, 103)",
                            }}
                            primary={item.name}
                          />
                        </ListItemButton>
                      );
                    })
                  : null}
              </List>
            </div>
            <div className="tabcontents">
              <div id="tabcontent3" className="tabcontent">
                <Seo
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
         
                  pupupSuccess={this.state.pupupSuccess}
                  poupintro={this.state.poupintro}
                  popupfail={this.state.popupfail}
                  fromDate={this.state.fromDate}
                  todate={this.state.todate}
                  fromtime={this.state.fromtime}
                  totime={this.state.totime}
                  skinNumber={this.state.skinNumber}
                  statusGame={this.state.statusGame}
                />
              </div>

              

              <div id="tabcontent12" className="tabcontent">
                <DataGame
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  GameData  = {this.state.dataGame}
                  typeGetData = {0}
                  pupupSuccess={this.state.pupupSuccess}
                  poupintro={this.state.poupintro}
                  popupfail={this.state.popupfail}
                  fromDate={this.state.fromDate}
                  todate={this.state.todate}
                  fromtime={this.state.fromtime}
                  totime={this.state.totime}
                
                  skinNumber={this.state.skinNumber}
                  statusGame={this.state.statusGame}
                />
              </div>

              <div id="tabcontent13" className="tabcontent">
                <DataGame
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  GameData  = {this.state.dataGame1}
                  typeGetData = {1}
                 
                  pupupSuccess={this.state.pupupSuccess}
                  poupintro={this.state.poupintro}
                  popupfail={this.state.popupfail}
                  fromDate={this.state.fromDate}
                  todate={this.state.todate}
                  fromtime={this.state.fromtime}
                  totime={this.state.totime}
                  skinNumber={this.state.skinNumber}
                  statusGame={this.state.statusGame}
                />
              </div>

              <div id="tabcontent9" className="tabcontent">
                <BannerAia
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage = {this.onChangeImage}
                  imageBannerDesktop={this.state.imageBannerDesktop}
                  hrefImageBannerDesktop={this.state.hrefImageBannerDesktop}
                  imageBannerMobile={this.state.imageBannerMobile}
                  hrefImageBannerMobile={this.state.hrefImageBannerMobile}
                />
              </div>
              <div id="tabcontent4" className="tabcontent ">
                <Logo
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
              
                  pupupSuccess={this.state.pupupSuccess}
                  poupintro={this.state.poupintro}
                  popupfail={this.state.popupfail}
                  fromDate={this.state.fromDate}
                  todate={this.state.todate}
                  fromtime={this.state.fromtime}
                  totime={this.state.totime}
                  skinNumber={this.state.skinNumber}
                  statusGame={this.state.statusGame}
                />
              </div>
            </div>
          </div>
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
