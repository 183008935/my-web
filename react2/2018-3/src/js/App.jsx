import $ from 'jquery';
class App extends React.Component{
    constructor(){
        super();
        this.state={
            students:[]
        }
    }
    render(){
        let {students}=this.state;
        return(
            <div>
                {students.map((val,index)=>{
                   return <p key={index}>姓名:{val.name} 性别:{val.sex} 年龄:{val.age}</p>
                })}
            </div>
        )
    }
    componentDidMount(){
        $.ajax({
            url:'./json1/data.json',
            type:'GET',
            dataType:'json',
            success:function(data){
                this.setState({
                    students:data.students
                })
            }.bind(this)
        })
    }
}
export default App

