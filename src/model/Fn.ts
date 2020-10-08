import {
  types,
  Instance,
  SnapshotIn,
  destroy,
  getRoot,
  getSnapshot,
  clone,
} from "mobx-state-tree";
import { Param, IParamIn, IParam } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { IWire, IWireIn, Wire } from "./Wire";
import { getStore, IStore } from "./Store";
import { ISocket, createSockets } from "./Sockets";
import { createPlugs, IPlug } from "./Plug";
import { IPath } from "./Path";
import { Type } from "./Type";

export function findContext(
  contextId: string,
  object: Record<string, any>
): Record<string, any> | undefined {
  if (object[contextId]) {
    return object[contextId];
  }

  const values = Object.values(object);
  var i: number;
  for (i = 0; i < values.length; i++) {
    const value = values[i];
    if (typeof value === "object") {
      const c = findContext(contextId, value);
      if (c) {
        return c;
      }
    }
  }
}

export const Fn = types
  .model("Fn", {
    id: types.identifier,
    name: types.string,
    core: types.boolean,
    input: types.array(Param),
    output: types.array(Param),
    tokens: types.array(Token),
    wires: types.array(Wire),
    values: types.map(types.frozen()),
    expandedParams: types.map(types.boolean),
    defaultSelectedType: types.maybe(types.reference(Type)),
  })
  .views((self) => ({
    get plugs(): IPlug[] {
      const store = getStore(self);

      const output = store.runtimeValue;
      const contextId = store.functionContext?.id;
      const context =
        contextId !== undefined ? findContext(contextId, output) : output;

      // const context = contextId ? { [self.id]: output[contextId] } : output;

      return createPlugs(
        self as any,
        self.input,
        self.id,
        self.expandedParams,
        context || {}
      );
    },
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.output,
        self.wires,
        self.values,
        self.id,
        self.expandedParams,
        undefined
      );
    },
    get isMain(): boolean {
      return self.id !== getRoot<IStore>(self).project.mainFn.id;
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addToken(position: IPoint, fn: IFn | IFnIn) {
      const newToken: ITokenIn = {
        id: generateId(),
        position,
        fn: fn.id,
      };
      self.tokens.push(newToken);
    },
    removeAllWiresWithPath(path: IPath) {
      const connected = self.wires.filter(
        (wire) => wire.from.path === path.path || wire.to.path === path.path
      );
      connected.forEach((element) => {
        destroy(element);
      });
    },
    removeAllWiresToParam(path: IPath) {
      const connected = self.wires.filter(
        (wire) =>
          wire.from.param.id === path.param.id ||
          wire.to.param.id === path.param.id
      );
      connected.forEach((element) => {
        destroy(element);
      });
    },
    removeToken(token: IToken) {
      const connected = self.wires.filter(
        (wire) => wire.from.target === token || wire.to.target === token
      );
      connected.forEach((element) => {
        destroy(element);
      });
      destroy(token);
    },
    addInputParam(typeId: string) {
      const type = getStore(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: type.name,
          type: type.id,
        };
        self.input.push(newParam);
      }
    },
    createNewInputType(name: string) {
      const newType = getStore(self).project.createNewType(name);
      const newParam: IParamIn = {
        name: newType.name,
        type: newType.id,
      };
      self.input.push(newParam);
    },
    deleteParam(param: IParam) {
      destroy(param);
    },
    addOutputParam(typeId: string) {
      const type = getRoot<IStore>(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: type.name,
          type: type.id,
        };
        self.output.push(newParam);
      }
    },
    createNewOutputType(name: string) {
      const newType = getStore(self).project.createNewType(name);
      const newParam: IParamIn = {
        name: newType.name,
        type: newType.id,
      };
      self.output.push(newParam);
    },
    addValue(path: string, value: number) {
      self.values.set(path, value);
    },
    removeValue(path: string) {
      self.values.delete(path);
    },
    expandParam(path: string) {
      self.expandedParams.set(path, true);
    },
    shrinkParam(path: string) {
      self.expandedParams.delete(path);
    },
    generateFunction(selectedTokens: string[]) {
      console.log("generateFunction");
      const store = getStore(self);
      // copy the selected tokens
      const selectedTokenList = self.tokens
        .filter((token) => selectedTokens.includes(token.id))
        .map((t) => getSnapshot(t));

      // copy the wires for tokens
      const interConnected = self.wires
        .filter(
          (wire) =>
            selectedTokens.includes(wire.to.target.id) &&
            selectedTokens.includes(wire.from.target.id)
        )
        .map((t) => getSnapshot(t));

      const newFnId = generateId();

      // now find the wires connecting the input of  the new fn
      const wiresInto = self.wires.filter(
        (wire) =>
          selectedTokens.includes(wire.to.target.id) &&
          !selectedTokens.includes(wire.from.target.id)
      );
      // generate the params and wire them up
      const incoming = wiresInto.map((wire) => {
        const param = Param.create({
          name: wire.to.param.name,
          type: wire.to.param.type,
        });
        const path = {
          target: newFnId,
          param: param.id,
          path: newFnId + "." + param.id,
        };
        const newWire = {
          id: wire.to.path,
          from: path,
          to: getSnapshot(wire.to),
        };

        return {
          param,
          newWire,
        };
      });
      const inputs = incoming.map((i) => i.param);
      const inWires = incoming.map((i) => i.newWire);

      // now find the wires connecting to the  output of  the new fn
      const wiresOut = self.wires.filter(
        (wire) =>
          !selectedTokens.includes(wire.to.target.id) &&
          selectedTokens.includes(wire.from.target.id)
      );
      // generate the params and wire them up
      const outgoing = wiresOut.map((wire) => {
        const param = Param.create({
          name: wire.from.param.name,
          type: wire.from.param.type,
        });
        const newWire = {
          id: wire.to.path,
          from: getSnapshot(wire.from),
          to: {
            target: newFnId,
            param: param.id,
            path: newFnId + "." + param.id,
          },
        };
        return {
          param,
          newWire,
        };
      });

      const outputs = outgoing.map((i) => i.param);
      const outWires = outgoing.map((i) => i.newWire);
      // now create that new function
      const newFn: IFnIn = {
        id: newFnId,
        core: false,
        name: "new",
        input: inputs,
        output: outputs,
        tokens: selectedTokenList,
        wires: [...interConnected, ...inWires, ...outWires],
      };

      // now remove the selected tokens from the parent function
      self.tokens
        .filter((token) => selectedTokens.includes(token.id))
        .forEach((token) => {
          this.removeToken(token);
        });

      store.addNewFunction(newFn);
      // create the token
      const newTokenId = generateId();
      const newToken: ITokenIn = {
        id: newTokenId,
        position: selectedTokenList[0].position,
        fn: newFnId,
      };

      self.tokens.push(newToken);
      // re wire all the inputs and out puts to new token
      // inputs
      const inConnectWires: IWireIn[] = wiresInto.map((wire, index) => {
        const param = inputs[index];
        const path = {
          target: newTokenId,
          param: param.id,
          path: newTokenId + "." + param.id,
        };
        return {
          id: path.path,
          from: getSnapshot(wire.from),
          to: path,
        };
      });
      // outputs
      const outConnectWires: IWireIn[] = wiresOut.map((wire, index) => {
        const param = outputs[index];
        const path = {
          target: newTokenId,
          param: param.id,
          path: newTokenId + "." + param.id,
        };

        return {
          id: wire.to.path,
          from: path,
          to: getSnapshot(wire.to),
        };
      });

      self.wires.push(...inConnectWires, ...outConnectWires);
      //
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
