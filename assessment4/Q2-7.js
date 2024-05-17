// Q2: how react renders dom in conservative manner - explain
//In conservative manner, developers don't update the dom directly. Each time states or props of component change, React
// will trigger re-rendering of that component by creating new virtual dom and compare that with previous virtual dom through diffing algorithm.
// Then only the differences will be updated to the real dom. 
// React is usually used as single page application. It initially loads a single HTML file with a root <div> element and then dynamically re-render
// components into the root <div>

// Q7: explain how virtual dom works 
//A virtual dom is a copy of the real dom. 
//When React application is first loaded, an initial virtual dom will be created and the real dom is created from this virtual dom
//When the states or props of a component changes, it triggers UI re-rendering and a new virtual dom is created.
//The new virtual dom is compared with the old virtual dom by a diffing algorithm. Only the differences in the new virtual dom
//will be rendered in the real dom