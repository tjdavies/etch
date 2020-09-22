import React from "react";

import { IPlug } from "../../../model/Plug";
import { ParamView } from "./ParamView";

interface Props {
  editable?: boolean;
  path: IPlug;
}

export function FromType({ path, editable }: Props) {
  return <ParamView path={path} editable={editable} socket={false} />;
}
