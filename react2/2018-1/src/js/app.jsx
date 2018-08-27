const Item = React.createClass({
    //this.props.onEdit->function
     edit(){
          this.props.onEdit(this.props.id,this.props.value)
     },
     remove(){
        // removeEditor(id)
        this.props.onRemove(this.props.id)
    },
    render(){
        return <li className="list-group-item">{this.props.value}
        <a className="right glyphicon glyphicon-edit" href="#" onClick={this.edit}>
        </a> <a  className="right glyphicon glyphicon-remove" href="#" onClick={this.remove}>
        </a></li>       
    }
});
const ItemEditor = React.createClass({
    getInitialState(){
        return {
            value:this.props.value
        }
    }, 
    changeHandle(event){
          this.setState({
              value:event.target.value
          })
    },
    remove(){
        // removeEditor(id)
        this.props.onRemove(this.props.id)
    },
    save(){
        this.props.onSave(this.props.id,this.state.value)
    },
    render(){
        return <li className="list-group-item">
    
        <input className="item-edit" onChange={this.changeHandle}  value={this.state.value}/><a  className="glyphicon glyphicon-edit"  href="#"  onClick={this.save}></a>
        <a  className=" glyphicon glyphicon-remove" href="#" onClick={this.remove}></a>
    </li>
    }
});
const List = React.createClass({
    getInitialState(){
         return {
             key:0,
             list:new Map(),
             editList:new Map()
             
         }
    },
    add(){
       const key = ++this.state.key;
       this.state.editList.set(key,'');
           this.forceUpdate();
          
    },
    removeItem(id){
         this.state.list.delete(id);
         this.forceUpdate();
    },
    removeItemEditor(id){
            this.state.editList.delete(id);
            this.forceUpdate();
    },
    save(id,value){
        this.state.editList.delete(id);
        this.state.list.set(id,value);
        this.forceUpdate();
        
    },
    edit(id,value){
        this.state.list.delete(id);
        this.state.editList.set(id,value);
        this.forceUpdate();
    },
    render(){
            const listDOM =[];
            const editListDOM=[];
            for(let entity of this.state.list){
                listDOM.push(<Item onRemove={this.removeItem} onEdit={this.edit} key={entity[0]} id={entity[0]} value={entity[1]}/>);
            }
            for(let entity of this.state.editList){
                editListDOM.push(<ItemEditor onSave={this.save} onRemove={this.removeItemEditor} key={entity[0]} id={entity[0]} value={entity[1]} />);
            }
        return <div>
            <button   onClick={this.add} className="btn btn-default">增加</button>
            <ul className="list-group">
              {listDOM}
              {editListDOM}
            </ul>
        </div>
    }
});
export default List;