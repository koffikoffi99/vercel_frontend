import { useEffect, useState } from "react"
import Create from "./Create"
import axios from "axios"
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";




const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        const fetchTodos = () => {
            axios.get('https://vercel-backend-mdfe.onrender.com/get')
                .then(result => setTodos(result.data))
                .catch(err => console.log(err));
        };

        fetchTodos();

        // Écoute l'événement pour refresh
        window.addEventListener("refreshTodos", fetchTodos);

        // Nettoyage quand le composant est démonté
        return () => {
            window.removeEventListener("refreshTodos", fetchTodos);
        };
    }, []);


    const handleEdit = (id) => {
        axios.put('https://vercel-backend-mdfe.onrender.com/update/' + id)
            .then(result => {
                // mettre à jour localement sans reload
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: !todo.done } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handDelete = (id) => {
        axios.delete('https://vercel-backend-mdfe.onrender.com/delete/' + id)
            .then(result => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            <br />
            {
                todos.length === 0 ? <div><h2>aucun enregistrement</h2></div>
                    :
                    todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                    : <BsCircleFill className="icon" />

                                }

                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className="icon" onClick={() => handDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Home
