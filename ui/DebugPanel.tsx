import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { styled, alpha } from "@mui/material/styles";

const generate = (debugData: { [key: string]: any }, refs) => {
  
  return Object.keys(debugData).map((key) => (
    <ListItem ref={refs[key]}>
      {key} : {debugData[key]}
    </ListItem>
  ));
};

export default function DebugPanel({
  debugData,
}) {
  const refs = React.useMemo(() => {
    const refMap = {};
    Object.keys(debugData.data).map((key) => (refMap[key] = React.createRef()));
    return refMap;
  }, [debugData]);
  
  React.useEffect(()=>{
    return debugData.on("update", ({ key, value }) => {
        if (!refs[key]) return;
    
        refs[key].current.textContent = `${key} : ${value.toString().split('').splice(0,15).join('')}`;
      });

  })
  
  return <List>{generate(debugData.data, refs)}</List>;
}
