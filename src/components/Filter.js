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
        "Holiday_Flag": [FILTER_TYPE_LIST,             -1],
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
        
        const keys = Object.keys(filtersCopy);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if(filtersCopy[key][0] === FILTER_TYPE_INTEGER_INTERVAL) {
                const a = parseInt(filtersCopy[key][1]);
                const b = parseInt(filtersCopy[key][2]); 
                if(a && (!b || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => item[key] >= a);
                }
                if(b && (!a || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => item[key] <= b);
                }
            }
            else if(filtersCopy[key][0] === FILTER_TYPE_FLOAT_INTERVAL) {
                const a = parseFloat(filtersCopy[key][1]);
                const b = parseFloat(filtersCopy[key][2]); 
                if(a && (!b || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => item[key] >= a);
                }
                if(b && (!a || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => item[key] <= b);
                }
            }
            else if(filtersCopy[key][0] === FILTER_TYPE_DATE_INTERVAL){
                const a = Date.parse(filtersCopy[key][1]);
                const b = Date.parse(filtersCopy[key][2]); 

                const stringToDate = (str, delimiter) => {
                    let parts = str.split(delimiter);
                    let dateObject = new Date(parts[2] + "-" + parts[1] + "-" + parts[0]);
                    return dateObject;
                };

                if(a && (!b || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => stringToDate(item[key], "-") >= a);
                }
                if(b && (!a || b >= a)) {
                    filteredTableData = filteredTableData.filter(item => stringToDate(item[key], "-") <= b);
                }
            }
            else {
                if(filtersCopy[key][1] !== -1) {
                    filteredTableData = filteredTableData.filter(item => parseInt(item[key]) === filtersCopy[key][1]);
                }
            }
        }
     
        setFilters(filtersCopy);
        props.updateTableData(filteredTableData);
    };

    const updateHolidayFlagFilter = (event) => {
        updateFilters("Holiday_Flag", parseInt(event.target.value), 1);
    };
    
    const resetFilters = (event) => {
        setFilters(defaultFilters);
        props.updateTableData(props.getRawTableData());
    };

    return (
        <>
            <h4>Фильтр</h4>
            <table className="table-controls">
                <tbody>
                    <tr>
                        <td>Магазин:</td>
                        <td>от <TextboxComponents.IntNumberOnlyTextbox value={filters["Store"][1]} filterName="Store" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.IntNumberOnlyTextbox value={filters["Store"][2]} filterName="Store" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Дата:</td>
                        <td>от <DatePickerComponents.DatePicker value={filters["Date"][1]} filterName="Date" index={1} updateFilters={updateFilters}/></td>
                        <td>до <DatePickerComponents.DatePicker value={filters["Date"][2]} filterName="Date" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Продажи за неделю:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox value={filters["Weekly_Sales"][1]} filterName="Weekly_Sales" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox value={filters["Weekly_Sales"][2]} filterName="Weekly_Sales" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Выходной:</td>
                        <td>
                            <select onChange={updateHolidayFlagFilter}>
                                <option value={-1} defaultValue>Не важно</option>
                                <option value={1}>Да</option>
                                <option value={0}>Нет</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Температура:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox value={filters["Temperature"][1]} filterName="Temperature" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox value={filters["Temperature"][2]} filterName="Temperature" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Цена топлива:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox value={filters["Fuel_Price"][1]} filterName="Fuel_Price" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox value={filters["Fuel_Price"][2]} filterName="Fuel_Price" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Цена за показ:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox value={filters["CPI"][1]} filterName="CPI" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox value={filters["CPI"][2]} filterName="CPI" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td>Безработица:</td>
                        <td>от <TextboxComponents.FloatNumberOnlyTextbox value={filters["Unemployment"][1]} filterName="Unemployment" index={1} updateFilters={updateFilters}/></td>
                        <td>до <TextboxComponents.FloatNumberOnlyTextbox value={filters["Unemployment"][2]} filterName="Unemployment" index={2} updateFilters={updateFilters}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><input type="button" onClick={resetFilters} className="button-right" value="Очистить фильтры"/></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}