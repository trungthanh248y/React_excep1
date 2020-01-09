import React, { Component } from 'react';

class ComponentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: false,
            data : "",
            arr: [],
            status: 'inpogress',
            edit: false,
            dataEdit: "",
            radioCheck: "all"
        }
        this.onHandClick = this.onHandClick.bind(this);
        this.handDone = this.handDone.bind(this);
        this.handEdit = this.handEdit.bind(this);
        this.handDelete = this.handDelete.bind(this);
        this.onSubmitEditHand = this.onSubmitEditHand.bind(this);
    } 

    onHandInputAdd = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.value : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    //Nếu k có hàm onChange thì sẽ k cập nhập dc o input chứ đừng bảo lưu

    // onHandInputAdd1 = (id) => (e) => {
    //     console.log('input add ', id, e.target)

    //     const target = e.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     }, () => {
    //         console.log(this.state)
    //     })
    // }

    // onHandleInputAdd = (id) => (e) => {
    //     console.log('save', id, e.target)

        
    //     const {arr} = this.state
    //     arr[id]['data'] = this.state.dataEdit 
    //     this.setState({
    //         arr
    //     }, () => {
    //         console.log(this.state)
    //     })
    // }

    onHandClick(event) {
        event.preventDefault();
        // event.target.reset();
        let item = {
            data: this.state.data,
            status: 'inpogress',
            edit: false,
        }
        this.setState({arr: this.state.arr.concat(item), data: '', radioCheck: "all"});//sau khi add sẽ reset lại về rỗng trên thanh input
    }

    onSubmitEditHand(event) {
        event.preventDefault();
        // let data = this.state.arr;
        // console.log(this.state.dataEdit);
        // console.log(data.id);
    }

    handDone(event) {
        event.preventDefault();
        let data = this.state.arr;
        let dataDone = data[event.target.id];
        dataDone.status = 'done';
        this.setState({arr: data});
    }

    handEdit(event) {
        event.preventDefault();
        let data = this.state.arr;
        let dataEdit = data[event.target.id];
        dataEdit.edit = true;
        this.setState({arr: data, dataEdit: data[0].data});//sau khi nhấn vào nút edit sẽ lấy dữ liệu của data sửa cho dataEdit
    }

    handDelete(event) {
        event.preventDefault();
        // let data = this.state.arr;
        // let dataDelete = data[event.target.id];
        // const index = data.indexOf(dataDelete);
        // if (index > -1) {
        //     data.splice(index, 1);
        // }
        // this.setState({arr: data});
    }

    checkClickEdit(data, index)
    {
        if(data.edit)
        {
            // this.setState({dataEdit: data.data});
            return (
                <div>
                    <input type="text" value={this.state.dataEdit} onChange={(e) => this.inputEditHand(e, index)}/>
                    <button className="btn btn-success" onClick={(e) => this.buttonSave(e, index)}>Save</button>
                    <button className="btn btn-danger" onClick={(e) => this.buttonClear(e, index)}>Clear</button>
                </div>
            )
        }
        return <span>{data.data}</span>
        {/* <input type="text" value={data.data} readOnly/> */}

    }
    
    inputEditHand(e) {
        e.preventDefault();
        this.setState({dataEdit: e.target.value});//Cập nhập dataEdit bằng giá trị khi sửa
    }

    buttonSave(e, index) {
        e.preventDefault();
        let arr = this.state.arr;
        let dataEdit = arr[index];
        dataEdit.edit = false;
        dataEdit.data = this.state.dataEdit;//Cập nhập dataEdit vào mảng gtri data và sử dụng bthuong
        this.setState({arr: arr});
    }

    buttonClear(e) {
        //Khi clear: đưa tất cả gtri về gtri của arr ban đầu trước khi thay đổi và cập nhập vào dataEdit
        e.preventDefault();
        this.setState({dataEdit: this.state.arr[0].data});
    }

    //Hàm sử lý sự kiện enter khi add   
    handleKeyPress(event) {
        if(event.key == 'Enter') {
        event.preventDefault();
        let item = {
            data: this.state.data,
            status: 'inpogress',
            edit: false,
            }
        this.setState({arr: this.state.arr.concat(item), data: ''});//sau khi add sẽ reset lại về rỗng trên thanh input
        }
    }

    render() {
        let elementes = this.state.arr.map((product, index) => {
            // console.log(this.state.radioCheck);
            let result = '';
            if((this.state.radioCheck === 'inpogress' || this.state.radioCheck === 'all') && product.status === 'inpogress') {
                result = ( <div className="col-12" key={index}>
                        {/* <input type="text" value={product.data} readOnly/> */}
                        {/* <p>{setInterval(<h2>It is {new Date().toLocaleTimeString()}</h2>, 1000)}</p> */}
                        {this.checkClickEdit(product, index)}
                        <button className="btn btn-success" id={index} onClick={this.handEdit}>Edit</button>
                        <button className="btn btn-danger" id={index} onClick={this.handDelete}>Delete</button>
                        <button className="btn btn-info" id={index} onClick={this.handDone}>Done</button>
                        <span>{product.status}</span>
                    </div> )
            }
            if((this.state.radioCheck === 'done' || this.state.radioCheck === 'all') && product.status === 'done') {
                result = ( <div className="col-12" key={index}>
                        {this.checkClickEdit(product, index)}
                        <button className="btn btn-success" id={index} onClick={this.handEdit}>Edit</button>
                        <button className="btn btn-danger" id={index} onClick={this.handDelete}>Delete</button>
                        <button className="btn btn-info" id={index} onClick={this.handDone}>Done</button>
                        <span>{product.status}</span>
                    </div> )
            }
            return result;
        });
        // let checkEdit = true;        
        // let setEdit = this.state.arr.map((product, index) => {
        //     let result = '';
        //     if(product.edit && checkEdit) {
        //         result = (
        //             <div className="container" key={index}>
        //                 <form onSubmit={this.onSubmitEditHand}>
        //                     <input
        //                         type="text"
        //                         name="dataEdit"
        //                         defaultValue={product.data} 
        //                         onChange={this.onHandInputAdd1(index)}
        //                         // tại sao phải là onHandInputAdd1 mà không thể là onHandInputAdd
        //                     />
        //                     <button type='button' onClick={this.onHandleInputAdd(index)}>Save</button>
        //                 </form>
        //             </div>
        //         )
        //         checkEdit = false;
        //     }
        //     return result;
        // });
          
        return (
            //  onSubmit={this.onHandSubmit}
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                        <div className="col-sm-10">
                            <input 
                            type="text"
                            ref='title'
                            name="data"
                            className="form-control" 
                            value={this.state.data} 
                            onChange={this.onHandInputAdd}
                            onKeyPress={(event) => this.handleKeyPress(event)}//Lưu thông tin sau khi enter
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.onHandClick}>ADD</button>
                    </div>

                    <div className="col-sm-10 col-sm-offset-2">
                        <div className="col-sm-10">
                            <input 
                                name="radioCheck"
                                type="radio"
                                // {this.state.all}
                                value="all"
                                onChange={this.onHandInputAdd}
                                checked={this.state.radioCheck === 'all'}
                            />
                            ALL

                            <input 
                                name="radioCheck"
                                type="radio"
                                // {this.state.done}
                                value="done"
                                onChange={this.onHandInputAdd}
                                checked={this.state.radioCheck === 'done'}
                            />
                            Done

                            {/* filter */}
                            <input 
                                name="radioCheck"
                                type="radio"
                                // {this.state.inpogress}
                                value="inpogress"
                                onChange={this.onHandInputAdd}
                                checked={this.state.radioCheck === 'inpogress'}
                            />
                            Inpogress
                        </div>
                    </div>

                    <div className="container">
                        <div className = "row">
                            {elementes}
                            {/* {setEdit} */}
                        </div>
                    </div>
                    {/* <ListFilter all={this.state.all} done={this.state.done} inpogress={this.state.inpogress}/> */}
                    {/* no k lam thay doi props hay state len no chi gui 1 lan */}
                </div>
            </div>
        );
    }
}

export default ComponentAdd;
