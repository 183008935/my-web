import "whatwg-fetch";
class App extends React.Component{
    constructor(){
        super();
        this.state={
           message:""
        }
        this.handdleCheck=this.handdleCheck.bind(this);
    }
    handdleCheck(){
        let form=document.querySelector('form');
        fetch("http://localhost/PHP22/vscode3.php",{
            method:"POST",
            body:new FormData(form)
        }).then(response=>{
            return response.json()
        }).then(json=>{
            this.setState({
                message:json.message
            })
            //切换组件
        }).catch(ex=>{
            alert(ex.message);
        })
    }
    render(){
        let {message}=this.state;
        let {handdleCheck}=this;
        return(
            <div>
                <form name="login">
                    用户名:<input type="text" name="userName"/><br/>
                    密码:<input type="password" name="password"/><span>{message}</span><br/>
                    <input type="button" onClick={handdleCheck}  value="提交"/>
                </form>
            </div>
        )
       
    }
}
export default App;