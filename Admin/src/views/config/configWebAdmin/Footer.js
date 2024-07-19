import { Component } from "react";
import { CButton } from "@coreui/react";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { MdLibraryAdd } from "@react-icons/all-files/md/MdLibraryAdd";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";

export default class Footer extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  onChangeImage = (e, name, name_link, name_show) => {
    this.props.onChangeImage(e, name, name_link, name_show);
  };
  openFormAddFooter = () => {
    this.props.openFormAddFooter();
  };
  openFormEditFooter = (value) => {
    this.props.openFormEditFooter(value);
  };
  deleteFooter = (value) => {
    this.props.deleteFooter(value);
  };
  render() {
    return (
      <>
        <div class="flex-end">
          <CButton
            color="info"
            style={{ marginBottom: "10px" }}
            size="md"
            className="btn-main"
            onClick={this.openFormAddFooter}
          >
            <MdLibraryAdd style={{ margin: "auto 6px auto 0" }} />
            <p style={{ margin: "auto 0" }}>Thêm mới</p>
          </CButton>
        </div>
        <table
          ble
          className="table table-hover mt-3 table-outline mb-0  d-sm-table"
        >
          <thead className="thead-light">
            <tr>
              <th className="text-center">STT.</th>
              <th className="text-center">Tiêu đề</th>
              <th className="text-center">Nội dung</th>
              <th className="text-center">Link tham chiếu</th>
              <th className="text-center">#</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan="10" hidden={this.props.hidden} className="text-center">
              Không tìm thấy dữ liệu
            </td>

            {this.props.dataFooter
              ? this.props.dataFooter.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>

                      <td className="text-center">{item.title}</td>
                      <td className="text-center">
                        <div
                          style={{
                            overflowY: "hidden",
                            maxWidth: "300px",
                            maxHeight: "100px",
                          }}
                        >
                          {item.content}
                        </div>
                      </td>
                      <td className="text-center">{item.slug}</td>
                      <td className="text-center">
                        <div className="flex">
                          <CButton
                            shape="rounded-pill"
                            variant="ghost"
                            color="info"
                            style={styles.mgl5}
                            size="md"
                            onClick={() => this.openFormEditFooter(item)}
                          >
                            <FiEdit3
                              style={styles.icon}
                              name="cilPencil"
                              className="icon"
                            />
                          </CButton>{" "}
                          <CButton
                            shape="rounded-pill"
                            variant="ghost"
                            color="danger"
                            style={styles.mgl5}
                            onClick={() => this.deleteFooter(item)}
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
      </>
    );
  }
};
const styles = {
    mgl5: {
      marginLeft: "5px",
    },
  };
  
