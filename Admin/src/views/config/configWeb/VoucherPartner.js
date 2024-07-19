
import { Component } from "react";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import { CButton } from "@coreui/react";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { MdLibraryAdd } from "@react-icons/all-files/md/MdLibraryAdd";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import { ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import { CTextarea } from "@coreui/react";

export default class Voucher extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage = (e, name, name_link, name_show) => {
    this.props.onChangeImage(e, name, name_link, name_show);
  };

  openFormAddBannerCampaign=()=>{
    this.props.openFormAddBannerCampaign();
  }
  openEditBannerCampaign=(item,i)=>{
    this.props.openEditBannerCampaign(item,i);
  }
  deleteBannerCampaign=(i)=>{
    this.props.deleteBannerCampaign(i);
  }
  saveAddBannerCampaign=()=>{
    this.props.saveAddBannerCampaign();
  }
  saveEditBannerCampaign=()=>{
    this.props.saveEditBannerCampaign();
  }
  render() {
    return (
      <>
        <Modal
            size="xl"
            isOpen={this.props.modalBannerCampaign}
            className={this.props.className}
          >
            <ModalHeader>
              {this.props.actionModalBannerCampaign === "new" ? `Tạo mới` : `Cập nhật`}
            </ModalHeader>
            <ModalBody>
            <TextFieldGroup
                field=""
                label="Tên thương hiệu"
                value={this.props.nameBannerCampaign}
                placeholder={""}
                onChange={(e) => {
                  this.setStateByName('nameBannerCampaign',e.target.value);
                }}
              />
              <TextFieldGroup
                field=""
                label="Hình ảnh: (? * ?)"
                type={"file"}
                className="mt-5"
                onChange={(e) => {
                  this.onChangeImage(
                    e,
                    "image_banner_campaign",
                    "image_banner_campaign_link",
                    "image_banner_campaign_show"
                  );
                }}
                onClick={(e) => {
                  e.target.value = null;
                  this.setStateByName('image_banner_campaign_show','');
                }}
              />
              <div class="text-center">
                <img
                  alt=""
                  style={{ maxWidth: "600px", marginBottom: 20 }}
                  height="auto"
                  src={this.props.image_banner_campaign}
                />
              </div>
              <TextFieldGroup
                field=""
                label="Nội dung"
                value={this.props.contentBannerCampaign}
                placeholder={""}
                onChange={(e) => {
                  this.setStateByName('contentBannerCampaign',e.target.value);
                }}
              />
              <TextFieldGroup
                field=""
                label="Đường dẫn"
                value={this.props.hrefBannerCampaign}
                placeholder={""}
                onChange={(e) => {
                  this.setStateByName('hrefBannerCampaign',e.target.value);
                }}
              />
              <TextFieldGroup
                field=""
                label="Slug"
                value={this.props.outputBannerCampaign}
                placeholder={""}
                onChange={(e) => {
                  this.setStateByName('outputBannerCampaign',e.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <CButton
                color="primary"
                onClick={() => {
                  this.props.actionModalBannerCampaign === "new"
                    ? this.saveAddBannerCampaign()
                    : this.saveEditBannerCampaign();
                }}
              >
                Lưu
              </CButton>{" "}
              <CButton
                color="secondary"
                onClick={() => {
                  this.setStateByName(
                    'modalBannerCampaign',false
                  );
                }}
              >
                Đóng
              </CButton>
            </ModalFooter>
        </Modal>
        <div class="text-center">
          <CButton
            onClick={() => this.SaveAllConfigWeb("voucherPartner")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            Lưu thay đổi
          </CButton>
        </div>
        <div className="mt-3"></div>
        <div class="flex-space">
        <h1>Danh sách thương hiệu</h1>

          <CButton
            color="info"
            style={{ marginBottom: "10px" }}
            size="md"
            className="btn-main"
            onClick={() => this.openFormAddBannerCampaign()}
          >
            <MdLibraryAdd style={{ margin: "auto 6px auto 0" }} />
            <p style={{ margin: "auto 0" }}>Thêm mới</p>
          </CButton>
        </div>
        <div className="table__overflow">
        <table
          ble
          className="table table-hover mt-3 table-outline mb-0  d-sm-table "
        >
          <thead className="thead-light">
            <tr>
              <th className="text-center">STT.</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Hình ảnh</th>
              <th className="text-center">Nội dung khuyến mãi</th>
              <th className="text-center">Slug</th>
              <th className="text-center">Link web</th>
              <th className="text-center">#</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bannerCampaign
              ? this.props.bannerCampaign.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{item.name}</td>

                      <td className="text-center">
                        <img style={{maxWidth : '200px'}} src={item.image} alt="" />
                      </td>
                      <td className="text-center">{item.content}</td>
                      <td className="text-center">{item.output}</td>
                      <td className="text-center">{item.link}</td>
                      <td className="">
                        <div className="flex">
                          <CButton
                            shape="rounded-pill"
                            variant="ghost"
                            color="info"
                            style={styles.mgl5}
                            size="md"
                            onClick={() => this.openEditBannerCampaign(item, i)}
                          >
                            <FiEdit3
                              style={styles.icon}
                              className="icon"
                              name="cilPencil"
                            />
                          </CButton>{" "}
                          <CButton
                            shape="rounded-pill"
                            variant="ghost"
                            color="danger"
                            style={styles.mgl5}
                            onClick={() => this.deleteBannerCampaign(i)}
                          >
                            <BsTrash
                              style={styles.icon}
                              className="icon"
                              name="cilTrash"
                            />
                          </CButton>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        </div>
      </>
    );
  }
}
const styles = {
  mgl5: {
    marginLeft: "5px",
  },
};
