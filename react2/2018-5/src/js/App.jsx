import "whatwg-fetch";
import Img1 from "./../img/1.gif";
class Ajaxfetch extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            displayImg:{display:"block"},
            displayInfo:{display:"none"}
        }
    }
    render(){
        let {data,displayImg,displayInfo}=this.state;
        return(
            <div>
                <img src={Img1} style={displayImg}/>
                <ul style={displayInfo}>
                    {data.map(val=>{
                        return <li key={val.id}>
                            姓名:{val.name} 年龄:{val.age} 性别:{val.sex}
                        </li>
                    })}
                    </ul>
            </div>
        )
    }
    componentDidMount(){
        fetch("http://localhost/PHP22/vscode2.php").then(
            response=>{
                return response.json();
            }
        ).then(sj=>{
            this.setState({
                data:sj.data,
                displayImg:{display:"none"},
                displayInfo:{display:"block"}
            })
        }).catch(ex=>{
           alert(ex.message)
        })
    }
}
export default Ajaxfetch;