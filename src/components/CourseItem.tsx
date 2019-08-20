import React, {Component} from 'react';
import "Style/CourseSection";
import {ClipLoader}       from 'react-spinners';
import WebSocketApi       from 'Utils/WebSocketApi';

type Props = {
    coin: string,
    exchange: string
}
type State = {
    price: number,
    prevPrice: number
};

type PriceData = {
    date: string,
    price: string
}

class CourseItem extends Component<Props, State> {
    state = {price: 0, prevPrice: 0};

    componentDidMount(): void {
        const {coin, exchange} = this.props;
        const callback = (data: PriceData) => {
            const price: number = +data.price;
            const oldPrice: number = this.state.price;
            const prevPrice: number = oldPrice === 0 ? price : oldPrice;
            this.setState({price, prevPrice});
        };
        WebSocketApi.subscribe(exchange, coin, callback);
    }

    render() {
        const {coin, exchange} = this.props;
        const {price, prevPrice} = this.state;
        const priceDiff: number = price - prevPrice;
        const priceDiffColor: string = priceDiff >= 0 ? "var(--green)" : "var(--red)";
        return (
            <div className="course-item">
                <div>
                    <span className="course-item-name">{`${exchange} ${coin}/${"USD"}`}</span>
                    <div className="course-item-price animate">
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
