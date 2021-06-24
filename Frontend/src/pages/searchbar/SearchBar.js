import React from "react";
import './SearchBar.css';
import { Link } from "react-router-dom";
import * as EnvConstants from '../apicall';
import Skeleton from 'react-loading-skeleton';


class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      dropdownEnabled: false,
      stockListItems: []
    };

    // This binding is necessary to make `this` work in the callback
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }
  enableDropdown(valueIn) {
    if (!this.state.isSearching) {
        this.setState({
            dropdownEnable: true,
            isSearching: true
        });
        let apiURL = EnvConstants.BE_URL + 'search/' + valueIn;
        fetch(apiURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        stockListItems: result,
                        isSearching: false
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: true,
                        errorMessage: error,
                        isSearching: false
                    });
                }
            )
    }
}
disableDropdown() {
    this.setState({
        dropdownEnable: false
    })
}
onChangeSearch(e) {
    e.target.value.length > 3 ?
        this.enableDropdown(e.target.value) :
        this.disableDropdown();
}





//   handleOnChange(e) {

//     if (e.target.value.length > 2) {

//     //   this.setState({
//     //     dropdownEnabled: true,
//     //      stockDetails: result
//     //   })
        

//       let apiURL = "http://127.0.0.1:5000/search/"+e.target.value;
//       console.log(apiURL);
//       fetch(apiURL)
//       .then(res => res.json())
//       .then(
//           (result) => {
//               this.setState({
//                   isLoaded: true,
//                   stockListItems: result.quotes,
//                   isSearching: false
//               });
//               console.log(result);
//           },
//           (error) => {
//               this.setState({
//                   isLoaded: true,
//                   error: true,
//                   errorMessage: error,
//                   isSearching: false
//               });
//           }
//       )
// }
// }
//   disableDropdown() {
//     this.setState({
//       dropdownEnable: false
//     })
//   }
//   onChangeSearch(e) {
//     e.target.value.length > 3 ?
//       this.enableDropdown(e.target.value) :
//       this.disableDropdown();
//   }
    
  
    render() {
      return (
          <div className="search-dropdown-wrap">
              <div className="form-group">
                  <input id="searchbox" type="text" className="form-control" aria-describedby="search box" placeholder="Search..." onChange={(e) => this.onChangeSearch(e)} autoComplete="off"/>
                  <div className="search-dropdown">
                      {/* {!this.state.isLoaded ?
                          <Skeleton height={73} count={5} />
                          :
                          <div>
                              {this.state.stockListItems.map((stockListItem) =>
                                  <Link to={'/details/' + stockListItem.symbol} key={stockListItem.symbol}>
                                      <StockItems stockSymbol={stockListItem.symbol} stockName={stockListItem.shortName} stockPrice={stockListItem.regularMarketPrice}></StockItems>
                                  </Link>
                              )
                              }
                          </div>
                      } */}
                      {
                          this.state.dropdownEnable ?
                              <div>

                                  {this.state.isLoaded ?
                                      <ul className="suggestion-list">
                                          {this.state.stockListItems.map((stockListItem) =>
                                              < li className="suggestion-item" key={stockListItem.symbol}>
                                                  <Link to={'/details/' + stockListItem.symbol} >
                                                      {stockListItem.symbol}<span> {stockListItem.shortname}</span>
                                                  </Link>
                                              </li>
                                          )
                                          }
                                      </ul> :
                                      <ul className="suggestion-list">
                                          <Skeleton height={35} count={5} />
                                      </ul>
                                  }
                              </div> :
                              null
                      }
                  </div>

              </div>
          </div >
      );
  }
}

export default Watchlist;
