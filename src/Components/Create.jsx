import axios from 'axios'
import React, { useState } from 'react'

const Create = () => {
    const [task, setTask] = useState()
    const handleAdd = () => {
        axios.post('http://localhost:3000/add', { task: task })
            .then(result => {
                setTask(''); // vide le champ après ajout
                // ici on peut ajouter directement l'élément
                window.dispatchEvent(new Event("refreshTodos"));
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="create_form">
            <input type="text" placeholder="Ecrire votre Tache" onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Ajoutez</button>
        </div>
    )
}

export default Create
