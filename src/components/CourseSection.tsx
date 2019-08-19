import React, {Component} from 'react';
import "Style/CourseSection";
import CourseItem from "Components/CourseItem";
import {connect} from "react-redux";
import {isEmpty} from "Utils/utils";
import {css} from '@emotion/core';
import {PropagateLoader} from 'react-spinners';
import WebSocketApi from "Utils/WebSocketApi";

type Props = {
    exchanges: Array<any>
}

const override = css`
    display: flex;
    margin: 0 auto;
    border-color: red;
    flex-direction: column;
    justify-content: center;
`;

class CourseSection extends Component<Props> {

    UNSAFE_componentWillMount(): void {
        const WSLink = 'wss://backend-land.coinget.io/v3/public/ws';
        WebSocketApi.connect(WSLink);
    }

    render() {
        const {exchanges} = this.props;
        return (
            <div className="course-section">
                <PropagateLoader
                    css={override}
                    color={'#cca210'}
                    loading={isEmpty(exchanges)}
                />
                {
                    Object.keys(exchanges).map((key: string) =>
                        // @ts-ignore
                        exchanges[key].map((el: string) =>
                            <CourseItem key={key + el} exchange={key} coin={el}/>)
                    )
                }
            </div>
        );
    }
}

// @ts-ignore
const mapStateToProps = (state) => ({
    exchanges: state.rootReducer.exchanges
});

export default connect(mapStateToProps)(CourseSection);
