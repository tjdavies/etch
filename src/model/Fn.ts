import {
  types,
  Instance,
  SnapshotIn,
  destroy,
  getRoot,
  getSnapshot,
} from "mobx-state-tree";
import { Param, IParamIn, IParam } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { getStore, IStore } from "./Store";
import { ISocket, createSockets } from "./Sockets";
import { createPlugs, IPlug } from "./Plug";
import { IPath } from "./Path";
import { Type } from "./Type";
import { Wires } from "../components/pages/project/wires/Wires";

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
        position: {
          x: position.x,
          y: position.y,
        },
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
        .filter((token) => selectedTokens.some((id) => token.id === id))
        .map((t) => getSnapshot(t));

      // copy the wires for tokens
      const connected = self.wires
        .filter((wire) =>
          selectedTokens.some(
            (tokenId) =>
              wire.from.target.id === tokenId || wire.to.target.id === tokenId
          )
        )
        .map((t) => getSnapshot(t));

      const newFn: IFnIn = {
        id: generateId(),
        core: false,
        name: "new",
        input: [],
        output: [],
        tokens: selectedTokenList,
        wires: connected,
      };
      // remove the selected tokens
      self.tokens
        .filter((token) => selectedTokens.some((id) => token.id !== id))
        .forEach((token) => {
          this.removeToken(token);
        });

      store.addNewFunction(newFn);

      this.addToken(selectedTokenList[0].position, newFn);
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
