import React, {Component} from 'react';
import BasicButton        from "Components/BasicButton";
import "Style/SubscribeForm";

class SubscribeForm extends Component {
    render() {
        return (
            <div id="subscribe" className="subscribe-section">
                <div className="wrap">
                    <form className="subscribe-form">
                        <div className="form-name">
                            Subscribe to Updates
                        </div>
                        <input className="form-input" type="text" placeholder="Your name" name="name"/>
                        <input className="form-input" type="email" placeholder="Your email" name="mail"/>
                        <div className="align-center">
                            <BasicButton
                                maxWidth="300px"
                                onClick={() => console.log("Subscribe btn")}
                            >
                                Subscribe
                            </BasicButton>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SubscribeForm;
