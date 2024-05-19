import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCycles } from '../redux/actions/cyclesActions'
import { Col, Row , Divider , DatePicker, Checkbox} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const {RangePicker} = DatePicker
function Home() {
    const {cycles} = useSelector(state=>state.cyclesReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCycles , setTotalcycles] = useState([])
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCycles())
    }, [])

    useEffect(() => {

        setTotalcycles(cycles)
        
    }, [cycles])


    function setFilter(values){
        if(values==null){
        return;
        }
        var selectedFrom = moment(values[0] , 'MMM DD yyyy')
        var selectedTo = moment(values[1] , 'MMM DD yyyy')

        var temp=[]

        for(var cycle of cycles){
            var x=1;
              if(cycle.bookedTimeSlots.length == 0){
                  temp.push(cycle)
              }
             
              else{

                   for(var booking of cycle.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {
                        x=0;
                        break;
                       }

                   }
                   if(x)
                   temp.push(cycle)

              }

        }


        setTotalcycles(temp)


    }

    return (
        <DefaultLayout>

             <Row className='p-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-left'>
                      <h1 className='mr-4'>Enter Date of Ride :</h1>
                     <RangePicker format='MMM DD yyyy' onChange={setFilter}/>
                 
                 </Col>

             </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify ="center" gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>

                   {totalCycles.map(cycle=>{
                       return <Col   >
                            <div className="cycle p-2 bs1">
                               <img src={cycle.image} className="cycleimg"/>

                               <div className="cycle-content d-flex align-items-center justify-content-between">

                                    <div className='text-left pl-2'>
                                        <p>{cycle.name}</p>
                                        <p> Rent Per Day {cycle.rentPerDay} /-</p>
                                    </div>

                                    <div>
                                        <button className="btn1 mr-2"><Link to={`/booking/${cycle._id}`}>Book Now</Link></button>
                                    </div>

                               </div>
                            </div>
                       </Col>
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home
