import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeIcon } from "./TypeIcon";
import { ToConnector } from "./ToConnector";
import { observer } from "mobx-react-lite";
import { IPlug } from "../../../model/Plug";

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  gap: 5px;
`;

/*
const Indented = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-left: 5px;
  width: 100%;
`;
*/

interface Props {
  param: IPlug;
}

export const ToType = observer(({ param }: Props) => {
  /*
  if (param.type.params) {
    return <RecordType type={param.type} refName={refName} />;
  }
*/
  return (
    <InputLabel>
      <ToConnector socket={param} />
      <TypeIcon type={param.param.type} />
      {param.param.name}
    </InputLabel>
  );
});

/*
function RecordType({ type, refName }: { refName: string; type: IType }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useLayoutEffect(() => {
    (window as any)?.dirty();
  }, [expanded]);

  const thisRefId = [refName, type.id].join(".");

  return (
    <>
      <InputLabel>
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        {type.name}
      </InputLabel>
      {expanded && (
        <Indented>
          {/*
          type.params?.map((type) => (
            <ToType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))
         }
          <NewType />
        </Indented>
      )}
    </>
  );
}
 */
