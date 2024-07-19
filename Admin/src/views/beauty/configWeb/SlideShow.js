import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { MdLibraryAdd } from "@react-icons/all-files/md/MdLibraryAdd";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";

import { Component } from "react";
import { CButton } from "@coreui/react";


export default class SlideShow extends Component {
  SaveAllConfigWeb(value) {
    this.props.SaveAllConfigWeb(value);
  }
  openFormAddSlide = () => {
    this.props.openFormAddSlide();
  };
  openFormEditSlide = (item,i) => {
    this.props.openFormEditSlide(item,i);
  };
  deleteSlide = (i) => {
    this.props.deleteSlide(i);
  };
  render() {
    return (
      <>
        <div class="flex-end mt-3">
          <CButton
            color="info"
            style={{ marginBottom: "10px" }}
            size="md"
            className="btn-main"
            onClick={() => this.openFormAddSlide()}
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
              {/* <th className="text-center">Tên</th> */}
              <th className="text-center">Hình ảnh</th>
              <th className="text-center">Mô tả</th>

              <th className="text-center">#</th>
            </tr>
          </thead>
          <tbody>
            {this.props.slideShow
              ? this.props.slideShow.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">
                        <img width="150" height="150" src={item.image} alt="" />
                      </td>

                      <td className="text-center">{item.content}</td>
                      {/* <td className="text-center">
                                {Number(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ
                              </td> */}
                      <td className="">
                        <div className="flex">
                          <CButton
                            shape="rounded-pill"
                            variant="ghost"
                            color="info"
                            style={styles.mgl5}
                            size="md"
                            onClick={() => this.openFormEditSlide(item, i)}
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
                            onClick={() => this.deleteSlide(i)}
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
}

const styles = {
  mgl5: {
    marginLeft: "5px",
  },
};
