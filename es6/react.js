//React

//React is a web library to create single page application
//It's light weight
//has very high performance due to virtual dom
//diffing algorithm
//doesn't use html templates, instead create templates using jsx code
//component based architecture

//dom - document object model
//dom-mutation or manipulation - upon interaction mutation happens and is very slow on browsers
//creation of dome tree
//element rendering
//adjusting html elements
//css - style sheet applied
//css - adjustments, font, spacing
//color adjustments
//final rendering

//60 frame/sec

//create a copy of actual html in javascript object format - virtula dom
//do the change in react component first, check there if it's already present - new virtual dom

//use diffing algorithm to compare new virtual dom with actual dom, dfs
//if change is there, just replace the node instead of re-rerendering the html

//react - class components and component life cycle methods

//a. creation life cycle
  //1. constructor - initialize

  // update life cycle

  //destruction life cycle

//redux
//store, reducer, action, dispatcher

//react-redux 
//api's to read store - <mapStateToProps, mapDispatchToProps> hooks <useSelector, useDispatch> 