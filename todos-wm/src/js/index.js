import './../css/index.css';
import {Router,Route,hashHistory} from 'react-router';
import App from './conmonents/app';
ReactDOM.render(
   <Router history={hashHistory}>
       <Route path="/" component={App} />
       <Route path="/active" component={App} />
       <Route path="/completed" component={App} />   
    </Router>
    
    ,
    document.getElementById("div1")
)