import React from 'react';

import * as TextboxComponents from "./Textbox";
import * as DatePickerComponents from "./DatePicker";

export function Filter(props) {
    const FILTER_TYPE_INTEGER_INTERVAL = 0;
    const FILTER_TYPE_FLOAT_INTERVAL = 1;
    const FILTER_TYPE_DATE_INTERVAL = 2;
    const FILTER_TYPE_LIST = 3;

    const defaultFilters = {
        "Store":        [FILTER_TYPE_INTEGER_INTERVAL, NaN, NaN],
        "Date":         [FILTER_TYPE_DATE_INTERVAL,    NaN, NaN],
        "Weekly_Sales": [FILTER_TYPE_FLOAT_INTERVAL,   NaN, NaN], 
        "Holiday_Flag": [FILTER_TYPE_LIST,             NaN],
        "Temperature":  [FILTER_TYPE_FLOAT_INTERVAL,   NaN, NaN], 
        "Fuel_Price":   [FILTER_TYPE_FLOAT_INTERVAL,   NaN, NaN],
        "CPI":          [FILTER_TYPE_FLOAT_INTERVAL,   NaN, NaN], 
        "Unemployment": [FILTER_TYPE_FLOAT_INTERVAL,   NaN, NaN]
    };

    const [filters, setFilters] = React.useState(defaultFilters);
    const updateFilters = (filterName, filterValue, index) => {
        let filtersCopy = Object.assign(filters);
        filtersCopy[filterName][index] = filterValue;
        
        let filteredTableData = props.getRawTableData();
        
        const stringToDate = (str, delimiter) => {
            let parts = str.split(delimiter);
            let dateObject = new Date(parts[2] + "-" + parts[1] + "-" + parts[0]);
            return dateObject;
        }

        const keys = Object.keys(filtersCopy);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if(filtersCopy[key][0] === FILTER_TYPE_INTEGER_INTERVAL || filtersCopy[key][0] === FILTER_TYPE_FLOAT_INTERVAL) {
                if(filtersCopy[key][1] && (!filtersCopy[key][2] || filtersCopy[key][2] >= filtersCopy[key][1])) {
                    filteredTableData = filteredTableData.filter(item => item[key] >= filtersCopy[key][1]);
                }
                if(filtersCopy[key][2] && (!filtersCopy[key][1] || filtersCopy[key][2] >= filtersCopy[key][1])) {
                    filteredTableData = filteredTableData.filter(item => item[key] <= filtersCopy[key][2]);
                }
            }
            //Upper Date boundary seems to work incorrectly. TODO.
            else if(filtersCopy[key][0] === FILTER_TYPE_DATE_INTERVAL){
                if(filtersCopy[key][1] && (!filtersCopy[key][2] || filtersCopy[key][2] >= filtersCopy[key][1])) {
                    filteredTableData = filteredTableData.filter(item => stringToDate(item[key]) >= filtersCopy[key][1]);
                }
                if(filtersCopy[key][2] && (!filtersCopy[key][1] || filtersCopy[key][2] >= filtersCopy[key][1])) {
                    filteredTableData = filteredTableData.filter(item => stringToDate(item[key]) <= filtersCopy[key][2]);
                }
            }
            //TODO: holiday flag.
            else {
                if(filtersCopy[key][1]) {
                    filteredTableData = filteredTableData.filter(item => item[key] === filtersCopy[key][1]);
                }
            }
        }
     
        setFilters(filtersCopy);
        props.updateTableData(filteredTableData);
    };

    return (
        <>
            <h4>Фильтр</h4>
            <table className="table-controls">
                <tbody>
                    <tr>
                        <td>Магазин:</td>
                        <td>от <TextboxComponents.IntNumberOnlyTextbox filterName="Store" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.IntNumberOnlyTextbox filterName="Store" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Дата:</td>
                        <td>от <DatePickerComponents.DatePicker filterName="Date" index={1} updateFilters={updateFilters}/></td>
                        <td>до <DatePickerComponents.DatePicker filterName="Date" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Продажи за неделю:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox filterName="Weekly_Sales" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox filterName="Weekly_Sales" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Выходной:</td>
                        <td>
                            <select>
                                <option value="false" defaultValue>Не важно</option>
                                <option value="yes">Да</option>
                                <option value="no">Нет</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Температура:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox filterName="Temperature" updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox filterName="Temperature" updateFilters={updateFilters}/></td>
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