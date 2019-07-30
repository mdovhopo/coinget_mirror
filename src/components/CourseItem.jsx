import React, {Component} from 'react';
import "Style/CourseSection";
import { ClipLoader } from 'react-spinners';

class CourseItem extends Component {
  render() {
    const {exchange, currency, price, prevPrice} = this.props.coinData;
    const priceDiff = price - prevPrice;
    const priceDiffColor = priceDiff >= 0 ? "var(--green)" : "var(--red)";
    return (
      <div className="course-item">
        <div>
          <span className="course-item-name">{`${exchange} ${currency}/${"USD"}`}</span>
            <div className="course-item-price">
              <div>
                {price === 0 ? <ClipLoader loading={true} color={'#cca210'}/> : price}
              </div>
              <div style={{color: priceDiffColor}}>
                {price === 0 ? <ClipLoader loading={true} color={'#cca210'}/> : priceDiff.toFixed(2)}
              </div>
            </div>
        </div>
      </div>

    );
  }
}

export default CourseItem;