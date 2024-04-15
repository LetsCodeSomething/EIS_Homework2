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

function TableRow(props) {
    const cells = Object.values(props.row).map((item, index) => <td key={index}> {item} </td>);

    return (
        <tr>
            {cells}
        </tr>
    );
}   

function Table(props) {
    const [selectedPage, setSelectedPage] = React.useState(parseInt(props.selectedPage));
    //const updateSelectedPage = (value) => setSelectedPage(value);

    //Computation of the amount of rows to display for the selected page.
    const pagesCount = Math.ceil(dataset.length * 1.0 / parseInt(props.rowsPerPage));
    const remainingRowsCount = dataset.length - selectedPage * parseInt(props.rowsPerPage);
    const sliceSize = remainingRowsCount >= parseInt(props.rowsPerPage) ? parseInt(props.rowsPerPage) : remainingRowsCount;
    
    //Create table rows.
    const rows = dataset.slice(selectedPage * parseInt(props.rowsPerPage), 
                               selectedPage * parseInt(props.rowsPerPage) + sliceSize).map((item, index) => <TableRow key={index} row={item}/>);
    
    let pageNumbers = [];
    if(pagesCount < 8) {
        for (let i = 0; i < 7; i++) {
            pageNumbers.push(i + 1);
        }
    }
    else {
        if(selectedPage < 4) {
            for (let i = 0; i < selectedPage + 3; i++) {
                pageNumbers.push(i + 1);
            }
            
            //-1 represents the ellipsis.
            pageNumbers.push(-1);

            pageNumbers.push(pagesCount);
        }
        else if (selectedPage > pagesCount - 5) {
            pageNumbers.push(1);
            
            pageNumbers.push(-1);

            for (let i = selectedPage - 3; i < pagesCount; i++) {
                pageNumbers.push(i + 1);
            }
        }
        else {
            pageNumbers.push(1);
            pageNumbers.push(-1);

            for (let i = selectedPage - 2; i < selectedPage + 3; i++) {
                pageNumbers.push(i + 1);
            }

            pageNumbers.push(-1);
            pageNumbers.push(pagesCount);
        }
    }
    
    const handleClick = (event) => {
        const text = event.target.innerHTML.trim();

        if(text !== "...") {
            setSelectedPage(parseInt(text) - 1);
        }
    };

    const pageButtons = pageNumbers.map((item, index) => {
        let className = "pagination-button";
        if(item === -1) {
            className = "pagination-ellipsis";
        }
        else if (item - 1 === selectedPage) {
            className = "pagination-button-selected";
        }
         
        return item === -1 ? <div key={index} className={className} onClick={handleClick}>...</div> : 
                             <div key={index} className={className} onClick={handleClick}>{item}</div>;
    });

    return (
        <>
            <table className="table-data">
                <thead>
                    <TableRow row={Object.keys(dataset[0])} />
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {pageButtons}
        </>
    );
}

root.render(<>
    <h3>Данные по продажам в Walmart</h3>
    <Table rowsPerPage="25" selectedPage="1"/>
</>);