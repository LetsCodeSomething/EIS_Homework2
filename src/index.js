import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import dataset from './dataset/Dataset';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const TableRow = (props) => {
    const cells = Object.values(props.row).map((item, index) => <td key={index}> {item} </td>);

    return (
        <tr>
            {cells}
        </tr>
    );
}   

const Table = (props) => {
    const rows = dataset.slice(0, parseInt(props.rowsPerPage)).map((item, index) => <TableRow row={item} key={index}/>);

    const pagesCount = Math.ceil(dataset.length * 1.0 / parseInt(props.rowsPerPage));

    return (
        <>
            <h3>Данные по продажам в Walmart</h3>
            <table className="table-data">
                <thead>
                    <TableRow row={Object.keys(dataset[0])} />
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {props.selectedPage}...{pagesCount}
        </>
    )
}

root.render(<><Table rowsPerPage="25" selectedPage="1"/></>);