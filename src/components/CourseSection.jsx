import React, {Component} from 'react';
import "Style/CourseSection";
import CourseItem from "Components/CourseItem";
import {connect} from "react-redux";
import {isEmpty} from "Utils/utils";
import { css } from '@emotion/core';
import { PropagateLoader } from 'react-spinners';

const override = css`
    display: flex;
    margin: 0 auto;
    border-color: red;
    flex-direction: column;
    justify-content: center;
`;

class CourseSection extends Component {
  render() {
    const {coinsData} = this.props;
    return (
      <div className="course-section">
        <PropagateLoader
          css={override}
          color={'#cca210'}
          loading={isEmpty(coinsData)}
        />
        {
          Object.keys(coinsData).map((key, i) =>
            <CourseItem key={i} coinData={coinsData[key]}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinsData: state.rootReducer.coinData
});

export default connect(mapStateToProps)(CourseSection);