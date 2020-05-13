import React, {Component} from "react"
import { Descriptions } from 'antd';

export default function MatchInfo  (props) {

    return(

        <Descriptions layout={'vertical'} size={'small'} bordered={true} column={1}  layout={'horizontal'} title={"Player info"}>
            {Object.entries(props.matchInfo).map(v => {
                let key = v[0];
                let value = v[1];
                return ( <Descriptions.Item id={key}  key={key} label={key}>{value}</Descriptions.Item>)
            })
            }
        </Descriptions>
    );

}