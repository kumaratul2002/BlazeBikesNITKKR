import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCycle, editCycle, getAllCycles } from "../redux/actions/cyclesActions";
function EditCycle({ match }) {
  const { cycles } = useSelector((state) => state.cyclesReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [cycle, setcycle] = useState();
  const [totalcycles, settotalcycles] = useState([]);
  useEffect(() => {
    if (cycles.length == 0) {
      dispatch(getAllCycles());
    } else {
      settotalcycles(cycles);
      setcycle(cycles.find((o) => o._id == match.params.cycleid));
      console.log(cycle);
    }
  }, [cycles]);

  function onFinish(values) {
    values._id = cycle._id;

    dispatch(editCycle(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcycles.length > 0 && (
            <Form
              initialValues={cycle}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Bike Info.</h3>

              <hr />
              <Form.Item name='name' label='Bike name' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>
                           <Form.Item name='image' label='Image url' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>
                           <Form.Item name='rentPerDay' label='Rent per day' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit BIKE INFO.</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCycle;
