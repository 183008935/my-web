class App extends React.Component{
    constructor(){
        super();
        this.state={
            arr:['tom','田家豪','jarry','susan']
        }
    }
    render(){
        let {arr}=this.state;
        return (
            <div>
                {arr.map((val,index)=>{
                    return <p key={index}>
                        姓名:{val}
                    </p>
                })}
            </div>
        )
    }
}
export default App


