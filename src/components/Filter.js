import React from 'react';

import * as TextboxComponents from "./Textbox";

export function Filter(props) {
    const defaultFilters = {
        "Store": 4
    };

    const [filters, setFilters] = React.useState(defaultFilters);
    const updateFilters = (filterName, filterValue) => {
        let filtersCopy = Object.assign(filters);
        filtersCopy[filterName] = filterValue;
        setFilters(filtersCopy);

        let filteredTableData = props.tableData.filter(item => item["Store"] >= filtersCopy["Store"]);
        props.updateTableData(filteredTableData);
    };

    return (
        <>
            <h4>Фильтр</h4>
            <table className="table-controls">
                <tbody>
                    <tr>
                        <td>Магазин:</td>
                        <td>от <TextboxComponents.IntNumberOnlyTextbox filterName="Store" updateFilters={updateFilters}/></td>
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
                                <option value="false" defaultValue>Не важно</option>
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