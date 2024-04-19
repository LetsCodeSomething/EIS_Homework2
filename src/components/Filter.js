import React from 'react';

import * as TextboxComponents from "./Textbox";
import * as DatePickerComponents from "./DatePicker";
import * as DropDownListComponents from "./DropDownList";

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

    //true means ascending order, false means descending.
    const defaultSorts = [
        {"key": -1, "order": true},
        {"key": -1, "order": true},
        {"key": -1, "order": true}
    ];

    const [filters, setFilters] = React.useState(defaultFilters);
    const [sorts, setSorts] = React.useState(defaultSorts);

    const updateFilters = (filterName, filterValue, index) => {
        let filtersCopy = Object.assign(filters);
        filtersCopy[filterName][index] = filterValue;
        
        let processedTableData = applySortsToData(applyFiltersToData(props.getRawTableData(), filtersCopy), sorts);
     
        setFilters(filtersCopy);
        props.updateTableData(processedTableData);
    };
    
    const resetFilters = (event) => {
        setFilters(defaultFilters);
        props.updateTableData(applySortsToData(props.getRawTableData(), sorts));
    };

    const updateSorts = (sortName, sortValue, index) => {
        let sortsCopy = Object.assign(sorts);
        sortsCopy[index][sortName] = sortValue;

        let processedTableData = applySortsToData(props.getFilteredTableData(), sortsCopy);
        
        setSorts(sortsCopy);
        props.updateTableData(processedTableData);
    };

    const resetSorts = (event) => {
        setSorts(defaultSorts);
        props.updateTableData(applyFiltersToData(props.getRawTableData(), filters));
    };

    const applyFiltersToData = (tableData, filtersCopy) => {
        const keys = Object.keys(filtersCopy);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if(filtersCopy[key][0] === FILTER_TYPE_INTEGER_INTERVAL) {
                const a = parseInt(filtersCopy[key][1]);
                const b = parseInt(filtersCopy[key][2]); 
                if(a && (!b || b >= a)) {
                    tableData = tableData.filter(item => item[key] >= a);
                }
                if(b && (!a || b >= a)) {
                    tableData = tableData.filter(item => item[key] <= b);
                }
            }
            else if(filtersCopy[key][0] === FILTER_TYPE_FLOAT_INTERVAL) {
                const a = parseFloat(filtersCopy[key][1]);
                const b = parseFloat(filtersCopy[key][2]); 
                if(a && (!b || b >= a)) {
                    tableData = tableData.filter(item => item[key] >= a);
                }
                if(b && (!a || b >= a)) {
                    tableData = tableData.filter(item => item[key] <= b);
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
                    tableData = tableData.filter(item => stringToDate(item[key], "-") >= a);
                }
                if(b && (!a || b >= a)) {
                    tableData = tableData.filter(item => stringToDate(item[key], "-") <= b);
                }
            }
            else {
                const a = parseInt(filtersCopy[key][1]);
                if(a !== -1) {
                    tableData = tableData.filter(item => parseInt(item[key]) === a);
                }
            }
        }

        return tableData;
    };

    const applySortsToData = (tableData, sortsCopy) => {
        if(!sortsCopy[0]["key"]) {
            return tableData;
        }
        
        return tableData;
    };

    const keys = [[-1, "Нет"], 
                  ["Store", "Магазин"], 
                  ["Date", "Дата"], 
                  ["Weekly_Sales", "Продажи за неделю"], 
                  ["Holiday_Flag", "Выходной"], 
                  ["Temperature", "Температура"], 
                  ["Fuel_Price", "Цена топлива"], 
                  ["CPI", "Цена за показ"], 
                  ["Unemployment", "Безработица"]];
    let sortValues1 = [];
    

    return (
        <>
        <div className="flexbox-container">
            <div>
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
                                <DropDownListComponents.DropDownList values={[[-1, "Не важно"], [1, "Да"], [0, "Нет"]]} selectedValue={filters["Holiday_Flag"][1]} filterName="Holiday_Flag" index={1} updateFilters={updateFilters}/>
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
            </div>
            <div>
                <h4>Сортировка</h4>
                <table className="table-controls">
                    <tbody>
                        <tr>
                            <td>Сортировать по</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><DropDownListComponents.DropDownList values={keys} selectedValue={sorts[0]["key"]} filterName="key" index={0} updateFilters={updateSorts}/></td>
                            <td>По убыванию</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>По убыванию</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>По убыванию</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" className="button-right" value="Сбросить сортировку"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}