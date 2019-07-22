import React, { Component } from 'react';
import shuffleFunction from './funcs/shuffle';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Task1.css';

//The Input
let fetchTask = null;
let fetchTranslation = null;
//Empty Variables
let splitArray = [];
let splitArrayCopy = [];
let answerArray;
let answer = [];
let answerString = null;

let buttonText = 'Solve task first';
let buttonClass = 'negative ui button';
//Converting the Input to Array

 //console.log(initialData);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

//I think css for the dnd elements has to be handled in this file (yeah that sucks)
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const handleClick = (e) => {
    e.preventDefault();
    if (fetchTask === answerString) {
      console.log('Thats right');
        buttonText = 'Next';
        buttonClass = 'positive ui button';
    } else {
      console.log('Thats wrong');
        buttonText = 'Wrong';
        buttonClass = 'negative ui button';
  }}

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: splitArray,
      buttonText: buttonText,
      buttonClass: buttonClass
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Will happen before HTML loads
  componentWillMount(){
    fetchTask = this.props.exercise[0].sentences[0].sentence;
    fetchTranslation = this.props.exercise[0].sentences[0].translation;
    let split = fetchTask.split(" ");
    let Loop = () =>{

      //Putting the Split in the right format
      for (let index = 0; index < split.length; index++) {
        const element = split[index];
        //console.log(element);
        splitArray.push({
          id: `${Math.floor(Math.random() * (555000 - 100 +1)) + 100}`,
          content: `${element}`
        });
        splitArrayCopy = [...splitArray];
      }
      shuffleFunction(splitArrayCopy);
      splitArray = [];
    }

    //Execute the function, yes thats unnecessary.
    Loop();

    //console.log('splitArray:')
    //console.log(splitArray);
  }

      //Button Onclick

  componentDidUpdate(){
    //Copy State into an Array
    answerArray = this.state.items;
    //Empty the answer so it does not add indefinitly
    answer = [];
    //Also Empty the answerString String for the same reason
    answerString = null;

    //console.log('answerArray');
    //console.log(answerArray);
    //console.log('answer');
    //console.log(answer);

    //For as long as there are items in the Answerarray push it to answer (Looks redundant, it probably is.)
    //I think i did it for consistency reasons
    for (let index = 0; index < answerArray.length; index++) {
      const element = answerArray[index].content;
      answer.push(element);
    }

    //console.log('answer nach push');
   // console.log(answer);
    //console.log(answer.join(' '));

    //Convert the Answer back to a String in the same way the Input should be.
    answerString = `${answer.join(' ')}`;
    //console.log('Fetch and Answer:')
    //console.log(fetchTask);
    //console.log(answerString);

    this.setState = {
        items: splitArray,
        buttonText: buttonText,
        buttonClass: buttonClass
      };
  }

  onDragEnd(result) {
    // if dropped outside the list put it back where it started
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render() {
    return (
      <div>
        <p className="Task-Explanation">Fix the sentence.</p>
         <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div className="Task-List"
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div className="Task-Item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <br></br>
            <p className="Task-Translation-Header">Translation:</p>
            <p className="Task-Translation">{fetchTranslation}</p>
            <br></br>
            <button className="ui button" onClick={handleClick}>
            Submit
          </button>
          <button className={this.state.buttonClass}>{this.state.buttonText}</button>
        </div>
      </div>
    );
  }
}