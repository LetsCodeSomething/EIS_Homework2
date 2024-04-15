import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import dataset from './dataset/Dataset';

import * as TextboxComponents from "./components/Textbox";
import * as TableComponents from "./components/Table";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function Filter(props) {
    const handleChange = (event) => {
        alert();
    }
    
    return (
        <form>
            <input type="text" onChange={handleChange}></input>
            <TextboxComponents.IntNumberOnlyTextbox/>
            <TextboxComponents.FloatNumberOnlyTextbox/>
        </form>
    );
}

root.render(<>
    <h3>Данные по продажам в Walmart</h3>
    <Filter/>
    <TableComponents.Table dataset={dataset} rowsPerPage="25" selectedPage="1"/>
</>);