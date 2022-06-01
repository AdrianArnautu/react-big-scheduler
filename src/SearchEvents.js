import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import SearchEventItem from './SearchEventItem'
import {DATE_FORMAT, DATETIME_FORMAT} from './index'

class SearchEvents extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func
    }

    render() {
        const {schedulerData, eventItem, slotClickedFunc, slotItemTemplateResolver} = this.props;
        const {behaviors, startDate, endDate, config, localeMoment, resources} = schedulerData;
        let events = [];

        let durationStart = localeMoment(startDate);
        let durationEnd = localeMoment(endDate).add(1, 'days');
        let eventStart = localeMoment(eventItem.start);
        let eventEnd = localeMoment(eventItem.end);
        let isStart = eventStart >= durationStart;
        let isEnd = eventEnd < durationEnd;
        let searchEventItem = <SearchEventItem
                            {...this.props}
                            key={eventItem.id}
                            eventItem={eventItem}
                            isStart={isStart}
                            isEnd={isEnd}
                        />;
        const resource = resources.find(resource => resource.id === eventItem.resourceId)
        const searchEventRow = <tr style={{minHeight: config.eventItemLineHeight + 2}} key={eventItem.id}>
            <td>{behaviors.searchViewItemDate(schedulerData, eventItem, localeMoment, DATETIME_FORMAT)}</td>
            <td>{resource !== undefined ? resource.name : ''}</td>
            <td><div className="day-event-container">{searchEventItem}</div></td>
          </tr>;
        events.push(searchEventRow);

        return (
            events
        );
    }
}

export default SearchEvents
