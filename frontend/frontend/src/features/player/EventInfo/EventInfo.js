import React, {Component} from "react"
import { Descriptions } from 'antd';

export default function PlayerInfo  (props) {
    let layout = 'horizontal';
    if(props.layout && props.layout == 'vertical'){
        layout = 'vertical'
    }

    if (props.eventInfo) return(
        <Descriptions class={'eventType'} layout={'vertical'} size={'small'} bordered={true} column={1}  layout={layout} title={props.title}>

            {Object.entries(props.eventInfo).map(v => {
                let key = v[0];
                let value = v[1];
                return (<Descriptions.Item id={key} key={key} label={key}>{value}</Descriptions.Item>)
                })
            }

        </Descriptions>
    );
    return <p id='errorMessageEventInfo'>Could'nt return eventdata data here :/</p>

}