import "whatwg-fetch";
import Img1 from "./../img/1.gif";
class Ajaxfetch extends React.Component{
    constructor(){
        super();
        this.state={
            data:"",
            displayImg:{display:"block"},
            displayInfo:{display:"none"}
        }
    }
    render(){
        let {data,displayImg,displayInfo}=this.state;
        return(
            <div>
                <img src={Img1} style={displayImg}/>
                <p style={displayInfo}>
                    {data}
                </p>
            </div>
        )
    }
    componentDidMount(){
        fetch("http://localhost/PHP22/vscode.php").then(response=>{
            console.log(response)
            return response.text();
            
        }).then(data=>{
            this.setState({
                data:data,
                displayImg:{display:"none"},
                displayInfo:{display:"block"}
            })
        })
    }
}
export default Ajaxfetch;