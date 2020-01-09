import React, { Component } from 'react';

class ListFilter extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            data: "Bao giời thì song",
            done: props.done,
            all: props.all,
            inpogress: props.inpogress, 
        }
        this.handEdit = this.handEdit.bind(this);
        this.handDelete = this.handDelete.bind(this);
        this.handDone = this.handDone.bind(this);
    }
    handEdit(event) {
        event.preventDefault();
    }
    handDelete(event) {
        event.preventDefault();
    }
    handDone(event) {
        event.preventDefault();
    }

    render() {
        // console.log('ma' + this.state.done);
        return (
            <div className="container">
                <div className = "row">
                    {
                        (this.state.done === true) &&
                            <div className="col-12">
                                <span>{this.state.data}</span>
                                <button className="btn btn-success" onClick={this.handEdit}>Edit</button>
                                <button className="btn btn-danger" onClick={this.handDelete}>Delete</button>
                                <button className="btn btn-info" onClick={this.handDone}>Done</button>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default ListFilter;