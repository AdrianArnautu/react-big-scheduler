import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import SearchEvents from './SearchEvents'

class SearchView extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        slotClickedFunc: PropTypes.func,
    }

    render() {
        const {schedulerData} = this.props;
        const {events, config} = schedulerData;

        let tableHeaderHeight = schedulerData.getTableHeaderHeight();
        let resourceEventsList = events.map((item) => {
            return <SearchEvents {...this.props} eventItem={item} key={item.id} />
        });

        return (
            <tr>
                <td>
                    <table className="scheduler-table">
                        <thead>
                            <tr style={{height: tableHeaderHeight}}>
                                <th style={{width: '20%'}} className="header3-text">{config.searchViewDateName}</th>
                                <th style={{width: '20%'}} className="header3-text">{config.resourceName}</th>
                                <th style={{width: '60%'}} className="header3-text">{config.searchViewItemName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resourceEventsList}
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}

export default SearchView
