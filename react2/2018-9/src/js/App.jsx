import '../css/style.css';
import InShow from './components/Inshow.js';

  
 class App extends React.Component{
  constructor(){
    super();
    this.state={
         number:'1'
    }
  }
  listClick(type){
    switch(type){
      case '1' :this.setState({number:'1'});
      break;
      case '2' :this.setState({number:'2'});
      break;
      case '3' :this.setState({number:'3'});
      break;

    }
  }
  render(){
    let number=this.state.number;
     return(
       <div>
         <button className={number=="1"?'list':''} onClick={()=>this.listClick('1')}>列表一</button>
         <button className={number=="2"?'list':''} onClick={()=>this.listClick('2')}>列表二</button>
         <button className={number=="3"?'list':''} onClick={()=>this.listClick('3')}>列表二</button>
         <div className={'content'}>
         <InShow type={number}/>
         </div>
       </div>
     )
}
 }
 export default App;