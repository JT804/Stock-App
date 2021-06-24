import React from "react";

class StockItems extends React.Component {
    render() {
        return (
        

            <div className="stock-item clearfix px-3">
                <h2 className="si-symbol float-left"> {this.props.stockSymbol}</h2>
                <h5 className="si-name float-left py-2">{this.props.stockName}</h5>
                <p className="si-price float-right">${this.props.stockPrice}</p>

            </div>
          
        );
    }
}

export default StockItems;

