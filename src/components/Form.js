import React from 'react';
import { connect } from 'react-redux';
import { useInput } from './Helpers';

const CustomForm = () => {
    const [cols, setCols, handleCols] = useInput('');
    const [rows, setRows, handleRows] = useInput('');

    const resetValues = (e) => {
        e.preventDefault();
        setCols('');
        setRows('');
    };
    return (
        <div className="input-form">
            <form>
                <label> Columns: </label>
                <input
                    className="cols-value"
                    id="cols"
                    name="cols"
                    onChange={(e) => handleCols(e.target.value)}
                    placeHolder=""
                    type="number"
                    value={cols}
                />
                <label> Rows: </label>
                <input
                    className="rows-value"
                    id="rows"
                    name="rows"
                    onChange={(e) => handleRows(e.target.value)}
                    placeHolder=""
                    type="number"
                    value={rows}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CustomForm;
