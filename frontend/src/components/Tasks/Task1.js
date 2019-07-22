import React, { Component } from 'react';
import shuffleFunction from './funcs/shuffle';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Task1.css';

//The Input
let fetchTask = 'Der Winter naht , denn es wird kalt.';
let fetchTranslation = 'The winter is near because it is getting cold.';
//Empty Variables
const splitArray = [];
let answerArray;
let answer = [];
let fuckMe = null;
//Converting the Input to Array
let split = fetchTask.split(" ");

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
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

//Button Onclick
    const handleClick = (e) => {
      e.preventDefault();
      if (fetchTask === fuckMe) {
        console.log('Thats right');
      } else {
        console.log('Thats wrong');
    }}

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: splitArray
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Will happen before HTML loads
  componentWillMount(){
    let Loop = () =>{

      //Putting the Split in the right format
      for (let index = 0; index < split.length; index++) {
        const element = split[index];
        //console.log(element);
        splitArray.push({
          id: `${index}`,
          content: `${element}`
        });
      }
      shuffleFunction(splitArray);
    }

    //Execute the function, yes thats unnecessary.
    Loop();

    //console.log('splitArray:')
    //console.log(splitArray);
  }
  

  componentDidUpdate(){
    //Copy State into an Array
    answerArray = this.state.items;
    //Empty the answer so it does not add indefinitly
    answer = [];
    //Also Empty the fuckMe String for the same reason
    fuckMe = null;

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
    fuckMe = `${answer.join(' ')}`;
    //console.log('Fetch and Answer:')
    //console.log(fetchTask);
    //console.log(fuckMe);
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
        </div>
      </div>
    );
  }
}