import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCycle, getAllCycles } from "../redux/actions/cyclesActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;
function AdminHome() {
  const { cycles } = useSelector((state) => state.cyclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCycles, setTotalcycles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCycles());
  }, []);

  useEffect(() => {
    setTotalcycles(cycles);
  }, [cycles]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcycle">ADD BIKE</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCycles.map((cycle) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="cycle p-2 bs1">
                <img src={cycle.image} className="cycleimg" />

                <div className="cycle-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{cycle.name}</p>
                    <p> Rent Per Hour {cycle.rentPerDay} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editcycle/${cycle._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this Bike Info.?"
                      onConfirm={()=>{dispatch(deleteCycle({cycleid : cycle._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
