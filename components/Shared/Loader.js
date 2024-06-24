import React, { Component } from 'react';
import AgeRestrictPopUp from './AgeRestrictPopUp';

class Loader extends Component {
    render() {
        return (
            <>
                <div className={`preloader ${this.props.loading ? '' : 'preloader-deactivate'}`}>
                    <div id="global">
                        <div id="top" className="mask">
                            <div className="plane"></div>
                        </div>

                        <div id="middle" className="mask">
                            <div className="plane"></div>
                        </div>

                        <div id="bottom" className="mask">
                            <div className="plane"></div>
                        </div>
                        <p><i>LOADING...</i></p>
                        <AgeRestrictPopUp />
                    </div>
                </div>
            </>
        );
    }
}

export default Loader;