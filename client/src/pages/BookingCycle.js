import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCycles } from "../redux/actions/cyclesActions";
import moment from "moment";
import { bookCycle } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';

import 'aos/dist/aos.css'; 
const { RangePicker } = DatePicker;
function BookingCycle({ match }) {
  const { cycles } = useSelector((state) => state.cyclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [cycle, setcycle] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cycles.length == 0) {
      dispatch(getAllCycles());
    } else {
      setcycle(cycles.find((o) => o._id == match.params.cycleid));
    }
  }, [cycles]);

  useEffect(() => {
    setTotalAmount(totalDays * cycle.rentPerDay+20);
  }, [ totalDays]);

  function selectTimeSlots(values) {
    if(values==null){
      return;
      }
    setFrom(moment(values[0]).format("MMM DD yyyy"));
    setTo(moment(values[1]).format("MMM DD yyyy"));

    setTotalDays(values[1].diff(values[0], "days"));
  }

  function isValid(){
    var selectedFrom = moment(from , 'MMM DD yyyy')
        var selectedTo = moment(to , 'MMM DD yyyy')

              if(cycle.bookedTimeSlots.length == 0){
                  return true;
              }
              else{

                   for(var booking of cycle.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {
                        return false;
                       }  

                   }
        }
        return true;
  }
  
  

  function onToken(token){
    const reqObj = {
        token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        cycle: cycle._id,
        totalDays,
        totalAmount,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCycle(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
       { console.log(cycle.image)}
          <img src={cycle.image} className="cycleimg2 bs1 w-100" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
        <h2>{cycle.name}</h2>
          <Divider type="horizontal" dashed>
            Bike Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            
            <p>{cycle.rentPerDay} Rent Per Day /-</p>
           
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            format="MMM DD yyyy"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && isValid()==false && (
            <div>
            {console.log("hello")}
              <p>
                <b>This Slot Already booked</b>
              </p>
              </div>
          )}


          {from && to && isValid() &&(
           
            <div>
            
              <p>
                Total Days : <b>{totalDays}</b>
              </p>
              <p>
                Rent Per Day : <b>{cycle.rentPerDay}</b>
              </p>
              

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
              >
                  <button className="btn1">
                Book Now
              </button>
              </StripeCheckout>

              
            </div>
          )}
        </Col>

        {cycle.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {cycle.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCycle;
