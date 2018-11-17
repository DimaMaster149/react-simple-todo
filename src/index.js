import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                items: [],
                    text: '',
                    checked:false,
                showMessage:false
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList
                    items={this.state.items}
                    onClick={(index) => this.handleCheck(index)}
                    onDelete={(index) => this.handleDelete(index)}
                    showMessage = {this.showMessage}
                />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            checked:false
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
    handleCheck(index){
        const items = this.state.items.slice();
        console.log(items, index);
        items[index].checked = !items[index].checked;
        this.setState({
            items: items
        });
    }
    handleDelete(index){
        const items = this.state.items.filter((todo, i) => {
            return i !== index;
        });
        alert(`This todo was deleted`);

        this.setState({
            items: items
        });
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => (
                    <li key={item.id}>
                        <div className = "todo">
                            <div className="todo__item" onClick={() => this.props.onClick(index)}>
                                <input type="checkbox" checked={item.checked} onChange={()=>console.log(item)}/>
                                {item.text}
                            </div>
                            <button onClick={() => {this.props.onDelete(index)}}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));