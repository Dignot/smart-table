import {rules, createComparison} from "../lib/compare.js";

export function initSearching(elements, searchField) {
    console.log(1)
    return (data, state, action) => {
        const value = state[searchField];
        if (!value) return data;
        // Первый аргумент — массив строк-имен правил
        // Второй аргумент — массив функций-правил
        const compare = createComparison(
            ['skipEmptyTargetValues'],
            [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]
        );
        return data.filter(row => compare(row, state));
    }
}