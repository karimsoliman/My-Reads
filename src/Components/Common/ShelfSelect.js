import React, { Component } from 'react';
import Shelf from '../../Constants/Shelf';

class ShelfSelect extends Component {
    render() {
        const { shelf, onShelfChange } = this.props;
        return (
            <div className="book-shelf-changer">
                <select defaultValue={shelf ? shelf : 'none'} onChange={onShelfChange}>
                    <option value="move" disabled>Move to...</option>
                    {
                        Object.entries(Shelf).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))
                    }
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default ShelfSelect;