import React, {Component} from "react"
import { Descriptions } from 'antd';

export default function PlayerInfo  (props) {



  if (props.playerinfo) return(

 <Descriptions id='Player_info_description' layout={'vertical'} size={'small'} bordered={true} column={2}  layout={'horizontal'} title={props.title}>
      {Object.entries(props.playerinfo).map(v => {
            let key = v[0];
            let value = v[1];
        return ( <Descriptions.Item id={key}  key={key} label={key}>{value}</Descriptions.Item>)
            })
      }
          </Descriptions>

    );
    return <p id='errorMessagePlayerInfo'>Could'nt return player info :/</p>
}