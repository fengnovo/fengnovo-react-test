import React from 'react';

const Loading = (props) => {
    let blades = [];

    for (let i = 0; i < 12; i++) {
        blades.push(<span className="spinner-blade" key={i}></span>);
    }

    return (
        <div className="loader">
            <div className="spinner">
                {blades}
            </div>
        </div>      
    );
};

export default Loading;