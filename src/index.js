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
        <>
            <h4>Фильтр</h4>
            <table className="table-controls">
                <tbody>
                    <tr>
                        <td>Магазин:</td>
                        <td>от <TextboxComponents.IntNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.IntNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td>Дата:</td>
                        <td>от <input type="date"/></td>
                        <td>до <input type="date"/></td>
                    </tr>
                    <tr>
                        <td>Продажи за неделю:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td>Выходной:</td>
                        <td>
                            <select>
                                <option value="false" selected>Не важно</option>
                                <option value="yes">Да</option>
                                <option value="no">Нет</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Температура:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td>Цена топлива:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td>Цена за показ:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td>Безработица:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><input type="button" value="Сбросить фильтры" className="button-right"/></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

root.render(<>
    <h3>Данные по продажам в Walmart</h3>
    <Filter/>
    <TableComponents.Table dataset={dataset} rowsPerPage="25" selectedPage="1"/>
</>);