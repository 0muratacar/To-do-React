import React, {useEffect} from 'react'
//Unic Id
import {v4 as uuidV4} from "uuid"


// Form compenentinin aldığı propslar
const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {


    // Todo yu güncelleme fonksiyonu
    //title, ve id parametre olarak alınır, eşleşme yapılarak newTodo adlı yeni değişkene atılan veriler gönderilir.
    // Sonrasında setEditTodo için tekrar boşaltılır.
    const updateTodo =(title, id) =>{
        const newTodo = todos.map((todo) =>
            todo.id === id ? {title, id} : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };

    // useEffect: class-based component’larda componentDidMount’da uyguladigimiz islemleri yapabilmemiz icin kullandigimiz bir yontem.
    // Uygulamanın ayağa kalkması sırasında uygulamanin bagimli oldugu yan islemleri cagirmak icin kullandigimiz bir yontem
    // editTodo durumunda setInput fonksiyonu devreye girecek. Arama yerine düzenlmek istediğimiz title gelecek.
    useEffect(() =>{
        if(editTodo){
        setInput(editTodo.title);
    } else{
        setInput("")
    }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    // Entere bastığımızda sayfanın yenilenmemesi için event.preventDefault(); yapıldı.
    // Eklenen todoya uuidV4() ile benzersiz bir id ataması yapıldı
    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo){
            setTodos([...todos, {id: uuidV4(), title: input}]);
            setInput("");
        }
        else{
            updateTodo(input, editTodo.id)
        }
      
    }
    return (

        // Form elemanlarının bulunduğu kısım
        <form onSubmit={onFormSubmit}>
            <input className="task-input" 

            value={input} required type="text" 
            placeholder="Bir iş girin: "
            onChange={onInputChange}
            />

        {/* Burada editTodo durumunda ekle butonu placeholder: DÜZELT oluyor, sonrasında tekrar EKLE oluyor.*/}
            <button className="button-add" type="submit">
                {editTodo ? "DÜZELT" : "EKLE" }
            </button>
        </form>
    )
}

export default Form
