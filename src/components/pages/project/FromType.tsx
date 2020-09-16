import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";
import { IPath } from "../../../model/Path";
import { InlineEdit } from "../../common/InlineEdit";

const InputLabel = styled.div`
  position: relative;

  color: ${Colours.darkText};
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;

/*
const Indented = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  margin-right: 5px;
  width: 100%;
`;
*/

interface Props {
  editable?: boolean;
  path: IPath;
}

export function FromType({ path, editable }: Props) {
  if (path.param.type.params) {
    return <RecordType path={path} />;
  }

  return <Input path={path} editable={editable} />;
}

function Input({ path, editable }: Props) {
  return (
    <InputLabel>
      {editable ? (
        <InlineEdit
          type="text"
          value={path.param.name}
          onSave={path.param.setName}
          buttonsAlign="before"
        />
      ) : (
        path.param.name
      )}
      <FromConnector path={path.path} />
    </InputLabel>
  );
}

function RecordType({ path }: { path: IPath }) {
  return <Input path={path} />;
}

// {param.param?.type && <TypeIcon type={param.param.type} />}
/* 
function RecordType({ type, refName }: { refName: string; type: IType }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };


  useLayoutEffect(() => {
    (window as any)?.dirty();
  }, [expanded]);
 

  //  const thisRefId = [refName, type.id].join(".");

  return (
    <>
      <InputLabel>
        {type.name}
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
      </InputLabel>
      {expanded && (
        <Indented>
          {
          type.types?.map((type) => (
            <FromType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))}
          <NewType />
        </Indented>
      )}
    </>
  );
}

   
<>
      <InputLabel>
        {type.name}
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        
        <FromConnector refName={thisRefId} />
      </InputLabel>
      {expanded && (
        <Indented>
          {
          type.types?.map((type) => (
            <FromType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))}
          <NewType />
        </Indented>
      )}
    </>
    */
