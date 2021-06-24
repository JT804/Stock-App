import React from "react";
import './Watchlist.css';
import { Link } from "react-router-dom";
import DateTime from './DateTime';
import * as EnvConstants from '../apicall'
import Skeleton from 'react-loading-skeleton';
import StockItems from "../Stocklist";





class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          stockSymbols: '',
          stockListItems:[],
          error: false,
          errorMessage: ''
        };
      }


  


    
    // make an API call in the beginning
    componentDidMount() {

        if (typeof (Storage) !== "undefined") {
          console.log('Browser supports localstorage');
          if (!localStorage.stockSymbols) {
            localStorage.stockSymbols = 'AAPL,EQIX,TSLA,WMT,AMZN';
          }
          this.setState({
            stockSymbols: localStorage.stockSymbols
          }, () => {
              console.log('Before populatewatchlist()');
            this.populateWatchlist();
            console.log('After populatewatchlist()');
            console.log(this.state);
          });
        } else {
          console.error('Browser does not support localstorage');
        }
      }
    
      populateWatchlist() {
        let watchlistLocal = this.state.stockSymbols;
        let apiURL = EnvConstants.BE_URL + watchlistLocal;
        fetch(apiURL)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(11111111111);
                console.log(result);
              this.setState({
                isLoaded: true,
                stockListItems: result
              });
            },
            (error) => {
                console.error('FAILED...............');
              this.setState({
                isLoaded: false,
                error: true,
                errorMessage: error
              });
            }
          )
        console.log(watchlistLocal);
      }
    

//     const { error, isLoaded, stockItem } = this.state;
// //   const [loading, setLoading] = useState(false);
//   if (error) {
//       return <div>Error: {error.message}</div>;
//     // } else if (!isLoaded) {
//     //     return <div>Loading...</div>;
//     } else {
        
    render() {

        return (
            
            <div className="watchlist-view">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-8">
                            <div class="card-main">
                                <div class="button-body">
    
                                </div>
                                    
                                <div class="card-body">
                                    <p class="card-title"><DateTime /></p>

                                 
                                    {!this.state.isLoaded ?
                                    <Skeleton height={73} count={5} />
                                    :
    
                                        <main>
                                            {this.state.stockListItems.map((stockListItem) =>
    
                                            <Link to={'/details/' + stockListItem.symbol} key={stockListItem.symbol}>
                
                                                <StockItems stockSymbol={stockListItem.Symbol} stockName={stockListItem.shortName} stockPrice={stockListItem.regularMarketPrice}></StockItems>
                
                                            </Link>

                                            )
                                        }
                                    
                                            
                                        </main> 
                                    }
    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        );
        
    };


};


export default Watchlist




























        {/* //   if (!localStorage.stockSymbols) { */}
        //     localStorage.stockSymbols = 'EQIX,AAPL,WMT,TSLA,AMZN';
        //   }
        //   this.setState({
        //     stockSymbols: localStorage.stockSymbols
        //   }, () => {
        //     this.populateWatchlist();
        //     console.log(this.state);
        //   });
        // } 
   








{/* // <ul class="list-group list-group">
                                        
// <li class="list-group-item"><Link to="/details">{symbol}</Link>{" "}
    
//     <a class="card-subtitle mb-2 text-muted">{name}</a>
    
//         <p class="card-subtitle text-primary" id="stock-info">{close}</p>
    
// </li>
    
// <li class="list-group-item"><Link to="/details">{symbol}</Link>{" "}
    
//     <a class="card-subtitle mb-2 text-muted">{name}</a>
    
//         <p class="card-subtitle  text-primary" id="stock-info">{close}</p>
    
// </li>
    
// <li class="list-group-item"><Link to="/details">{symbol}</Link>{" "}
    
//     <a class="card-subtitle mb-2 text-muted">{name}</a>
        
//         <p class="card-subtitle  text-primary" id="stock-info">{close}</p>
            
// </li>
    
// <li class="list-group-item"><Link to="/details">{symbol}</Link>{" "}
    
//     <a class="card-subtitle mb-2 text-muted">{name}</a>
        
//         <p class="card-subtitle text-primary" id="stock-info">{close}</p>
            
// </li>
    
// <li class="list-group-item"><Link to="/details">{symbol}</Link>{" "}
    
//     <a class="card-subtitle mb-2 text-muted">{name}</a>
        
//         <p class="card-subtitle text-primary" id="stock-info">{close}</p>
            
// </li>
    
// </ul> */}