import React from 'react';
import Header from '../components/header.jsx';

const App = (props) => {
    console.dir(props);
    return (
        <div>
            <Header />
            <div className="content">
                {props.children}
            </div>
        </div>
    );
};

export default App;