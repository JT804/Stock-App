import './Details.css';
import { Link, withRouter } from "react-router-dom";
import React from 'react';
import Watchlist from '../watchlist/Watchlist';
import * as EnvConstants from '../apicall';
import Skeleton from 'react-loading-skeleton';




class Details extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        stockSymbol: this.props.match.params.stockSymbol,
        stockDetails: {},
        error: false,
        errorMessage: '',
        isInWatchlist : false,

      };
      this.addToTheWatchList = this.addToTheWatchList.bind(this);
      this.RemoveFromWatchList = this.RemoveFromWatchList.bind(this);
      

    }
    componentDidMount() {
        // check if the the stock is in watchlist
        // alert(localStorage.stockSymbols);
        if (localStorage.stockSymbols) {
            if (localStorage.stockSymbols.includes(this.state.stockSymbol)) {
                this.setState({
                    isInWatchlist: true,
                }, () => {
                    console.log(this.state);
                });
            } else {
                this.setState({
                    isInWatchlist: false,
                });
            }
        }
        else {
            console.error('LocalStorage.stockSymbols is empty or not defined');
        }


    
    let apiURL = EnvConstants.BE_URL + this.state.stockSymbol;
    console.log('API URL:' + apiURL);
    fetch(apiURL)
    .then(res => res.json())
    .then(
        (result) => {
            console.log(JSON.stringify(result));
            this.setState({
                isLoaded: true,
                stockDetails: result[0]
            });
            console.log(result);
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error: true,
                errorMessage: error
            });
        }
    )
}


    addToTheWatchList() {
        let updatedVal = [];
        updatedVal = localStorage.stockSymbols.split(',');
        updatedVal.push(this.state.stockSymbol)
        localStorage.stockSymbols = updatedVal.join(`,`);
        this.setState({
            isInWatchlist: true
        });
    }

    RemoveFromWatchList() {
        let symbolsArray = localStorage.stockSymbols.split(',');
        let symbolIndex = symbolsArray.indexOf(this.state.stockSymbol);

        if (symbolIndex > -1) {
            symbolsArray.splice(symbolIndex, 1);
        }

        localStorage.stockSymbols = symbolsArray.join(',');
        console.log(localStorage.stockSymbols);

        this.setState({
            isInWatchlist: false
        });
    }

  

  
    render() {
      return (
        <div className="watchlist-view">
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-8">
                    {/* <Link className="btn btn-primary mt-2" to="/">Go back</Link> */}
                    
                    <div class="card">
                    <div class="button-body">
                        <Link className="btn-"to="/" >Back</Link>
                        {
                            (this.state.isInWatchlist) ?
                                <div className='float-right'>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={this.RemoveFromWatchList}>- Remove</button>
                                </div> :
                                <div className='float-right'>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={this.addToTheWatchList}>+ Add</button>
                                </div>
                    }

                    {/* <img src="..." class="card-img-top" alt="..."/> */}

                    {!this.state.isLoaded ?
                    // Loads skeliton while pulling the API response
                    <div>
                        <Skeleton height={52} />
                        <Skeleton height={48} count={5} />
                    </div>

                    :
                    <main>
                        <div className="card-body">
                            <h5 class="card-title">{this.state.stockDetails.symbol}</h5>
                            <p class="card-subtitle mb-2 text-muted">{this.state.stockDetails.shortName}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Close
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.name}</p>
                            </li>

                            <li class="list-group-item">High
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.regularMarketDayHigh}</p>
                            </li>

                             
                            <li class="list-group-item">Low
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.regularMarketDayLow}</p>
                            </li>

                            <li class="list-group-item">Marketcap
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.marketCap}</p>
                            </li>
                            
                            <li class="list-group-item">Open
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.regularMarketOpen}</p>
                            </li>

                            <li class="list-group-item">PE
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.priceToSales}</p>
                            </li>

                            <li class="list-group-item">Volume
                                <p class= "card-subtitle mb-2 text-muted" id="stock-info">{this.state.stockDetails.regularMarketVolume}</p>
                            </li>

                        </ul>
                        </main>
                    }
                
                  
                </div>
                    
                </div>
            </div>
        </div>

     </div>

     </div>


        
      );
    }
  }
  export default withRouter(Details);



