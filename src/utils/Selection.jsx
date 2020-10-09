import React from "react";
import { isNil, forEach, has } from "ramda";

export class Selection extends React.Component {
  /**
   * Component default props
   */
  getDefaultProps = () => {
    return {
      enabled: true,
      onSelectionChange: () => undefined,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      selectedItems: {},
      appendMode: false,
    };
  }

  /**
   * On componentn mount
   */
  componentWillMount = () => {
    this.selectedChildren = {};
  };

  /**
   * On component props change
   */
  componentWillReceiveProps = (nextProps) => {
    var nextState = {};
    if (!nextProps.enabled) {
      nextState.selectedItems = {};
    }
    this.setState(nextState);
  };

  /**
   * On component update
   */
  componentDidUpdate = () => {
    if (this.state.mouseDown && !isNil(this.state.selectionBox)) {
      this._updateCollidingChildren(this.state.selectionBox);
    }
  };

  /**
   * On root element mouse down
   */
  _onMouseDown = (e) => {
    if (!this.props.enabled || e.button === 2 || e.nativeEvent.which === 2) {
      return;
    }
    var nextState = {};
    if (e.ctrlKey || e.altKey || e.shiftKey) {
      nextState.appendMode = true;
    }
    nextState.mouseDown = true;
    nextState.startPoint = {
      x: e.pageX,
      y: e.pageY,
    };
    this.setState(nextState);
    window.document.addEventListener("mousemove", this._onMouseMove);
    window.document.addEventListener("mouseup", this._onMouseUp);
  };

  /**
   * On document element mouse up
   */
  _onMouseUp = (e) => {
    window.document.removeEventListener("mousemove", this._onMouseMove);
    window.document.removeEventListener("mouseup", this._onMouseUp);
    this.setState({
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      appendMode: false,
    });
    this.props.onSelectionChange.call(null, Object.keys(this.selectedChildren));
  };

  /**
   * On document element mouse move
   */
  _onMouseMove = (e) => {
    e.preventDefault();
    console.log("_onMouseMove");
    if (this.state.mouseDown) {
      var endPoint = {
        x: e.pageX,
        y: e.pageY,
      };
      this.setState({
        endPoint: endPoint,
        selectionBox: this._calculateSelectionBox(
          this.state.startPoint,
          endPoint
        ),
      });
    }
  };

  /**
   * Render
   */
  render() {
    var className = "selection " + (this.state.mouseDown ? "dragging" : "");
    return (
      <div
        className={className}
        ref="selectionBox"
        onMouseDown={this._onMouseDown}
      >
        {this.renderChildren()}
        {this.renderSelectionBox()}
      </div>
    );
  }

  /**
   * Render children
   */
  renderChildren = () => {
    var index = 0;
    var _this = this;
    var tmpChild;
    return React.Children.map(this.props.children, function (child) {
      var tmpKey = isNil(child.key) ? index++ : child.key;
      var isSelected = has(_this.selectedChildren, tmpKey);
      tmpChild = React.cloneElement(child, {
        ref: tmpKey,
        selectionParent: _this,
        isSelected: isSelected,
      });
      return (
        <div
          className={"select-box " + (isSelected ? "selected" : "")}
          onClickCapture={function (e) {
            if ((e.ctrlKey || e.altKey || e.shiftKey) && _this.props.enabled) {
              e.preventDefault();
              e.stopPropagation();
              _this.selectItem(tmpKey, !has(_this.selectedChildren, tmpKey));
            }
          }}
        >
          {tmpChild}
        </div>
      );
    });
  };

  /**
   * Render selection box
   */
  renderSelectionBox = () => {
    if (
      !this.state.mouseDown ||
      isNil(this.state.endPoint) ||
      isNil(this.state.startPoint)
    ) {
      return null;
    }
    return (
      <div className="selection-border" style={this.state.selectionBox}></div>
    );
  };

  /**
   * Manually update the selection status of an item
   * @param {string} key the item's target key value
   * @param {boolean} isSelected the item's target selection status
   */
  selectItem = (key, isSelected) => {
    if (isSelected) {
      this.selectedChildren[key] = isSelected;
    } else {
      delete this.selectedChildren[key];
    }
    this.props.onSelectionChange.call(null, Object.keys(this.selectedChildren));
    this.forceUpdate();
  };

  /**
   * Select all items
   */
  selectAll = () => {
    forEach(
      function (ref, key) {
        if (key !== "selectionBox") {
          this.selectedChildren[key] = true;
        }
      }.bind(this),
      this.refs
    );
  };

  /**
   * Manually clear selected items
   */
  clearSelection = () => {
    this.selectedChildren = {};
    this.props.onSelectionChange.call(null, []);
    this.forceUpdate();
  };

  /**
   * Detect 2D box intersection
   */
  _boxIntersects = (boxA, boxB) => {
    if (
      boxA.left <= boxB.left + boxB.width &&
      boxA.left + boxA.width >= boxB.left &&
      boxA.top <= boxB.top + boxB.height &&
      boxA.top + boxA.height >= boxB.top
    ) {
      return true;
    }
    return false;
  };

  /**
   * Updates the selected items based on the
   * collisions with selectionBox
   */
  _updateCollidingChildren = (selectionBox) => {
    var tmpNode = null;
    var tmpBox = null;
    var _this = this;
    forEach(function (ref, key) {
      if (key !== "selectionBox") {
        tmpNode = React.findDOMNode(ref);
        tmpBox = {
          top: tmpNode.offsetTop,
          left: tmpNode.offsetLeft,
          width: tmpNode.clientWidth,
          height: tmpNode.clientHeight,
        };
        if (_this._boxIntersects(selectionBox, tmpBox)) {
          _this.selectedChildren[key] = true;
        } else {
          if (!_this.state.appendMode) {
            delete _this.selectedChildren[key];
          }
        }
      }
    }, this.refs);
  };

  /**
   * Calculate selection box dimensions
   */
  _calculateSelectionBox = (startPoint, endPoint) => {
    if (!this.state.mouseDown || isNil(endPoint) || isNil(startPoint)) {
      return null;
    }
    var parentNode = this.refs.selectionBox.getDOMNode();
    var left = Math.min(startPoint.x, endPoint.x) - parentNode.offsetLeft;
    var top = Math.min(startPoint.y, endPoint.y) - parentNode.offsetTop;
    var width = Math.abs(startPoint.x - endPoint.x);
    var height = Math.abs(startPoint.y - endPoint.y);
    return {
      left: left,
      top: top,
      width: width,
      height: height,
    };
  };
}
