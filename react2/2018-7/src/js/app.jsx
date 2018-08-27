import '../css/style.css';
class App extends React.Component{
    constructor(){
        super();
        this.state={
            opacity:1.0,
            flag:true
        }
    }
    componentDidMount(){
        setInterval(()=>{
            let {opacity}=this.state;
            opacity-=.05;
            if(opacity<0.1){
                opacity=1.0;
            }
            this.setState({
                opacity:opacity
            })
        },100)
    }
    bindClick(){
        this.setState({
            flag:!this.state.flag
        })
    }
    render(){
        return(
            <h1 style={this.state} onClick={()=>{
                this.bindClick()
            }}>
                {this.state.flag?`hello,${this.props.name}！！`:`你好,世界！！`}
            </h1>
        )
    }
}
export default App;