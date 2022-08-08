import React, { useContext, useState } from 'react';
import treeContext from '../Context/treecontext.js';
import './tree.component.css';
import Node from './Node.component.js';
import Treemodel from '../Models/tree.model.js';
import logo from '../logoDOM.png';

const Tree = () => {
  let Treecontext = useContext(treeContext);
  const [currNode, setCurrNode] = useState(0);
  const [insertKey, setInsertKey] = useState(0);
  const [removeKey, setRemoveKey] = useState(0);
  const [searchKey, setSearchKey] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState("....");
  const [value, setValue] = useState(0);
  const [treeNode, setTreeNode] = useState(new Treemodel());
  const [updateTree, setUpdateTree] = useState(0);
  let nodelist = [];
  let found = true;

  const insertNode = () => {
    treeNode.insert(parseInt(insertKey), parseInt(value));
    setUpdateTree((value) => ++value);
    setInputValue('');
    setInsertKey(0);
    setStatus("....");
  }

  const removeNode = () => {
    treeNode.remove(parseInt(removeKey));
    setUpdateTree((value) => ++value);
    setInputValue('');
    setStatus("....");
  }

  const resetTree = () => {
    treeNode.root = null;
    setUpdateTree((value) => ++value);
  }

  const searchNode = () => {
    setStatus("....");
    nodelist = [];
    found = treeNode.findingKey(treeNode.root, calculateTraversal, searchKey);
    showAnimation();
    setTimeout(() => {
      if (found) setStatus( "FOUND! ✅");
      else setStatus("NOT FOUND! ❌");
    }, 1000 * nodelist.length);

  }

  const Handlechange = ({ target: { value } }) => {
    const Updatedvalue = value.length > 6 ? String(value).slice(0, -1) : value;
    setInputValue(Updatedvalue);
    setInsertKey(Updatedvalue);
    setRemoveKey(Updatedvalue);
    setSearchKey(Updatedvalue);
  }

  const constructTree = (node) => {
    if (node !== null) {
      return (
        <div className="subtree">
          <Node key={node.key} id={node.key} />

          {node.left && !node.right && (
            <div className="children left"> {constructTree(node.left)}</div>
          )}
          {!node.left && node.right && (
            <div className="children right">{constructTree(node.right)}</div>
          )}

          {node.left && node.right && (
            <div className="children">
              {constructTree(node.left)}
              {constructTree(node.right)}
            </div>
          )}
        </div>
      )
    }
  }

  const calculateTraversal = (node) => {
    nodelist.push(node);
  }

  const showAnimation = () => {
    function task(node, i) {
      setTimeout(() => {
        Treecontext.curr_node_idx = node.key;
        setCurrNode(node.key);
      }, 1000 * i);
    }

    for (let i = 0; i < nodelist.length; i++) {
      task(nodelist[i], i);
    }
  }

  const traversal = (type) => {
    nodelist = [];
    switch (type) {
      case 0:
        treeNode.inorder(treeNode.root, calculateTraversal);
        break;
      case 1:
        treeNode.preorder(treeNode.root, calculateTraversal);
        break;
      case 2:
        treeNode.postorder(treeNode.root, calculateTraversal);
        break;
      case 3:
        treeNode.breadthFirst(treeNode.root, calculateTraversal);
        break;
      case 4:
        treeNode.ZigZag(treeNode.root, calculateTraversal);
        break;

      default:
        return;
    }
    showAnimation();
  }

  return (
    <div className="container" >
      <div className="header">

        <div className="logo-bar">
          <img className="logo" src={logo} alt="BinarySearchTree" width={70} />
          <div id="title">BINARY SEARCH TREE</div>
          <img className="logo" src={logo} alt="BinarySearchTree" width={70} />
        </div>

        <div className="main-actions">
          <button id="add" onClick={insertNode}>ADD</button>
          <button id="add" onClick={searchNode}>SEARCH</button>

          <input type="number" name='key' placeholder='Enter a value here...' onChange={Handlechange}
            value={inputValue} />
          <button id="remove" onClick={removeNode}>REMOVE</button>
          <button id="remove" onClick={resetTree}>RESET</button>
        </div>

        <div className="navbar">
          <button onClick={() => traversal(0)}>IN-ORDER TRAVERSAL</button>
          <button onClick={() => traversal(1)}>PRE-ORDER TRAVERSAL</button>
          <button onClick={() => traversal(2)}>POST-ORDER TRAVERSAL</button>
          <button onClick={() => traversal(3)}>LEVEL ORDER TRAVERSAL</button>
          <button onClick={() => traversal(4)}>ZIG-ZAG TRAVERSAL</button>
        </div>
      </div>

      <div>
        <p style={{ marginLeft: '8px', fontWeight :'bold'}} > SEARCH STATUS : 
        <span className="searching">{status}</span> </p>
      </div>

      <div className="tree">
        {constructTree(treeNode.root)}
        {treeNode.root === null && (
          <p id="emptyTreeMsg">ADD SOME VALUES TO PREVIEW THEM HERE</p>
        )}
      </div>

    </div>
  )
}

export default Tree