import { Component } from "react";
import { CButton } from "@coreui/react";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { MdLibraryAdd } from "@react-icons/all-files/md/MdLibraryAdd";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";

export default class Banner1 extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  };
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage = (e, name, name_link, name_show) => {
    this.props.onChangeImage(e, name, name_link, name_show);
  };
  openFormAddBanner=(value)=>{
    this.props.openFormAddBanner(value);
  }
  openFormEditBanner = (value, item, i) => {
    this.props.openFormEditBanner(value, item, i);
  }
  deleteBanner = (value, i) => {
    this.props.deleteBanner(value, i);
  }
  render() {
    return (
      <>
        <div class="mb-3 text-center">
          <CButton
            onClick={() => this.SaveAllConfigWeb("logoCompany")}
            style={styles.mgl5}
            outline
            color="success"
            size="md"
          >
            {/* <CIcon name="cilPencil" /> */}
            Lưu thay đổi
          </CButton>
        </div>
        <h1>Banner 1 </h1>
        <p>Hình ảnh (1519px * 570px)</p>
        <div class="flex-end mt-3">
          <CButton
            color="info"
            style={{ marginBottom: "10px" }}
            size="md"
            className="btn-main"
            onClick={() => this.openFormAddBanner("1")}
          >
            <MdLibraryAdd style={{ margin: "auto 6px auto 0" }} />
            <p style={{ margin: "auto 0" }}>Thêm mới</p>
          </CButton>
        </div>
        <div className="table__overflow">
          <table
            ble
            className="table table-hover mt-3 table-outline mb-0  d-sm-table"
          >
            <thead className="thead-light">
              <tr>
                <th className="text-center">STT.</th>
                {/* <th className="text-center">Tên</th> */}
                <th className="text-center">Hình ảnh</th>
                <th className="text-center">Đường dẫn</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.bannerMainSlide
                ? this.props.bannerMainSlide.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-center">{i + 1}</td>
                        <td className="text-center">
                          <img
                            style={{ maxWidth: "300px" }}
                            src={item.image}
                            alt=""
                          />
                        </td>

                        <td className="text-center">{item.href}</td>
                        <td className="text-center">
                          <div className="flex">
                            <CButton
                              shape="rounded-pill"
                              variant="ghost"
                              color="info"
                              style={styles.mgl5}
                              size="md"
                              onClick={() =>
                                this.openFormEditBanner("1", item, i)
                              }
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
                              onClick={() => this.deleteBanner("1", i)}
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
