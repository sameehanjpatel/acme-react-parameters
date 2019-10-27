const root = document.querySelector("#root");
const { Component } = React;
const { render } = ReactDOM;
const { Route, HashRouter, Link, Switch } = ReactRouterDOM; 

let companies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')
let profits = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies/afc99422-b9b9-4bdd-a198-b966402c4cc7/companyProfits')

const Nav = ({path, companies, profits}) => {
 return (
     <nav>
         <Link to='/' className={path === "/" ? 'selected' : ""}>Acme Company Profits with React Router</Link>
         <Link to = '/companies' className = {path === "/companies" ? 'selected': ""}>Companies</Link>       
     </nav>
 )
}

const Welcome = (props) => {
    console.log("props", props);
    return (
        <h1>Welcome to the fun times!</h1>
    )
}

const Companies = ({companies}) => {
return(
    <ul>
        {
            companies.map(company =>
                <li key = {company.id}>
                <Link to ={`/companies/${company.id}`}>
                    {company.name}
                </Link></li>)
        }
    </ul>
)

}

const Company = ({match, companies, profits}) => {
    console.log("match", match)
    const id = match.params.id;
    
    const company = companies.find(comp => comp.id === id*1);
    console.log("company", company)
    if (!company){
        return "Welcome"
    } else {
        return (
            <h1>Test</h1>
        )
    }

}


class App extends Component {
    constructor(){
        super();
        this.state ={
            companies:[],
            profits:[]
        }
    }

    componentDidMount(){
        Promise.all([companies, profits]).then(
            data => {
             let companies = data[0].data
             let profits = data[1].data

                this.setState({ companies, profits})
            }
        )
    }

    render(){
        const{companies, profits} = this.state

        return (
            <HashRouter>
                <Route render={(props) => <Nav path = {[props.location.pathname]} companies = {companies} profits = {profits}/> } />
                
                    <Route path = '/companies' render = {() => <Companies companies = {companies}/>}/>
                    <Route path='/companies/:id' render={({match}) => <Company companies={companies} profits = {profits} match = {match}/>} />
                    <Route path = "/" component = { Welcome } />
               
            </HashRouter>

        )
    }

}

render(<App/>,root);