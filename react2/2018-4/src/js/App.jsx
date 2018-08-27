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
                  {students.map((value,index)=>{
                      return <p key={index}>姓名:{value.name} 性别:{value.sex} 年龄:{value.age}</p>
                  })}
            </div>
        )
    }
    componentDidMount(){
        $.ajax({
            url:'./json/data.json',
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
export default App;