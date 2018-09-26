import React from 'react';
import { toast } from 'react-toastify';
import './board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRows: '',
            totalCols: '',
            displayGridLayout: false,
            rows : [] ,
            travelledGrid : 0 ,
        }
        this.displayGrid = this.displayGrid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.moveMario = this.moveMario.bind(this);

        this.handleInputDisplay = this.handleInputDisplay.bind(this);
    }

    moveMario(e){
        var position = e.target.id;
        var value = e.target.value;
        var pos = position.split('-');
        // console.log('position', position,value , e.keyCode);   
        // keycode : LEFT UP RIGHT DOWN : 37 , 38, 39, 40
        switch(e.keyCode){
            case 37 :
                if( pos[1] != 0){
                    // move left
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                else{
                    //move right
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                break;
            case 38 :
                if( pos[0] != 0){
                    // move up
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                else{
                    //move down
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                break;
            case  39 :
                if( pos[1] != this.state.totalCols-1){
                    // move right
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                else{
                    //move left
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                break;
            case 40 : 
                if( pos[0] != this.state.totalRows-1){
                    // move down
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                else{
                    //move up
                    this.setState({
                        ...this.state , travelledGrid : this.state.travelledGrid + 1
                    })
                }
                break;
            default:
        }
          
    }

    handleChange(e) {
        var val = e.target.value;
        var name = e.target.name;

        if (name == 'totalRows') {
            this.setState({
                ...this.state, totalRows: val
            })
        }
        else {
            this.setState({
                ...this.state, totalCols: val
            })
        }
    }

    displayGrid(e) {

        // Validations -- start
        if (this.state.totalCols == "" || this.state.totalRows == "") {
            toast.error("Please enter number of Rows and Columns", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (this.state.totalRows < 0 || this.state.totalCols < 0) {
            toast.error("Please enter positive value", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        else if (this.state.totalRows == 0 || this.state.totalCols == 0) {
            toast.error("Please enter value greater than 0", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        // validation -- end

        this.setState({
            ...this.setState, displayGridLayout: !this.state.displayGridLayout
        })
    }
    handleInputDisplay(e){

    }
    render() {
        let rows = [];
        for (var i = 0; i < this.state.totalRows; i++){
          let cell = []
          for (var idx = 0; idx < this.state.totalCols; idx++){
            cell.push(
                    <div key={i+'-'+idx} className="item_cell" >
                        <input 
                            key={i+'-'+idx}
                            type="text" 
                            id = {i+'-'+idx}
                            onChange = {this.handleInputDisplay}
                            onKeyDown={this.moveMario} 
                            value={this.state.totalRows < this.state.totalCols || this.state.totalRows == this.state.totalCols ? 
                            (i == idx ? 'X' : '') :
                            (Math.floor(Math.random() * this.state.totalCols ) ? 'X' : '' )} className="input_cell" 
                        />
                    </div>
                )
          }
         rows.push(<div className="item" key={i} >{cell}</div>)
        }
        // default place of mario is at (0,2)
        this.state.rows = rows ;
        if(this.state.totalCols > 1) {
            // this.state.rows[1].props.children[0].props.children = 'M'
        }           
        return (
            <div>
                <div>
                    <div>
                        <input type="number" value={this.state.totalRows} onChange={this.handleChange} name="totalRows" className="inputRows" placeholder="Enter Number of Rows" />
                    </div>
                    <div>
                        <input type="number" value={this.state.totalCols} onChange={this.handleChange} name="totalCols" className="inputCols" placeholder="Enter Number of Columns" />
                    </div>
                    <button onClick={this.displayGrid} className="btnGrid" > Display Mario Grid </button>
                    <div>
                        {this.state.displayGridLayout &&
                            <div>
                                <h5> 
                                    The grid is {this.state.totalRows != '' ? this.state.totalRows : '0' } by {this.state.totalCols != '' ? this.state.totalCols : '0'}
                                </h5> 
                                <div className="displayGrid">
                                    {this.state.rows}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;