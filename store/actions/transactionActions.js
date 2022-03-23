import moment from "moment";

import { ADD_TRANSACTION, DELETE_TRANSACTION,FILTER_CONTESTS, UPDATE } from "./types";

export const addTransaction = ({ title, price, addedtime ,description,autoDebit,
  type}) => (dispatch) => {
  const id = Math.floor(Math.random() * 600000);
 
  var newTransaction = {
    id,
    title,
    price: +price,
    addedtime: mainTime(),
    description,
    type,
    
  };
  if(autoDebit.valid)
  {
     newTransaction = {
      id,
      title,
      price: +price,
      addedtime: mainTime(),
      description,
      type,
      autoDebit:{
        ...autoDebit,
        price: +autoDebit.price,
        nextTime:nextTime(autoDebit.type),
      }
    }; 
  }
  console.log(newTransaction)
  dispatch({ type: ADD_TRANSACTION, payload: newTransaction });
};

export const deleteTransaction = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_TRANSACTION, payload: id });
};
export const filterContests = (text) =>(dispatch)=> {
  dispatch({ type: FILTER_CONTESTS, payload: text });
};

export const update=()=>(dispatch)=>{
  //console.log("****Update***")
  dispatch({type: UPDATE})
}

export const mainTime = () => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var currentTime = new Date();
  // returns the month (from 0 to 11)
  var month = currentTime.getMonth() + 1;

  // returns the day of the month (from 1 to 31)
  var day = currentTime.getDate();

  // returns the year (four digits)
  var year = currentTime.getFullYear();

  // write output MM/dd/yyyy
  const MiliTime = year + "-" + pad(month) + "-" + pad(day);

  // const mainTime = moment(`${a}T00:00:00`).valueOf();
  return moment(`${MiliTime}T00:00:00`).valueOf();
};

export const nextTime = (type) => {
  console.log(type)
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var currentTime = new Date();
  
  !type && null
  switch (type){
    case '1 min':
     currentTime= new Date().setMinutes(new Date().getMinutes()+1)
      break;
    case '1 month':
      currentTime= new Date().setMonth(new Date().getMonth()+1)
      break;
    case 'half year':
      currentTime= new Date().setMonth(new Date().getMonth()+6)
      break;
    case 'year':
      currentTime= new Date().setFullYear(new Date().getFullYear()+1)
      break;
    
      
  }
  currentTime=new Date(currentTime)
  // returns the month (from 0 to 11)
  var month = currentTime.getMonth() + 1;

  // returns the day of the month (from 1 to 31)
  var day = currentTime.getDate();

  // returns the year (four digits)
  var year = currentTime.getFullYear();
  // write output MM/dd/yyyy
  const MiliTime = year + "-" + pad(month) + "-" + pad(day);

  // const mainTime = moment(`${a}T00:00:00`).valueOf();
  //changin to 1 for debugging 
  console.log(MiliTime);
  return moment(`${MiliTime}T00:01:00`).valueOf();
};
