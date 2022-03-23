import { ADD_TRANSACTION, DELETE_TRANSACTION,FILTER_CONTESTS,UPDATE } from "../actions/types";

const initialState = {
  transactions: [
    { addedtime: 1576590342000, id: 2, title: "Amala Soup", price: -40 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:true,nextTime:1576590342000,price:10,type:'1 month'}},
    { addedtime: 1576590342000, id: 3, title: "Paypal Income", price: 400 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 4, title: "Bank Credit", price: 2000 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 5, title: "Bought Garri", price: -60 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 6, title: "Transport fare", price: -10,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'} },
    { addedtime: 779879856000, id: 7, title: "Ewedu Soup", price: -20,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'} },
    { addedtime: 779879856000, id: 9, title: "Funded my wallet", price: -200,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 779879856000, id: 10, title: "Salary", price: 2000,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1613682000000, id: 11, title: "Give out", price: -10,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
  ],
  filtered: [
    { addedtime: 1576590342000, id: 2, title: "Amala Soup", price: -40 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:true,nextTime:1576590342000,price:10,type:'1 month'}},
    { addedtime: 1576590342000, id: 3, title: "Paypal Income", price: 400 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 4, title: "Bank Credit", price: 2000 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 5, title: "Bought Garri", price: -60 ,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1274174256000, id: 6, title: "Transport fare", price: -10,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 779879856000, id: 7, title: "Ewedu Soup", price: -20,description:"Lab Payment", type:"Lab",autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'} },
    { addedtime: 779879856000, id: 9, title: "Funded my wallet", price: -200,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 779879856000, id: 10, title: "Salary", price: 2000,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
    { addedtime: 1613682000000, id: 11, title: "Give out", price: -10,description:"Lab Payment", type:"Lab" ,autoDebit:{valid:false,nextTime:null,price:null,type:'1 min'}},
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
        filtered: [payload, ...state.transactions],
      
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(({ id }) => id !== payload),
        filtered: state.transactions.filter(({ id }) => id !== payload),
      };
      case FILTER_CONTESTS:
      return {
        ...state,
        filtered: state.transactions.filter((item) => {
          if(payload=='') 
          return(item);
          const regex = new RegExp(`${payload}`, 'gi');
          return (
            item.title.match(regex) ||
            item.type.match(regex)
          );
        }),
      };

      case UPDATE:
        console.log("****Update***")
        return{
          ...state,
          transactions:state.transactions.map((item)=>{
            
            if(item.autoDebit.valid)
             {
                var cur=item.autoDebit.nextTime;
                var debt=item.autoDebit.price
                var curPrice=item.price
                var now=new Date().valueOf()
                while(cur<= now)
                {
                  switch (item.autoDebit.type){
                    case '1 min':
                      cur=cur+60000
                      break;
                    case '1 month':
                      cur=cur+2629800000
                      break;
                    case 'half year':
                      cur=cur+15778800000
                      break;
                    case 'year':
                      cur=cur+31556952000
                      break;
                    
                      
                  }
                  curPrice=curPrice-debt;
                } 
             
                console.log(item.title)
                console.log(curPrice);
                return ({
                  ...item,
                  price:curPrice,
                  autoDebit:{
                    ...item.autoDebit,
                    nextTime:cur,
                  }
                })
               
             }
            return item
          }),
          filtered:state.transactions.map((item)=>
          {
            
            if(item.autoDebit.valid)
             {
               var cur=item.autoDebit.nextTime;
               var debt=item.autoDebit.price
               var curPrice=item.price
               var now=new Date().valueOf()
               while(cur<= now)
              {
                switch (item.autoDebit.type){
                  case '1 min':
                    cur=cur+60000
                    break;
                  case '1 month':
                    cur=cur+2629800000
                    break;
                  case 'half year':
                    cur=cur+15778800000
                    break;
                  case 'year':
                    cur=cur+31556952000
                    break;
                  
                    
                }
                curPrice=curPrice-debt;
              } 
             
                console.log(item.title)
                console.log(curPrice);
                return ({
                  ...item,
                  price:curPrice,
                  autoDebit:{
                    ...item.autoDebit,
                    nextTime:cur,
                  }
                 })
             }

            
          
             return item
            }),
          
        }
    default:
      return state;
  }
};
